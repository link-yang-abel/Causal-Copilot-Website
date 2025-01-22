import os
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv

load_dotenv()

oauth = OAuth()
oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    client_kwargs={'scope': 'openid profile email'},
    server_metadata_url= 'https://accounts.google.com/.well-known/openid-configuration',
)
