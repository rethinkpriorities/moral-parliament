from typing import List
import json
from .note_builder import NoteBuilder
from .a2optimalselfish import get_merged_favorite_allocation
from .a4approvalvotingsimulation import simulate_approval_voting_rounds
from .a1utility import ith_utility_function
from .a7agents import convert_parliament_to_agents, add_u_star_to_agents
from .a5welfarefunctions import sum_coefficients
from .a2optimalselfish import optimise_demand
from .bargaining.nash_bargaining import allocate_by_nash_bargaining
from .voting.borda_voting import allocate_by_borda_voting
from .direct.maximin import allocate_by_maximin
from .allocation_helpers import to_labeled_list, get_all_allocations

from .types.parliament import InputParliament, Allocation, Outcome

import random


def allocate_by_top(
    parliament: InputParliament,
    options={
        "utility_discount": "sqrt",
        "voting_tiebreaker": "none",
        "voting_threshold": 0.8,
    },
) -> tuple[List[Outcome], NoteBuilder]:  # top is arbitrary in some sense, just indexing
    agents = convert_parliament_to_agents(parliament)
    num_of_projects = len(parliament[0]["evaluations"])
    overall_notes = NoteBuilder()
    budget = 100  # this allows us to return percentages

    def utility_function(coefficients, proposed_allocation):
        return ith_utility_function(
            coefficients, proposed_allocation, options["utility_discount"]
        )

    add_u_star_to_agents(agents, utility_function, budget)
    threshold = options["voting_threshold"]
    allocations = get_all_allocations(budget, 10, num_of_projects)
    allocations_votes_and_notes = simulate_approval_voting_rounds(
        agents,
        allocations,
        utility_function,
        threshold=threshold,
    )
    top_annotated_allocations: list[tuple[list[float], NoteBuilder]] = [
        (allocation[0], allocation[2])
        for allocation in allocations_votes_and_notes
        if allocation[1] == allocations_votes_and_notes[0][1]
    ]
    if options["voting_tiebreaker"] == "increased-threshold":
        overall_notes.table("voting-thresholds").define_headings(
            ["Threshold", "Votes"]
        ).add_row(
            [
                "{:.1f}% of favorite allocation".format(threshold * 100),
                allocations_votes_and_notes[0][1],
            ]
        )
        while threshold < 0.99:
            threshold = (threshold * 2 + 1) / 3
            candidate_allocations_votes_and_notes = simulate_approval_voting_rounds(
                agents,
                map(lambda x: x[0], top_annotated_allocations),
                utility_function,
                threshold=threshold,
            )
            candidate_top_allocations = [
                (allocation[0], allocation[2])
                for allocation in candidate_allocations_votes_and_notes
                if allocation[1] == candidate_allocations_votes_and_notes[0][1]
            ]

            if (
                len(candidate_top_allocations) > 0
                and candidate_allocations_votes_and_notes[0][1] > 0
            ):
                overall_notes.table("voting-thresholds").add_row(
                    [
                        "{:.1f}% of favorite allocation".format(threshold * 100),
                        candidate_allocations_votes_and_notes[0][1],
                    ]
                )
                top_annotated_allocations = candidate_top_allocations
            else:
                break

    return (
        [
            {
                "values": to_labeled_list(top_allocation[0]),
                "notes": top_allocation[1],
            }
            for top_allocation in top_annotated_allocations
        ],
        overall_notes,
    )


""" a function like get_top_allocation but one that uses welfare function with agentonly=True to create a social
agent and uses that agent with ith_utility_function to evaluate the utility of each of the allocations with the
most approval votes, if there is more than one such allocation. then returns the allocation with highest social utility"""


