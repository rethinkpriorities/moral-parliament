from typing import List
from allocate.note_builder import NoteBuilder
from allocate.types.parliament import InputParliament, Allocation, Outcome
from allocate.a7agents import convert_parliament_to_agents, add_u_star_to_agents

def allocate_by_borda_voting(parliament, options={"utility_discount": "sqrt"}):
    parties = convert_parliament_to_agents(parliament)
    overall_notes = NoteBuilder()
    local_notes = NoteBuilder()
    budget = 100  # this allows us to return percentages

    # add ids
    for i, party in enumerate(parties):
        party["worldviewId"] = i

    # Calculate the total number of agents
    total_num_agents = sum(party["num_agents"] for party in parties)

    # Calculate the Borda scores and credence-weighted Borda scores
    project_scores = [0] * len(parties[0]["coefficients"])

    for party in parties:
        borda_scores = [
            sum(
                (1 if party["coefficients"][i] > party["coefficients"][j] else 
                -1 if party["coefficients"][i] < party["coefficients"][j] else 0)
                for j in range(len(party["coefficients"]))
            )
            # add 1 if the option is more preferred than another.
                # -1 if the option is less preferred than another. 
                # (nothing when equal)
            for i in range(len(party["coefficients"]))
        ]
        credence = party["num_agents"] / total_num_agents
        for index, score in enumerate(borda_scores):
            project_scores[index] += score * credence

    local_notes.table("borda_scores").define_headings(["Project", "Credence-Weighted Borda Score"])
    for index, score in enumerate(project_scores):
        local_notes.table("borda_scores").add_row(
            [
                f"server_project_id:{index}",
                round(score, 2)
            ]
        )

    winner_project = project_scores.index(max(project_scores))

    # Allocate the entire budget to the winner project
    allocation = [0] * len(parties[0]["coefficients"])
    allocation[winner_project] = budget

    formatted_allocation = [
        {"server_project_id": i, "funding": alloc} for i, alloc in enumerate(allocation)
    ]
    return ([{"values": formatted_allocation, "notes": local_notes}], overall_notes)
