from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from auth import authenticator
from typing import Optional
from pydantic import BaseModel

router = APIRouter()
