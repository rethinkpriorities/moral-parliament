from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import sys
import os.path

# Find the path containing 'parliamentary-project' in sys.path
path = next((p for p in sys.path if "parliamentary-project" in p), None)

# Add '/server' to the found path
if path is not None:
    path = os.path.join(path, "server")
    sys.path.append(path)

from allocate.allocate import (
    allocate_by_top,
    allocate_by_social_utility,
    allocate_by_social_welfare,
    allocate_by_borda_voting,
    allocate_by_maximin,
    allocate_by_favourite_theory,
    allocate_by_merged_favorites,
    allocate_by_ranked_choice_voting,
    allocate_by_nash_bargaining,
)

from allocate.id_conversion_helpers import (
    supplement_with_server_ids,
    convert_from_server_ids,
)

from save.save_to_spreadsheet import create_google_sheet

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/save_as_sheet", methods=["POST"])
def save_as_sheet():
    content = request.json
    website_source = request.referrer
    sheet_id = create_google_sheet(content, website_source)
    return jsonify({"sheetId": sheet_id})


@app.route("/allocate", methods=["POST"])
def return_allocations():
    parliament = request.json["parliament"]
    conversion_dict = supplement_with_server_ids(parliament)
    method = request.json["method"]
    utility_discount = request.json["options"]["utilityDiscount"]
    voting_tiebreaker = request.json["options"]["votingTiebreaker"]
    voting_threshold = request.json["options"]["votingThreshold"]
    status_quo = request.json["options"]["statusQuo"]

    options = {
        "utility_discount": utility_discount,
        "voting_tiebreaker": voting_tiebreaker,
        "voting_threshold": voting_threshold,
        "status_quo": status_quo,
    }
    if method == "approval-voting" and (
        voting_tiebreaker == "none" or voting_tiebreaker == "increased-threshold"
    ):
        (outcomes, notes) = allocate_by_top(parliament, options)
    elif method == "approval-voting" and voting_tiebreaker == "most-utility":
        (outcomes, notes) = allocate_by_social_utility(parliament, options)
    elif method == "social-welfare":
        (outcomes, notes) = allocate_by_social_welfare(parliament, options)
    elif method == "favorite-theory":
        (outcomes, notes) = allocate_by_favourite_theory(parliament, options)
    elif method == "merged-favorites":
        (outcomes, notes) = allocate_by_merged_favorites(parliament, options)
    elif method == "ranked-choice-voting":
        (outcomes, notes) = allocate_by_ranked_choice_voting(parliament, options)
    elif method == "nash-bargaining":
        (outcomes, notes) = allocate_by_nash_bargaining(parliament, options)
    elif method == "borda-voting":
        (outcomes, notes) = allocate_by_borda_voting(parliament, options)
    elif method == "maximin":
        (outcomes, notes) = allocate_by_maximin(parliament, options)
    else:
        raise ValueError("Method not found")
    outcomes = [
        {
            "values": outcome["values"],
            "notes": outcome["notes"].print_notes(conversion_dict),
        }
        for outcome in outcomes
    ]
    convert_from_server_ids(conversion_dict, outcomes),
    return jsonify({"outcomes": outcomes, "notes": notes.print_notes(conversion_dict)})
