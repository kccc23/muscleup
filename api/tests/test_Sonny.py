from pydantic import BaseModel
from auth import authenticator
from main import app
from fastapi.testclient import TestClient
from queries.logs import LogMealQueries

client = TestClient(app)


class LogMeal(BaseModel):
    id: str
    account_id: str
    account_email: str
    meal_name: str
    meal_items: list
    datetime: str
    log_meal: str


class FakeQueries:
    def get_all(self, id):
        return [
            LogMeal(
                id="123",
                account_id="123",
                account_email="user3000@email.com",
                meal_name="meal",
                meal_items=["item1", "item2"],
                datetime="2000-01-01",
                log_meal="log_meal",
            )
        ]


def fake_account():
    return {
        "id": "123",
        "username": "user3000",
        "email": "user3000@email.com",
        "first_name": "User",
        "last_name": "3000",
        "role": "trainee",
        "password": "password",
        "avatar": "str",
    }


def test_get_all_meals():
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_account
    app.dependency_overrides[LogMealQueries] = FakeQueries
    response = client.get("/api/meals")
    app.dependency_overrides = {}
    assert response.status_code == 200
