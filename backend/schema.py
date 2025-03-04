from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    name: str
    mobile_number: str
    company: str

class SessionCreate(BaseModel):
    user_id: int
    swms_acknowledged: bool
    induction_completed: bool

class SWMSCreate(BaseModel):
    user_id: int
    swms_id: str
    signature: Optional[str] = None

class InductionFormCreate(BaseModel):
    user_id: int
    form_id: str
    form_data: dict