from app import app

def test_health():
    client = app.test_client()
    res = client.get("/health")
    assert res.status_code == 200
    assert res.get_json()["status"] == "ok"

def test_create_and_list():
    client = app.test_client()
    payload = {"sender": "it@fake.com", "subject": "Reset", "body": "Click here"}
    res = client.post("/emails", json=payload)
    assert res.status_code == 201
    created = res.get_json()
    assert created["status"] == "Under Review"

    res = client.get("/emails")
    items = res.get_json()
    assert any(i["id"] == created["id"] for i in items)
