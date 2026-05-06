from fastapi import APIRouter, Depends, HTTPException, Query
from db import SessionDep
from uuid import UUID
from schema.index import CreateUser, LoginRequest, RequestDelivery
from models.models import Users, Delivery, Ratings, Notification
from sqlmodel import select, func
from utils.app import hash_password, authenticate_user, create_access_token, get_current_user

router = APIRouter(
    prefix="/app/v1",
    tags=['Routes']
)


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

    delivery_request = Delivery(
        user_id=user_uuid,
        agent_id=agent_uuid,
        pickup_location=data.pickup_location,
        delivery_location=data.delivery_location,
        item_type=data.item_type,
        status="Pending"
    )

    # send notification
    ntf_type = "Delivery"
    title = f'Delivery request from {user.user_name}'
    message = f'user {user.user_name} with id {user.id} requests a delivery for {data.item_type} from {data.pickup_location} to {data.pickup_location}'
    
    notification = Notification(
        type=ntf_type,
        title=title,
        message=message,
        user_id=user_uuid,
        agent_id=agent_uuid
    )

    session.add(delivery_request)
    session.add(notification)
    session.commit()
    session.refresh(delivery_request)
    session.refresh(notification)

    return {"data": delivery_request,"notification":notification}




#------------------------------
# get notifications for a particular user
#-----------------------------------------
@router.get('/notification/{user_id}')
def get_notification(session:SessionDep, user_id:str):
    user_uuid = UUID(user_id)
    user = session.exec(select(Users).where(Users.id == user_uuid)).first()

    if not user:
        raise HTTPException(
            detail="user not found",
            status_code=404
        )
    
    notifications = session.exec(select(Notification).where(Notification.user_id == user_uuid)).all()

    return {"data":notifications}



#----------------------
#get current user
#-----------------------
@router.get('/user/me')
def read_users_me(current_user: Users = Depends(get_current_user)):
    return current_user