from pydantic import BaseModel
from auth import authenticator
from main import app
from fastapi.testclient import TestClient
from queries.trainees import TraineeQueries

client = TestClient(app)


class TraineeProfile(BaseModel):
    account_id: str
    account_email: str
    id: str
    goal: str
    height: int
    weight: float
    goal_weight: float
    date_of_birth: str
    gender: str


class FakeQueries:
    def __init__(self):
        self.database = {
            "user3000@email.com": TraineeProfile(
                account_id="123",
                account_email="user3000@email.com",
                id="111",
                goal="lose weight",
                height=180,
                weight=80.0,
                goal_weight=70.0,
                date_of_birth="2000-01-01",
                gender="Male",
            )
        }

    def delete(self, email):
        del self.database[email]
        return self.database


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


def test_delete_profile():
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_account
    app.dependency_overrides[TraineeQueries] = FakeQueries
    response = client.delete("/api/trainee_profiles")
    app.dependency_overrides = {}
    assert response.status_code == 200
