from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

router = APIRouter()

@router.post("/sign-in")
async def sign_in(data: schemas.SessionCreate, db: Session = Depends(get_db)):
    session = models.Session(**data.dict())
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.post("/sign-out/{session_id}")
async def sign_out(session_id: int, db: Session = Depends(get_db)):
    session = db.query(models.Session).filter(models.Session.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    session.logout_time = datetime.utcnow()
    db.commit()
    return {"message": "User signed out successfully"}