from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)

from auth import authenticator
from queries.trainees import (
    TraineeQueries,
    DuplicateTraineeError,
    NoProfileError)
from models import (
    TraineeProfileIn,
    TraineeProfileOut,
    TraineeProfileUpdateForm,
)
from typing import Optional
from pydantic import BaseModel

router = APIRouter()


class HttpError(BaseModel):
    detail: str


@router.post(
    "/api/trainee_profiles",
    response_model=TraineeProfileOut | HttpError | dict,
)
async def create_trainee_profile(
    info: TraineeProfileIn,
    repo: TraineeQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        # # check for duplicate profile
        # check = repo.get(account_data["id"])
        # if check:
        #     return {
        #         "message": "profile already exists, aborting profile creation"
        #     }
        # create profile
        try:
            trainee = repo.create(info, account_data)
            return trainee
        except DuplicateTraineeError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Trainee already exists with this account information.",
            )
    raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile cannot be created if not logged in.",
        )


# Route to be determined once front-end is more defined
@router.get(
    "/api/trainee_profiles",
    response_model=TraineeProfileOut | dict,
)
async def get_trainee_profile(
    repo: TraineeQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        trainee = repo.get(account_data["id"])
        return trainee
    return {"message": "profile cannot be retrieved if not logged in"}


@router.put(
    "/api/trainee_profiles",
    response_model=TraineeProfileOut | HttpError | dict,
)
async def update_trainee_profile(
    info: TraineeProfileUpdateForm,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
    repo: TraineeQueries = Depends(),
):
    if account_data:
        account_email = account_data["email"]
        try:
            trainee_profile = repo.update(info, account_email)
            return trainee_profile
        except NoProfileError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You need to create a profile.",
            )
    return {"message": "no account logged in"}


@router.delete("/api/trainee_profiles", response_model=dict)
async def delete_trainee_profile(
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
    repo: TraineeQueries = Depends(),
):
    if account_data:
        account_email = account_data["email"]
        message = repo.delete(account_email)
        return message
    return {"message": "no account logged in"}
