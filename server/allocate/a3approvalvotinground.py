from .types.agent import Agent
from .note_builder import NoteBuilder


def approval_voting_round(
    agents: list[Agent], proposed_allocation: list[float], utility_function, threshold
) -> tuple[list[float], int, NoteBuilder]:
    approval_votes = []
    notes = NoteBuilder()
    notes.table("votes").define_headings(["Worldview", "Vote", "Vote Count"])
    for agent in agents:
        coefficients = agent["coefficients"]
        u_star = agent["u_star"]
        # ustar is the optimal selfish allocation for an agent
        num_agents = agent["num_agents"]
        if num_agents == 0:
            approval_votes.append(0)
            continue
        utility_of_proposed_allocation = utility_function(
            coefficients, proposed_allocation
        )
        if utility_of_proposed_allocation >= threshold * u_star:
            approval_votes.append(num_agents)
            if num_agents > 0:
                notes.table("votes").add_row(
                    [f"worldviewId:{agent['worldview_id']}", "Yes", str(num_agents)]
                )
        else:
            approval_votes.append(0)
            if num_agents > 0:
                notes.table("votes").add_row(
                    [f"worldviewId:{agent['worldview_id']}", "No", str(num_agents)]
                )
    notes.table("vote_total").define_headings(["Vote", "Total"]).add_row(
        ["Yes", str(sum(approval_votes))]
    ).add_row(
        [
            "No",
            str(sum([agent["num_agents"] for agent in agents]) - sum(approval_votes)),
        ]
    )
    return (proposed_allocation, sum(approval_votes), notes)


# the function appends num_agents to approval_votes if the utility of the proposed allocation
# is greater than or equal s_i * u_star, and 0 otherwise. This means that the number of agents that approve the proposed allocation
# is now represented in approval_votes.
