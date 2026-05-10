from typing import Annotated
from sqlmodel import create_engine, SQLModel, Session
from fastapi import Depends
from app.config import settings

db_URL = settings.DB_URL

connect_args = {'check_same_thread':False}
engine = create_engine(db_URL, echo=True)

def create_Tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]