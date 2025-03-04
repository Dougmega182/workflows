from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    mobile_number = Column(String, unique=True, nullable=False)
    company = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    sessions = relationship("Session", back_populates="user")

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    login_time = Column(DateTime, default=datetime.utcnow)
    logout_time = Column(DateTime, nullable=True)
    swms_acknowledged = Column(Boolean, default=False)
    induction_completed = Column(Boolean, default=False)

    user = relationship("User", back_populates="sessions")

class SWMS(Base):
    __tablename__ = "swms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    swms_id = Column(String, nullable=False)
    acknowledged_at = Column(DateTime, default=datetime.utcnow)
    signature = Column(String, nullable=True)

class InductionForm(Base):
    __tablename__ = "induction_forms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    form_id = Column(String, nullable=False)
    completed_at = Column(DateTime, default=datetime.utcnow)
    form_data = Column(JSON, nullable=False)