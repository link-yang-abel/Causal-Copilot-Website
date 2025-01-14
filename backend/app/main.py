from fastapi import FastAPI
from app.api.v1.endpoints import users

app = FastAPI()

app.include_router(users.router, prefix="/api/v1", tags=["users"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)