from .client import Queries
from models import LogMeal, LogMealIn, LogExercise, LogExerciseIn
from datetime import datetime
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
        props = info.dict()
        props["meal_items"] = meal
        props["account_id"] = account_data["id"]
        props["account_email"] = account_data["email"]
        props["datetime"] = datetime.now().isoformat()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])

        return LogMeal(**props)

    def delete(self, meal_id):
        status = self.collection.delete_one({"_id": ObjectId(meal_id)})
        if status.deleted_count:
            return {"message": "meal deleted successfully"}
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

    def create(self, info: LogExerciseIn, exercise, account_data) -> LogExercise:
        props = info.dict()
        props["exercise_items"] = exercise
        props["account_id"] = account_data["id"]
        props["account_email"] = account_data["email"]
        props["datetime"] = datetime.now().isoformat()

        self.collection.insert_one(props)

        props["id"] = str(props["_id"])

        return LogExercise(**props)
