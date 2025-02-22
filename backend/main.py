from fastapi import FastAPI, Depends
from backend.routes import sites, signin, signout, reports
from backend.database import init_db

app = FastAPI()

# Include Routes
app.include_router(sites.router, prefix="/sites", tags=["Sites"])
app.include_router(signin.router, prefix="/signin", tags=["Sign-in"])
app.include_router(signout.router, prefix="/signout", tags=["Sign-out"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])

@app.on_event("startup")
def startup():
    init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Construction Sign-in API!"}
