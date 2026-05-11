from pwdlib import PasswordHash
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from app.config import settings
from jose import JWTError, jwt
from app.db import SessionDep
from sqlmodel import select
from fastapi import Depends, HTTPException
from app.models.models import Users
from pydantic import EmailStr
import cloudinary.uploader as uploader



pwd_hash = PasswordHash.recommended()

def hash_password(password:str) -> str:
    hash= pwd_hash.hash(password)
    return str(hash)


# verify password
def verifyPassword(password:str, password_hash):
    return pwd_hash.verify(password,password_hash)


oAuth_scheme = OAuth2PasswordBearer(tokenUrl='/app/v1/login')


# function to create access token
# --------
# --------

def create_access_token(data:dict,expires_delta:timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expires_in = datetime.now(timezone.utc) + expires_delta   # sets the expiry time for the future
    else:
        expires_in = datetime.now(timezone.utc) + timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp':expires_in})

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


### function to get and authenticate user
# ---------
# ---------

def authenticate_user (session:SessionDep, email:EmailStr, password:str):
    user = session.exec(select(Users).where(Users.email == email)).first()

    if not user:
        raise HTTPException(status_code=404, detail='user not found')
    
    if not verifyPassword(password, user.password_hash):
        raise HTTPException(status_code=401, detail="incorrect password")

    return user


# function to secure all routes

def get_current_user(
    session: SessionDep,
    token: str = Depends(oAuth_scheme)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
    )

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        email: str = payload.get("sub")

        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = session.exec(select(Users).where(Users.email == email)).first()

    if user is None:
        raise credentials_exception

    return user



async def upload_file(file):
    image_file = await file.read()
    result = uploader.upload(image_file)
    return result["secure_url"]

