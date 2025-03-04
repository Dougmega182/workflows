from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware (Fixes CORS issue)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],  # Replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["http://127.0.0.1:3000"],
    allow_headers=["http://127.0.0.1:3000"],
)

class SignInRequest(BaseModel):
    name: str
    mobile: str
    company: str
    swms: bool

@app.post("/sign-in")
async def sign_in(request: SignInRequest):
    if not request.swms:
        raise HTTPException(status_code=400, detail="SWMS must be acknowledged")

    return {"message": "Sign-in successful", "data": request.dict()}
