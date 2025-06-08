from flask import Blueprint, request, jsonify
from services.hike_service import create_new_hike, fetch_latest_hike, vote_for_option

hike_bp = Blueprint("hike_bp", __name__)

@hike_bp.route("/create-hike", methods=["POST"])
def create_hike():
    data = request.get_json()
    res, code = create_new_hike(data)
    return jsonify(res), code

@hike_bp.route("/latest", methods=["GET"])
def get_latest():
    res, code = fetch_latest_hike()
    return jsonify(res), code

@hike_bp.route("/vote", methods=["POST"])
def vote():
    data = request.get_json()
    option_id = data.get("option_id")
    if not option_id:
        return jsonify({"error": "Missing option_id"}), 400

    res, code = vote_for_option(option_id)
    return jsonify(res), code
