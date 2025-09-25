from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import awsgi  # from aws-wsgi
from models import list_reports, create_report, delete_report

app = Flask(__name__)

# CORS: allow everything in Lambda (frontend filtered by API Gateway)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.get("/")
def index():
    return {"status": "running"}, 200

@app.get("/health")
def health():
    return {"status": "ok"}, 200

@app.get("/emails")
def get_emails():
    items = list_reports()
    items = sorted(items, key=lambda r: r.get("submittedAt",""), reverse=True)
    return jsonify(items), 200

@app.post("/emails")
def post_email():
    data = request.get_json(silent=True) or {}
    if not data.get("url") or not data.get("description"):
        return {"error": "url and description are required"}, 400
    item = create_report(data)
    return jsonify(item), 201

@app.delete("/emails/<report_id>")
def delete_email(report_id):
    delete_report(report_id)
    return {"message": f"Deleted {report_id}"}, 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "5000")), debug=True)

def lambda_handler(event, context):
    return awsgi.response(app, event, context)
