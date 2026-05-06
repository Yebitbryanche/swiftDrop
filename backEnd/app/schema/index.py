from pydantic import EmailStr
from typing import Optional
from sqlmodel import SQLModel
from datetime import datetime

class CreateUser(SQLModel):
    full_name: str
    phone: str
    email: EmailStr
    password:str
    role: str
    office_location: Optional[str] = None
    delivery_fee: Optional[float] = None
    working_hours: Optional[str] = None
    vehicle_type: Optional[str] = None

class LoginRequest(SQLModel):
    email:EmailStr
    password:str

class RequestDelivery(SQLModel):
    pickup_location:str
    delivery_location:str
    item_type:str