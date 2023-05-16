from pydantic import BaseModel

class Account(BaseModel):
    id: str
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    avatar: str | None
    role: str

class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str

class AccountOut(BaseModel):
    id: str
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    avatar: str | None
    role: str