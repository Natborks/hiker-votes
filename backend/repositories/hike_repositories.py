from models.db import hikes
from bson.objectid import ObjectId
from datetime import datetime

def create_hike(name, description, options):
    doc = {
        "name": name,
        "description": description,
        "created_at": datetime.utcnow(),
        "options": [{"label": opt, "count": 0} for opt in options]
    }
    hikes.insert_one(doc)

def get_latest_hike():
    return hikes.find_one(sort=[("created_at", -1)])

def vote_latest_hike(option_id):
    hike = get_latest_hike()
    if not hike:
        return False

    option_index = int(option_id) - 1
    if option_index < 0 or option_index >= len(hike["options"]):
        return False

    hike["options"][option_index]["count"] += 1
    hikes.update_one({"_id": hike["_id"]}, {"$set": {"options": hike["options"]}})
    return True
