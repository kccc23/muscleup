from .client import Queries
from models import LogMeal, LogMealIn
from datetime import datetime


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
