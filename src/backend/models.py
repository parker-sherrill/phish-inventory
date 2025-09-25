import os
import uuid
from datetime import datetime, timezone
import boto3

TABLE_NAME = os.environ["TABLE_NAME"]
REGION = os.getenv("AWS_REGION", "us-east-1")

dynamodb = boto3.resource("dynamodb", region_name=REGION)
table = dynamodb.Table(TABLE_NAME)

def now_iso():
    return datetime.now(timezone.utc).isoformat()

def list_reports():
    # Simple scan for MVP
    resp = table.scan()
    return resp.get("Items", [])

def create_report(data: dict):
    item = {
        "id": str(uuid.uuid4()),
        "url": data["url"],
        "type": data.get("type", "email"),
        "description": data["description"],
        "severity": data.get("severity", "medium"),
        "status": data.get("status", "pending"),
        "submittedAt": now_iso(),
        "reporterName": data.get("reporterName", "Anonymous"),
        "reporterEmail": data.get("reporterEmail", "unknown@example.com"),
    }
    table.put_item(Item=item)
    return item

def delete_report(report_id: str):
    table.delete_item(Key={"id": report_id})
