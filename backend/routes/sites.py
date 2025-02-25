# sites.py
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

@router.get("/")
def get_sites(db: Session = Depends(get_db)):
    return {"message": "List of sites"}
