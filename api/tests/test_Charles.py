from pydantic import BaseModel
from auth import authenticator
from main import app
from fastapi.testclient import TestClient
from queries.accounts import AccountQueries


client = TestClient(app)


class Account(BaseModel):
    id: str
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    avatar: str | None
    role: str


class FakeQueries:
    def get(self, email):
        return Account(
            id="123",
            username="user3000",
            email="user3000@email.com",
            first_name="User",
            last_name="3000",
            role="trainee",
            password="password",
            avatar="str",
        )


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


def test_get_account():
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_account
    app.dependency_overrides[AccountQueries] = FakeQueries
    response = client.get("/api/accounts")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == fake_account()
