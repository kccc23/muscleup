from .client import Queries
from models import TraineeProfile, TraineeProfileIn


class DuplicateTraineeError(ValueError):
    pass

class TraineeQueries(Queries):

    DB_NAME = "muscleup"
    COLLECTION = "trainee_profiles"

    def get(self, account_id: str) -> TraineeProfile:
        props = self.collection.find_one({"account_id": account_id})
        if not props:
            return {"message": "Trainee profile does not exist"}
        props["id"] = str(props["_id"])
        return TraineeProfile(**props)

    def create(self, info: TraineeProfileIn, account_data) -> TraineeProfile:
        
        props = info.dict()
        props["account_id"] = account_data["id"]
        props["account_email"] = account_data["email"]
        if self.collection.find_one({"account_id": props["account_id"]}):
            raise DuplicateTraineeError()
        if self.collection.find_one({"account_email": props["account_email"]}):
            raise DuplicateTraineeError()
        
        self.collection.insert_one(props)

        props["id"] = str(props["_id"])

        return TraineeProfile(**props)
