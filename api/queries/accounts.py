from .client import Queries
from models import Account, AccountIn, AccountUpdateForm


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

    def create(self, info: AccountIn, hashed_password: str, role="trainee", avatar=None) -> Account:
        props = info.dict()
        props["password"] = hashed_password
        props["role"] = role
        props["avatar"] = avatar
        if self.collection.find_one({"email": props["email"]}):
            raise DuplicateAccountError()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])
        return Account(**props)

    def update(self, info: AccountUpdateForm, account_email):
        props = self.collection.find_one({"email": account_email})
        props["id"] = str(props["_id"])
        for k, v in info.dict().items():
            if v == None or v == "":
                pass
            else:
                props[k] = v
        self.collection.update_one({"email": account_email}, {"$set": {
            "username": props["username"],
            "first_name": props["first_name"],
            "last_name": props["last_name"],
            "avatar": props["avatar"],
        }})
        return Account(**props)

    def delete(self, account_email):
        status = self.collection.delete_one({"email": account_email})
        if status.deleted_count:
            return {"message": "account deleted successfully"}
        else:
            return {"message": "account deletion failed"}
