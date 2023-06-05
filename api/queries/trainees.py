from .client import Queries
from models import (
    TraineeProfile,
    TraineeProfileIn,
    TraineeProfileUpdateForm,
    TraineeProfileOut,
)


class DuplicateTraineeError(ValueError):
    pass

class NoProfileError(ValueError):
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

    def update(
        self, info: TraineeProfileUpdateForm, account_email: str
    ) -> TraineeProfileOut:
        props = self.collection.find_one({"account_email": account_email})
        try:
            props["id"] = str(props["_id"])
        except TypeError:
            raise NoProfileError()
        for k, v in info.dict().items():
            if v == None or v == "":
                pass
            else:
                props[k] = v

        self.collection.update_one(
            {"account_email": account_email},
            {
                "$set": {
                    "goal": props["goal"],
                    "height": props["height"],
                    "weight": props["weight"],
                    "goal_weight": props["goal_weight"],
                    "date_of_birth": props["date_of_birth"],
                    "gender": props["gender"],
                }
            },
        )
        
        return TraineeProfileOut(**props)

    def delete(self, account_email) -> dict:
        status = self.collection.delete_one({"account_email": account_email})
        if status.deleted_count:
            return {"message": "profile deleted successfully"}
        else:
            return {"message": "profile deletion failed"}
        

