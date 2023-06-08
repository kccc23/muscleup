from nutritionix_call import get_foods, get_exercises
from fastapi import (
    Depends,
    APIRouter,
)
from auth import authenticator
from queries.logs import LogMealQueries, LogExerciseQueries, LogWeightQueries
from queries.trainees import TraineeQueries
from models import (
    LogMealIn,
    LogMeal,
    LogExercise,
    LogExerciseIn,
    LogWeight,
    LogWeightIn,
)
from typing import Optional
from pydantic import BaseModel
from datetime import date, datetime


router = APIRouter()


class HttpError(BaseModel):
    detail: str


class DeleteMealForm(BaseModel):
    meal_id: str


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


@router.get("/api/exercises", response_model=list[LogExercise] | dict)
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


@router.post("/api/exercises", response_model=LogExercise | dict)
async def create_exercise(
    info: LogExerciseIn,
    repo: LogExerciseQueries = Depends(),
    profile_repo: TraineeQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        trainee = profile_repo.get(account_data["id"])

        today = date.today()
        birth_date = datetime.strptime(trainee.date_of_birth, "%Y-%m-%d")
        age = today.year - birth_date.year
        if (today.month, today.day) < (birth_date.month, birth_date.day):
            age -= 1
        exercise = get_exercises(
            info.log_exercise,
            trainee.gender,
            trainee.weight,
            trainee.height,
            age,
        )
        exercise_doc = repo.create(info, exercise, account_data)
        return exercise_doc
    return {"message": "exercise cannot be created if not logged in"}


@router.delete("/api/exercises/{exercise_id}", response_model=dict)
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


@router.post("/api/weights", response_model=LogWeight | dict)
async def create_weight(
    info: LogWeightIn,
    repo: LogWeightQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        weight = repo.create(info, account_data)
        return weight
    return {"message": "weight cannot be created if not logged in"}


@router.get("/api/weights", response_model=list[LogWeight] | dict)
async def get_weights(
    repo: LogWeightQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        weights = repo.get_all(account_data["id"])
        return weights
    return {"message": "meal cannot be retrieved if not logged in"}
