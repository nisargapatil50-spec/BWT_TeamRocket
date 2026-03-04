from flask import Flask, request, jsonify
from flask_cors import CORS
import time

from fraud_engine import calculate_risk_score
from upi_checker import check_upi
from message_checker import check_message
from link_checker import check_link

app = Flask(__name__)
CORS(app)

def build_response(indicators, started_at):
    risk = calculate_risk_score(indicators)
    risk["processing_time_ms"] = round((time.time() - started_at) * 1000, 2)
    return risk

@app.route("/analyze-upi", methods=["POST"])
def analyze_upi():
    started = time.time()
    payload = request.get_json(silent=True) or {}
    upi_id = payload.get("upi_id", "")
    indicators = check_upi(upi_id)
    return jsonify(build_response(indicators, started))

@app.route("/analyze-message", methods=["POST"])
def analyze_message():
    started = time.time()
    payload = request.get_json(silent=True) or {}
    msg = payload.get("message", "")
    indicators = check_message(msg)
    return jsonify(build_response(indicators, started))

@app.route("/analyze-link", methods=["POST"])
def analyze_link():
    started = time.time()
    payload = request.get_json(silent=True) or {}
    url = payload.get("url", "")
    indicators = check_link(url)
    return jsonify(build_response(indicators, started))

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
