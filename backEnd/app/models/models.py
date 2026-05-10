import uuid
from typing import Optional
from datetime import datetime
from pydantic import EmailStr
from sqlmodel import SQLModel, Field


#user table
class Users(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
    )

    user_name: str = Field(index=True, nullable=False)
    phone: Optional[str] = Field(default=None, index=True)

    email: EmailStr = Field(nullable=False)
    password_hash: str = Field(nullable=False)

    status: bool = Field(default=False)
    role: str = Field(default="User")

    office_location: Optional[str] = Field(default=None)

    delivery_fee: Optional[int] = Field(default=None)

    working_hours: Optional[str] = Field(default=None)

    vehicle: Optional[str] = Field(default=None)
    profile_url: Optional[str] = Field(default=None)
    created_at : datetime = Field(default_factory=datetime.utcnow)


## delivery table
class Delivery(SQLModel, table=True):
    __tablename__ = "delivery"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
    )

    item_type: Optional[str] = Field(default=None)
    pickup_location: Optional[str] = Field(default=None)
    delivery_location: Optional[str] = Field(default=None)

    status: str = Field(default="Pending")

    itemImage_url: Optional[str] = Field(default=None)

    user_id: Optional[uuid.UUID] = Field(foreign_key="users.id")
    agent_id: Optional[uuid.UUID] = Field(default=None, foreign_key="users.id")
    created_at : datetime = Field(default_factory=datetime.utcnow)
    average_time : Optional[int] = Field(default=None)
    is_cancled : bool = Field(default=False)



## notifications
class Notification(SQLModel,table=True):
    __tablename__ = "notifications"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
    )
    type:str = Field(default=None)
    title:str = Field(default=None)
    message:str = Field(default=None)
    unread:bool = Field(default=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    agent_id: Optional[uuid.UUID] = Field(default=None, foreign_key="users.id")
    created_at : datetime = Field(default_factory=datetime.utcnow)

    delivery_id: Optional[uuid.UUID] = None  # 👈 ADD THIS



## ratings
class Ratings(SQLModel,table=True):
    __tablename__ = "ratings"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        primary_key=True,
        index=True,
    )
    rating:int = Field(index=True)# 1–5
    review:str = Field(index=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    agent_id: Optional[uuid.UUID] = Field(default=None, foreign_key="users.id")
    created_at:datetime = Field(default_factory=datetime.utcnow)
