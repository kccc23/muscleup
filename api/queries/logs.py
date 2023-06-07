from .client import Queries
from models import (LogMeal, LogMealIn, LogExercise,
                    LogExerciseIn, LogWeight, LogWeightIn)
from datetime import datetime
from zoneinfo import ZoneInfo
from bson.objectid import ObjectId


class LogMealQueries(Queries):
    DB_NAME = "muscleup"
    COLLECTION = "log_meals"

    def get_all(self, account_id: str) -> list[LogMeal]:
        props = self.collection.find({"account_id": account_id})
        meals = []
        for prop in props:
            prop["id"] = str(prop["_id"])
            meals.append(LogMeal(**prop))
        return meals

    def create(self, info: LogMealIn, meal, account_data) -> LogMeal:
        ny_tz = ZoneInfo('America/New_York')
        props = info.dict()
        props["meal_items"] = meal
        props["account_id"] = account_data["id"]
        props["account_email"] = account_data["email"]
        props["datetime"] = datetime.now(ny_tz).isoformat()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])

        return LogMeal(**props)

    def delete(self, meal_id, account_email):
        status = self.collection.delete_one(
            {
                "$and": [
                    {"_id": ObjectId(meal_id)},
                    {"account_email": account_email},
                ]
            }
        )
        if status.deleted_count:
            return {"message": "meal deleted successfully"}
        else:
            return {"message": "meal deletion failed"}

    def delete_all(self, account_email):
        status = self.collection.delete_many({"account_email": account_email})
        if status.deleted_count:
            return {"message": f"{status.deleted_count} meal logs deleted"}
        else:
            return {"message": "meal deletion failed"}


class LogExerciseQueries(Queries):
    DB_NAME = "muscleup"
    COLLECTION = "log_exercises"

    def get_all(self, account_id: str) -> list[LogExercise]:
        props = self.collection.find({"account_id": account_id})
        exercises = []
        for prop in props:
            prop["id"] = str(prop["_id"])
            exercises.append(LogExercise(**prop))
        return exercises

    def create(
        self, info: LogExerciseIn, exercise, account_data
    ) -> LogExercise:
        ny_tz = ZoneInfo('America/New_York')
        props = info.dict()
        props["exercise_items"] = exercise
        props["account_id"] = account_data["id"]
        props["account_email"] = account_data["email"]
        props["datetime"] = datetime.now(ny_tz).isoformat()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])

        return LogExercise(**props)

    def delete(self, exercise_id, account_email):
        status = self.collection.delete_one(
            {
                "$and": [
                    {"_id": ObjectId(exercise_id)},
                    {"account_email": account_email},
                ]
            }
        )
        if status.deleted_count:
            return {"message": "exercise deleted successfully"}
        else:
            return {"message": "exercise deletion failed"}

    def delete_all(self, account_email):
        status = self.collection.delete_many({"account_email": account_email})
        if status.deleted_count:
            return {"message": f"{status.deleted_count} exercise logs deleted"}
        else:
            return {"message": "exercise deletion failed"}


class LogWeightQueries(Queries):
    DB_NAME = "muscleup"
    COLLECTION = "log_weights"

    def get_all(self, account_id: str) -> list[LogWeight]:
        props = self.collection.find({"account_id": account_id})
        weights = []
        for prop in props:
            prop["id"] = str(prop["_id"])
            weights.append(LogWeight(**prop))
        return weights

    def create(self, info: LogWeightIn, account_data) -> LogWeight:
        ny_tz = ZoneInfo('America/New_York')
        props = info.dict()
        props["account_id"] = account_data["id"]
        props["account_email"] = account_data["email"]
        props["datetime"] = datetime.now(ny_tz).isoformat()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])

        return LogWeight(**props)
