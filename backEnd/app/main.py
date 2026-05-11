from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.routes import router
from app.models.models import Users, Delivery, Notification, Ratings   # should be imported like so
from app.db import create_Tables
from app._config import cloudinary_config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #this allows us to access our frontend 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event('startup')
def on_startup():
    create_Tables()

app.include_router(router)

# check if app is running
@app.get('/')
def get_app():
    return{'message':"app is running"}