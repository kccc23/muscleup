import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from models import Account
from queries.accounts import AccountQueries

# from queries.sessions import SessionQueries


class Auth(Authenticator):
    async def get_account_data(
        self, email: str, accounts: AccountQueries
    ) -> Account:
        return accounts.get(email)

    def get_account_getter(
        self, accounts: AccountQueries = Depends()
    ) -> AccountQueries:
        return accounts

    def get_hashed_password(self, account: Account) -> str:
        return account.password

    # def get_account_data_for_cookie(self, account: Account) -> AccountOut:
    #     return account.email, AccountOut(**account.dict())

    # def get_session_getter(self, session_repo: SessionQueries = Depends()):
    #     return session_repo

    # async def jti_created(self, jti, account, session_repo):
    #     session_repo.create(jti, account)

    # async def jti_destroyed(self, jti, session_repo):
    #     session_repo.delete(jti)

    # async def validate_jti(self, jti, session_repo):
    #     return session_repo.get(jti) is not None


authenticator = Auth(os.environ["SIGNING_KEY"])
