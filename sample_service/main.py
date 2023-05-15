from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import os

app = FastAPI()

# MongoDB connection settings
MONGO_HOST = "db" # Matches the service name on the docker-compose.yml
MONGO_PORT = 27017 # default MongoDB port
MONGO_DB = "test_database" # the name of database on docker_compose.yml and MongoDB

# Create a MongoDB client
client = MongoClient(MONGO_HOST, MONGO_PORT)

#Access the database
db = client[MONGO_DB]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def test_mongodb():
    obj = db.test_collection.find_one()
    print(obj)
    return {"message": "object found"}

@app.post("/")
async def test_mongodb_post():
    obj = {"name": "orange", "origin": "usa", "price" : 5}
    db.test_collection.insert_one(obj)
    return {"message": "object inserted"}
