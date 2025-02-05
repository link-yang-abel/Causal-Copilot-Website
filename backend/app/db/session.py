from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# load_dotenv()

# DATABASE_HOST = os.getenv("DATABASE_HOST")
# DATABASE_PORT = os.getenv("DATABASE_PORT")
# DATABASE_NAME = os.getenv("DATABASE_NAME")
# DATABASE_USER = os.getenv("DATABASE_USER")
# DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")

# if not DATABASE_HOST or not DATABASE_PORT or not DATABASE_NAME or not DATABASE_USER or not DATABASE_PASSWORD:
#     raise ValueError("One or more database environment variables are missing")

# DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"

# load .env
load_dotenv()
#
db_type = os.getenv('DB_TYPE')
print('db_type:', db_type)

if db_type == 'sqlite':
    db_file = os.getenv('DB_FILE')
    db_url = f'sqlite:///{db_file}'
elif db_type == 'mysql':
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT')
    db_name = os.getenv('DB_NAME')
    db_url = f'mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
elif db_type == 'postgresql':
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT')
    db_name = os.getenv('DB_NAME')
    db_url = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
else:
    raise ValueError("Unsupported database type in .env file.")
print('db_url:', db_url)


# engine = create_engine(DATABASE_URL)
engine = create_engine(db_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        print(f"Database connection error: {e}")
        raise ValueError(f"Failed to connect to the database: {e}")
    finally:
        db.close()
