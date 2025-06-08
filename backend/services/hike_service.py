from repositories.hike_repository import create_hike, get_latest_hike, vote_latest_hike

def create_new_hike(data):
    name = data.get("name")
    description = data.get("description", "")
    options = data.get("options", [])

    if not name or not options:
        return {"error": "Name and options are required"}, 400

    create_hike(name, description, options)
    return {"message": "Hike created"}, 201

def fetch_latest_hike():
    hike = get_latest_hike()
    if not hike:
        return {"error": "No hikes found"}, 404

    return {
        "question": "Where should we go for the next hike?",
        "numberOfVotes": sum(opt["count"] for opt in hike["options"]),
        "options": [
            {"id": i + 1, "label": opt["label"], "count": opt["count"]}
            for i, opt in enumerate(hike["options"])
        ]
    }, 200

def vote_for_option(option_id):
    success = vote_latest_hike(option_id)
    if not success:
        return {"error": "Invalid vote"}, 400
    return {"message": "Vote counted"}, 200
