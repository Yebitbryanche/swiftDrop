from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from app.db import SessionDep
from uuid import UUID
from app.schema.index import CreateUser, LoginRequest, RequestDelivery
from app.models.models import Users, Delivery, Ratings, Notification
from sqlmodel import select, func
from app.config import settings

from app.utils.app import hash_password, authenticate_user, create_access_token, get_current_user, upload_file

router = APIRouter(
    prefix="/app/v1",
    tags=['Routes']
)

def allowed_file(filename: str):
    return filename.split(".")[-1].lower() in settings.ALLOWED_EXTENSIONS


# authentication
@router.post('/create/user')
def create_account(data:CreateUser, session:SessionDep):
    existing_user = session.exec(select(Users).where(Users.email == data.email)).first()

    if(existing_user):
        raise HTTPException(
            status_code=409,
            detail="User already exists"
        )
    
    
    user = Users(
        user_name=data.full_name,
        phone=data.phone,
        email=data.email,
        role=data.role,
        office_location=data.office_location,
        delivery_fee=data.delivery_fee,
        working_hours=data.working_hours,
        vehicle=data.vehicle_type,
        password_hash=hash_password(data.password)  # don't forget this
    )


    session.add(user)
    session.commit()
    session.refresh(user)

    return {'user':user}


#----------------
#sign up and authenticate user
#--------------------------
@router.post('/login')
def signup(data:LoginRequest, session:SessionDep):
    user = authenticate_user(session, data.email, data.password)

    access_token = create_access_token(
        data={"sub":user.email},
    )
    return {
    "status": True,
    "message": "Login successful",
    "access_token": access_token,
    "token_type": "bearer",
    "user": {
        "id": user.id,
        "email": user.email,
        "user_name": user.user_name,
        "role": user.role
        }
    }



##---------------------------
## getting all agents
##-----------------------------

@router.get("/agents")
def get_agents(
    session: SessionDep,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    ):
    query = (
        select(
            Users,
            func.avg(Ratings.rating).label("average_rating")
        )
        .outerjoin(Ratings, Ratings.agent_id == Users.id)  # ✅ correct join
        .where(Users.role == "Agent")
        .group_by(Users.id)  # ✅ required for aggregation
    )

    total = session.exec(
        select(func.count()).select_from(Users).where(Users.role == "Agent")
    ).one()

    results = session.exec(query.offset(skip).limit(limit)).all()

    # format response
    agents = []
    for user, avg_rating in results:
        agents.append({
            "agent": user,
            "average_rating": float(avg_rating) if avg_rating else 0
        })

    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "data": agents,
    }



#------------------------------
# create Delivary
#------------------------------
@router.post('/place_order/{agent_id}/{user_id}')
def requestDelivery(
    agent_id: str,
    user_id: str,
    session: SessionDep,
    data: RequestDelivery
):
    try:
        agent_uuid = UUID(agent_id)
        user_uuid = UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid UUID format")

    agent = session.get(Users, agent_uuid)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    user = session.get(Users, user_uuid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 1. CREATE DELIVERY FIRST
    delivery_request = Delivery(
        user_id=user_uuid,
        agent_id=agent_uuid,
        pickup_location=data.pickup_location,
        delivery_location=data.delivery_location,
        item_type=data.item_type,
        status="Pending"
    )

    session.add(delivery_request)
    session.flush()  # 👈 IMPORTANT (gets ID before commit)

    # 2. CREATE NOTIFICATION WITH DELIVERY ID
    notification = Notification(
        type="Delivery",
        title=f"Delivery request from {user.user_name}",
        message=(
            f"user {user.user_name} requests delivery of "
            f"{data.item_type} from {data.pickup_location} "
            f"to {data.delivery_location}"
        ),
        user_id=user_uuid,
        agent_id=agent_uuid,
        delivery_id=delivery_request.id  # 👈 HERE
    )

    session.add(notification)

    # 3. COMMIT BOTH
    session.commit()

    session.refresh(delivery_request)
    session.refresh(notification)

    return {
        "data": delivery_request,
        "notification": notification
    }

#------------------------------
# get notifications for a particular user
#-----------------------------------------
@router.get('/notification/{user_id}')
def get_notification(
    session:SessionDep,
    user_id:str):
    
    user_uuid = UUID(user_id)
    user = session.exec(select(Users).where(Users.id == user_uuid)).first()

    if not user:
        raise HTTPException(
            detail="user not found",
            status_code=404
        )
    
    notifications = session.exec(select(Notification).where(Notification.agent_id == user_uuid)).all()

    return {"data":notifications}



#----------------------
#get current user
#-----------------------
@router.get('/user/me')
def read_users_me(current_user: Users = Depends(get_current_user)):
    return current_user


#----------------------
#Read Notification
#-----------------------
@router.post("/read/{notification_id}")
def mark_notification_as_read(
    notification_id: str,
    session: SessionDep,
):
    notification_uuid = UUID(notification_id)

    statement = select(Notification).where(
        Notification.id == notification_uuid
    )

    notification = session.exec(statement).first()

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    notification.unread = False

    session.add(notification)
    session.commit()
    session.refresh(notification)

    return {
        "message": "Notification marked as read",
        "data": notification,
    }



#----------------------
# Cancle an order
#-----------------------

@router.post("/{delivery_id}/decline")
def decline_order(
    delivery_id: str,
    session: SessionDep,
):

    delivery_uuid = UUID(delivery_id)

    # 1. FIND DELIVERY
    statement = select(Delivery).where(
        Delivery.id == delivery_uuid
    )
    delivery = session.exec(statement).first()

    if not delivery:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    # 2. UPDATE DELIVERY STATE
    delivery.is_cancled = True
    delivery.status = "Canceled"

    session.add(delivery)

    # 3. CREATE NOTIFICATION (SEND TO USER ONLY)
    notification = Notification(
        user_id=delivery.user_id,   # 👈 ONLY USER
        #agent_id=delivery.agent_id,
        delivery_id=delivery_uuid,

        title="Order Declined",
        message="Your delivery request was declined by the agent.",
        type="alert",
    )

    session.add(notification)

    # 4. COMMIT
    session.commit()

    session.refresh(delivery)
    session.refresh(notification)

    return {
        "message": "Order declined successfully",
        "data": delivery
    }




#----------------------
#toggle status
#-----------------------
@router.patch("/{user_id}/toggle-status")
def toggle_user_status(
    user_id: str,
    session: SessionDep
):
    try:
        user_uuid = UUID(user_id)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid user ID"
        )

    user = session.exec(
        select(Users).where(Users.id == user_uuid)
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # TOGGLE STATUS
    user.status = not user.status

    session.add(user)
    session.commit()
    session.refresh(user)

    return {
        "message": "Status updated successfully",
        "data": {
            "id": user.id,
            "status": user.status
        }
    }


@router.post('/upload_avatar/{user_id}')
async def upload_avatar(
    user_id: str,
    session: SessionDep,
    file: UploadFile = File(...)
):

    # validate image type
    if not allowed_file(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG, PNG and WEBP files are allowed"
        )

    # convert string -> UUID
    try:
        user_uuid = UUID(user_id)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid user id"
        )

    # upload image
    image_url = await upload_file(file)

    # get user
    user = session.exec(
        select(Users).where(Users.id == user_uuid)
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # save image
    user.profile_url = image_url

    session.add(user)
    session.commit()
    session.refresh(user)

    return {
        "success": True,
        "image_url": image_url,
        "user": user
    }