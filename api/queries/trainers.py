from .client import Queries
from models import TrainerIn, Trainer
from bson.objectid import ObjectId


class DuplicateTrainerError(ValueError):
    pass


class NoTrainerError(ValueError):
    pass


class TrainerQueries(Queries):
    DB_NAME = "muscleup"
    COLLECTION = "trainers"

    def create(self, info: TrainerIn, account_data) -> Trainer:
        props = info.dict()
        props["account_id"] = account_data["id"]
        props["account_email"] = account_data["email"]
        props["trainees"] = []
        if self.collection.find_one({"account_id": props["account_id"]}):
            raise DuplicateTrainerError()
        if self.collection.find_one({"account_email": props["account_email"]}):
            raise DuplicateTrainerError()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])

        return Trainer(**props)

    def get_one(self, trainer_id: str) -> Trainer:
        trainer_id = ObjectId(trainer_id)
        props = self.collection.find_one({"_id": trainer_id})
        if not props:
            return {"message": "Trainer does not exist"}
        props["id"] = str(props["_id"])
        return Trainer(**props)

    def get_all(self) -> list[Trainer]:
        props = self.collection.find()
        trainers = []
        for prop in props:
            prop["id"] = str(prop["_id"])
            trainers.append(Trainer(**prop))
        return trainers

    def delete(self, account_id: str) -> dict:
        status = self.collection.delete_one({"account_id": account_id})
        if status.deleted_count:
            return {"message": "trainer deleted successfully"}
        else:
            return {"message": "trainer deletion failed"}

    def add_trainee(self, account_id: str, trainee_id: str) -> Trainer:
        props = self.collection.find_one({"account_id": account_id})
        try:
            props["id"] = str(props["_id"])
        except TypeError:
            raise NoTrainerError()

        props["trainees"].append(trainee_id)

        self.collection.update_one(
            {"account_id": account_id},
            {"$set": {"trainees": props["trainees"]}},
        )
        return Trainer(**props)
