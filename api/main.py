from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import accounts, trainees, logs, trainers
from auth import authenticator
import os


app = FastAPI()

cors_url = os.environ.get("REACT_URL")

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(trainees.router)
app.include_router(logs.router)
app.include_router(trainers.router)
