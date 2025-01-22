from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse, JSONResponse
from app.core.auth.oauth import oauth
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
import os
from json.decoder import JSONDecodeError
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints import users
from app.api.v1.endpoints import files

load_dotenv()
app = FastAPI()

origins = [
    '*',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

@app.get('/login')
async def login(request: Request):
    redirect_uri = os.getenv('GOOGLE_REDIRECT_URI')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/login/callback')
async def login_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)

    id_token = token.get('id_token')
    if not id_token:
        raise ValueError("ID Token is missing")
    
    user_info = token.get('userinfo')
    if not user_info:
        raise ValueError("User info is missing")

    request.session['user'] = {
        'name': user_info.get('name'),
        'email': user_info.get('email')
    }

    response = RedirectResponse(url="http://localhost:5173/dashboard")

    response.set_cookie(
        key="user_name",
        value=user_info.get('name'),
        max_age=3600,
        secure=False
    )

    response.set_cookie(
        key="user_email",
        value=user_info.get('email'),
        max_age=3600,
        secure=False
    )

    return response



@app.get('/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return RedirectResponse(url='/')


@app.get("/dashboard")
async def dashboard(request: Request):
    user = request.session.get('user')
    if user:
        return JSONResponse(content={
            "message": "Welcome to your dashboard!",
            "user": user
        })
    return JSONResponse(content={"message": "No user logged in"}, status_code=401)


@app.get("/")
async def home(request: Request):
    user = request.session.get('user')
    if user:
        return {"message": f"Hello {user['name']}!", "email": user['email']}
    return {"message": "Please log in with Google."}


from app.api.v1.endpoints import users
app.include_router(users.router, prefix="/api/v1", tags=["users"])
app.include_router(files.router, prefix="/api/v1", tags=["files"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
