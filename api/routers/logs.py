from nutritionix_call import get_foods, get_exercises
from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from auth import authenticator
from queries.logs import LogMealQueries
from models import LogMealIn, LogMeal
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

class HttpError(BaseModel):
    detail: str

# placeholder for an account identifier
@router.post("/api/{account}/meals", response_model=LogMeal | dict)
async def create_meal(
    info: LogMealIn,
    repo: LogMealQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        meal = get_foods(info.log_meal)
        meal_doc = repo.create(info, meal, account_data)
        return meal_doc
    return {"message": "meal cannot be created if not logged in"}


@router.get("/api/{account}/meals", response_model=list[LogMeal] | dict)
async def get_meals(
    repo: LogMealQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        meals = repo.get_all(account_data["id"])
        return meals
    return {"message": "meal cannot be retrieved if not logged in"}