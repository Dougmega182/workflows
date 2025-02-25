# signout.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from utils.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def sign_out_worker():
    return {"message": "Worker signed out"}