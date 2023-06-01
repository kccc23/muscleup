from nutritionix_call import get_foods, get_exercises
from fastapi import (
    Depends,
    APIRouter,
)
from auth import authenticator
from queries.logs import LogMealQueries, LogExerciseQueries
from models import LogMealIn, LogMeal, LogExercise, LogExerciseIn
from typing import Optional
from pydantic import BaseModel


router = APIRouter()


class HttpError(BaseModel):
    detail: str


class DeleteMealForm(BaseModel):
    meal_id: str


# placeholder for an account identifier
@router.post("/api/meals", response_model=LogMeal | dict)
async def create_meal(
    info: LogMealIn,
    repo: LogMealQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        meal = get_foods(info.log_meal)
        meal_doc = repo.create(info, meal, account_data)
        return meal_doc
    return {"message": "meal cannot be created if not logged in"}


@router.get("/api/meals", response_model=list[LogMeal] | dict)
async def get_meals(
    repo: LogMealQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        meals = repo.get_all(account_data["id"])
        return meals
    return {"message": "meal cannot be retrieved if not logged in"}


@router.delete("/api/meals/{meal_id}", response_model=dict)
async def delete_meal(
    meal_id: str,
    repo: LogMealQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        message = repo.delete(meal_id, account_data["email"])
        return message
    return {"message": "no account logged in"}


## Functions for exercise logs
@router.get(
    "/api/{account}/exercises", response_model=list[LogExercise] | dict
)
async def get_exercise_list(
    repo: LogExerciseQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        exercises = repo.get_all(account_data["id"])
        return exercises
    return {"message": "exercise cannot be retrieved if not logged in"}


@router.post("/api/{account}/exercises", response_model=LogExercise | dict)
async def create_exercise(
    info: LogExerciseIn,
    repo: LogExerciseQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        exercise = get_exercises(
            info.log_exercise,
            info.gender,
            info.weight_kg,
            info.height_cm,
            info.age,
        )
        exercise_doc = repo.create(info, exercise, account_data)
        return exercise_doc
    return {"message": "exercise cannot be created if not logged in"}


@router.delete("/api/{account}/exercises/{exercise_id}", response_model=dict)
async def delete_exercise(
    exercise_id: str,
    repo: LogExerciseQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        message = repo.delete(exercise_id, account_data["email"])
        return message
    return {"message": "no account logged in"}
