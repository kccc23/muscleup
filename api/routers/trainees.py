from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from auth import authenticator
from queries.trainees import TraineeQueries, DuplicateTraineeError
from models import TraineeProfileIn, TraineeProfileOut
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

class HttpError(BaseModel):
    detail: str

@router.post("/api/trainee_profiles", response_model=TraineeProfileOut | HttpError | dict)
async def create_trainee_profile(
    info: TraineeProfileIn,
    repo: TraineeQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        try:
            trainee = repo.create(info, account_data)
            return trainee
        except DuplicateTraineeError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Trainee already exists with this account information.",
            )
    return {"message": "profile cannot be created if not logged in"}


# Route to be determined once front-end is more defined
@router.get("/api/trainee_profiles/{account_id}", response_model=TraineeProfileOut | dict)
async def get_trainee_profile(
    repo: TraineeQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        trainee = repo.get(account_data["id"])
        return trainee
    return {"message": "profile cannot be retrieved if not logged in"}