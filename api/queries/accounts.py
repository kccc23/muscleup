from .client import Queries
from models import Account, AccountIn


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):

    DB_NAME = "muscleup"
    COLLECTION = "accounts"

    def get(self, email: str) -> Account:
        props = self.collection.find_one({"email": email})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)

    def create(self, info: AccountIn, hashed_password: str, role="trainee") -> Account:
        props = info.dict()
        props["password"] = hashed_password
        props["role"] = role
        if self.collection.find_one({"email": props["email"]}):
            raise DuplicateAccountError()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])
        return Account(**props)
