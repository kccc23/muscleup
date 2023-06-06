from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from auth import authenticator
from queries.accounts import AccountQueries, DuplicateAccountError
from queries.logs import LogMealQueries, LogExerciseQueries
from queries.trainees import TraineeQueries
from models import AccountIn, AccountOut, Account, AccountUpdateForm
from typing import Optional


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account already exists with this email.",
        )
    form = AccountForm(
        username=info.email,
        password=info.password,
    )
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


# Route to be determined once front-end is more defined
@router.get("/api/accounts", response_model=Account | dict)
async def get_current_account_info(
    repo: AccountQueries = Depends(),
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if account_data:
        account = repo.get(account_data["email"])
        return account
    return {"message": "no account logged in"}


@router.put("/api/accounts", response_model=Account | dict)
async def update_account_info(
    info: AccountUpdateForm,
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
    repo: AccountQueries = Depends(),
):
    if account_data:
        account_email = account_data["email"]
        account_info = repo.update(info, account_email)
        return account_info
    return {"message": "no account logged in"}


# handle logout in react
@router.delete("/api/accounts/{email}", response_model=list | dict)
async def delete_account_info(
    account_data: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
    repo: AccountQueries = Depends(),
    meal_repo: LogMealQueries = Depends(),
    exercise_repo: LogExerciseQueries = Depends(),
    profile_repo: TraineeQueries = Depends(),
):
    if account_data:
        account_email = account_data["email"]
        meal_message = meal_repo.delete_all(account_email)
        exercise_message = exercise_repo.delete_all(account_email)
        profile_message = profile_repo.delete(account_email)
        account_message = repo.delete(account_email)
        message = [
            meal_message,
            exercise_message,
            profile_message,
            account_message,
        ]
        return message
    return {"message": "no account logged in"}


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    repo: AccountQueries = Depends(),
    account: Account = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        account_info = repo.get(account["email"])
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account_info,
        }
