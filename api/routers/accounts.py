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
from models import AccountIn, AccountOut
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
        username=info.email, password=info.password,
    )
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


# Route to be determined once front-end is more defined
@router.get("/api/accounts/{email}")
async def get_current_account_info(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        return account_data
    return {"message": "no account logged in"}