def allocate_by_social_utility(
    parliament: InputParliament, options={"utility_discount": "sqrt"}
) -> tuple[List[Outcome], NoteBuilder]:
    agents = convert_parliament_to_agents(parliament)
    num_of_projects = len(parliament[0]["evaluations"])
    overall_notes = NoteBuilder()
    budget = 100  # this allows us to return percentages

    def utility_function(coefficients, proposed_allocation):
        return ith_utility_function(
            coefficients, proposed_allocation, options["utility_discount"]
        )

    add_u_star_to_agents(agents, utility_function, budget)
    allocations = get_all_allocations(budget, 10, num_of_projects)
    allocations_votes_and_notes = simulate_approval_voting_rounds(
        agents, allocations, utility_function, threshold=0.8
    )
    top_votes = max(votes for allocation, votes, notes in allocations_votes_and_notes)
    top_voted_annotated_allocations = [
        (allocation, notes)
        for allocation, votes, notes in allocations_votes_and_notes
        if votes == top_votes
    ]

    # add all coefficients of all agents together
    summed_coefficients = sum_coefficients(agents)

    # find allocation with greates social welfare
    max_utility = float("-inf")
    best_allocation: tuple[List[float], NoteBuilder] = top_voted_annotated_allocations[
        0
    ]
    for allocation in top_voted_annotated_allocations:
        utility = utility_function(summed_coefficients, allocation[0])
        if utility > max_utility:
            max_utility = utility
            best_allocation = allocation

    formatted_allocation: Allocation = to_labeled_list(best_allocation[0])
    return (
        [{"values": formatted_allocation, "notes": best_allocation[1]}],
        overall_notes,
    )


def allocate_by_social_welfare(
    parliament: InputParliament, options={"utility_discount": "sqrt"}
) -> tuple[List[Outcome], NoteBuilder]:
    overall_notes = NoteBuilder()
    agents = convert_parliament_to_agents(parliament)
    budget = 100  # this allows us to return percentages

    def utility_function(coefficients, proposed_allocation):
        return ith_utility_function(
            coefficients, proposed_allocation, options["utility_discount"]
        )

    summed_coefficients = sum_coefficients(agents)

    social_agent = {"coefficients": summed_coefficients}  # only coefficients are needed

    initial_demands = [
        budget / len(social_agent["coefficients"]) for _ in social_agent["coefficients"]
    ]  # Evenly distribute the budget as an initial guess
    optimal_allocation = optimise_demand(
        social_agent["coefficients"], initial_demands, budget, utility_function
    )

    formatted_allocation: Allocation = to_labeled_list(optimal_allocation)

    return ([{"values": formatted_allocation, "notes": NoteBuilder()}], overall_notes)


def allocate_by_favourite_theory(
    parliament, options={"utility_discount": "sqrt"}
) -> tuple[List[Outcome], NoteBuilder]:
    parties = convert_parliament_to_agents(parliament)
    overall_notes = NoteBuilder()
    budget = 100  # this allows us to return percentages

    def utility_function(coefficients, proposed_allocation):
        return ith_utility_function(
            coefficients, proposed_allocation, options["utility_discount"]
        )

    dominant_parties = [
        party
        for party in parties
        if party["num_agents"] == max(party["num_agents"] for party in parties)
    ]

    optimal_allocations = []
    random.seed(0)
    for _ in range(100):
        notes = NoteBuilder()
        notes.table("favorite-theory").define_headings(["Deciding Theory"])
        dominant_party = random.sample(dominant_parties, 1)[0]

        # Allocate according to the favourite agent using allocate_by_social_utility logic
        initial_demands = [
            # Randomize in case precise values matter.
            budget / len(dominant_party["coefficients"]) * random.random()
            for _ in dominant_party["coefficients"]
        ]  # Evenly distribute the budget as an initial guess

        optimal_allocation = optimise_demand(
            dominant_party["coefficients"], initial_demands, budget, utility_function
        )
        optimal_allocation = list(map(lambda x: round(x), optimal_allocation))

        if all(
            json.dumps(opt_elem["values"]) != json.dumps(optimal_allocation)
            for opt_elem in optimal_allocations
        ):
            notes.table("favorite-theory").add_row(
                [f"worldviewId:{dominant_party['worldview_id']}"]
            )
            optimal_allocations.append({"values": optimal_allocation, "notes": notes})

    optimal_allocation = max(
        optimal_allocations,
        key=lambda x: utility_function(dominant_party["coefficients"], x["values"]),
    )
    formatted_allocation: Allocation = [
        {"server_project_id": i, "funding": round(allocation)}
        for i, allocation in enumerate(optimal_allocation["values"])
    ]
    return (
        [
            {
                "values": formatted_allocation,
                "notes": optimal_allocation["notes"],
            }
        ],
        overall_notes,
    )


