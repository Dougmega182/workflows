from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta
from services.token import create_access_token
from database import get_db
import schemas, models

router = APIRouter()

@router.post("/login")
async def login(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.mobile_number == user_data.mobile_number).first()
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    
    access_token = create_access_token(data={"sub": user.mobile_number}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}