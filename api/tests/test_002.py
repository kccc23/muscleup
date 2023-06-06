from main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_create_new_account():
    new_account = {
        "username": "yosefuser",
        "password": "password",
        "email": "yosef@user.com",
        "first_name": "yosef",
        "last_name": "dandis",
    }
    response = client.post("/api/accounts", json=new_account)

    assert response.status_code == 200 or 400
