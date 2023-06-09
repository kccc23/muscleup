from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)
from auth import authenticator
from typing import Optional
from pydantic import BaseModel
from models import (
    TrainerIn,
    Trainer,
)
from queries.trainers import (
    TrainerQueries,
    DuplicateTrainerError,
    NoTrainerError,
)
from queries.accounts import (
    AccountQueries
)


router = APIRouter()


class HttpError(BaseModel):
    detail: str


@router.post(
    '/api/trainers',
    response_model=Trainer | HttpError | dict,
)
async def create_trainer(
    info: TrainerIn,
    repo: TrainerQueries = Depends(),
    account_repo: AccountQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        try:
            trainer = repo.create(info, account_data)
            role = "trainer"
            message = account_repo.change_role(account_data["email"], role)
            if message:
                return trainer
            else:
                return {"message": "Couldn't change role"}
        except DuplicateTrainerError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Trainer already exists with this account information.",
            )
    raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Trainer cannot be created if not logged in.",
        )


@router.get(
    '/api/trainers/{trainer_id}',
    response_model=Trainer | dict,
)
async def get_trainer(
    trainer_id: str,
    repo: TrainerQueries = Depends(),
):
    trainer = repo.get_one(trainer_id)
    if not trainer:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return trainer


@router.get(
    '/api/trainers',
    response_model=list[Trainer] | dict,
)
async def get_all(
    repo: TrainerQueries = Depends(),
):
    trainers = repo.get_all()
    return trainers

@router.delete("/api/trainers", response_model=dict)
async def delete_trainer(
    repo: TrainerQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        account_id = account_data["id"]
        message = repo.delete(account_id)
        return message
    return {"message": "no account logged in"}


@router.put(
    "/api/trainers",
    response_model=Trainer | HttpError | dict,
)
async def trainer_add_trainee(
    trainee_id: str,
    repo: TrainerQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        account_id = account_data["id"]
        try:
            trainer = repo.add_trainee(account_id, trainee_id)
            return trainer
        except NoTrainerError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You need to create a trainer.",
            )
    return {"message": "no account logged in"}