def allocate_by_ranked_choice_voting(
    parliament, options={"utility_discount": "sqrt"}
) -> tuple[List[Outcome], NoteBuilder]:
    agents = convert_parliament_to_agents(parliament)
    overall_notes = NoteBuilder()
    budget = 100  # this allows us to return percentages

    # add ids
    for i, agent in enumerate(agents):
        agent["worldviewId"] = i

    # Create a dictionary that stores the rankings of each project for each agent, where 1 is the best project, and so on
    project_rankings = {
        agent["worldviewId"]: sorted(
            range(1, len(agent["coefficients"]) + 1),
            key=lambda i: agent["coefficients"][i - 1],
            reverse=True,
        )
        for agent in agents
    }

    # Initialize a dictionary to store the number of first-place votes for each project, set them to 0
    first_place_votes = {i: 0 for i in range(len(agents[0]["coefficients"]))}

    eliminated_projects = []

    round = 0

    # While no project has a majority of first-place votes
    while (
        max(first_place_votes.values())
        <= sum(agent["num_agents"] for agent in agents) / 2
    ) and round < len(agents[i]["coefficients"]):
        round += 1

        # set values of first_place_votes to 0 (useful only after the first round)
        for project in first_place_votes:
            first_place_votes[project] = 0

        # Tally the number of first-place votes for each project
        for agent in agents:
            # Get the list of project rankings for this agent
            rankings = project_rankings[agent["worldviewId"]]

            # The first place project index is the one with smallest ranking (eg at the start it's '1')
            # It correctly handles -999 as not the smallest since we take abs
            first_place_project_index = rankings.index(min(rankings, key=abs))

            # Increment the number of first-place votes for the project by the number of agents in the worldview (it started at 0)
            first_place_votes[first_place_project_index] += agent["num_agents"]

        least_first_votes_project_index = min(
            (
                project
                for project in first_place_votes
                if project not in eliminated_projects
            ),
            key=first_place_votes.get,
        )

        last_place_rank = -999

        # Send the least_votes_project from the rankings of all agents to position -999
        for agent in agents:
            # if least_first_votes_project_index in project_rankings[agent['worldviewId']]:
            # set the rank of the least_votes_project to the last place rank
            project_rankings[agent["worldviewId"]][
                least_first_votes_project_index
            ] = last_place_rank

        eliminated_projects.append(least_first_votes_project_index)

    winner_project = max(first_place_votes, key=first_place_votes.get)

    # Allocate the entire budget to the winner project
    allocation = [0] * len(agents[0]["coefficients"])
    allocation[winner_project] = budget

    formatted_allocation: Allocation = [
        {"server_project_id": i, "funding": allocation}
        # {"server_project_id": i, "funding": round(allocation)}
        for i, allocation in enumerate(allocation)
    ]
    return ([{"values": formatted_allocation, "notes": NoteBuilder()}], overall_notes)


# this method suffers from first-choice-fanaticism. it's myopic about non-top-choice votes.
# suppose 90% really like project 2 but project 1 is slightly preferred by 51% of the population and hated by the rest.
# project 1 will win anyway.
def allocate_by_merged_favorites(
    parliament: InputParliament, options={"utility_discount": "sqrt"}
) -> tuple[List[Outcome], NoteBuilder]:
    overall_notes = NoteBuilder()

    # Utility function for parliamentarians
    def utility_function(coefficients, proposed_allocation):
        return ith_utility_function(
            coefficients, proposed_allocation, options["utility_discount"]
        )

    merged_favorites = get_merged_favorite_allocation(parliament, 100, utility_function)
    labeled_list = to_labeled_list(merged_favorites)
    return ([{"values": labeled_list, "notes": NoteBuilder()}], overall_notes)
