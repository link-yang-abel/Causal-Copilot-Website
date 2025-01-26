from fastapi import FastAPI, Request, WebSocket
from fastapi.responses import RedirectResponse, JSONResponse
from app.core.auth.oauth import oauth
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
import os
import json
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

# websocket
active_server_map: dict[str, WebSocket] = {}
# active_servers: list[{'id':str, 'ws':WebSocket}] = []
active_servers: list[tuple[str, WebSocket]] = []

@app.websocket("/ws_server/{s_id}")
async def websocket_server(websocket: WebSocket, s_id: str):
    await websocket.accept()
    active_server_map[s_id] = websocket
    active_servers.append((s_id, websocket))
    # while True:
    data = await websocket.receive_text()
    print('s:', data)
    await websocket.send_text(f"get:{data}")
    # while True:
    data = await websocket.receive_text()
    print('data:', data)
    #     pass

active_workflow: dict[str, WebSocket] = {}
@app.websocket("/ws_workflow/{c_id}")
async def websocket_workflow(websocket: WebSocket, c_id: str):
    await websocket.accept()
    active_workflow[c_id] = websocket
# def verify_websocket_token(websocket):
#     return True

active_clients: dict[str, WebSocket] = {}
@app.websocket("/ws_client/{c_id}")
async def websocket_client(websocket: WebSocket, c_id: str):
    # verify token
    # TODO:
    # auth_header = websocket.headers.get("authorization")

    #
    await websocket.accept()
    # active_clients[c_id] = websocket

    if len(active_servers) > 0:
        server = active_servers[0]
        data = {'c_id': c_id, 's_id': server[0]}
        msg = json.dumps(data)
        print('msg:', msg)
        await server[1].send_text(msg)
        # res = await server[1].receive_text()
        # print('res:', res)

        while True:
            data = await websocket.receive_text()
            print(f"get from client[{c_id}]: {data}")
            s = None
            print('servers:', active_servers)
            print(' ', len(active_servers))
            for ss in active_servers:
                print(' ', ss)
            if len(active_servers) > 0:
                s = active_servers[0]
            if s:
                print(f"send to server[{s[0]}]:{data}")
                await s[1].send_text(f"client[{c_id}]:{data}")
    else:
        await websocket.send_text(f"no server is online!!!")


app.include_router(users.router, prefix="/api/v1", tags=["users"])
app.include_router(files.router, prefix="/api/v1", tags=["files"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
