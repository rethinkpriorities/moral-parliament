from scipy.optimize import minimize
from typing import List
import json
from allocate.note_builder import NoteBuilder
from allocate.a7agents import convert_parliament_to_agents, add_u_star_to_agents

from allocate.a2optimalselfish import get_merged_favorite_allocation

#  from .a4approvalvotingsimulation import simulate_approval_voting_rounds
from allocate.a1utility import ith_utility_function

#  from .a7agents import convert_parliament_to_agents, add_u_star_to_agents
#  from .a5welfarefunctions import sum_coefficients
#  from .a2optimalselfish import optimise_demand
#  from .bargaining.nash_bargaining import allocate_by_nash_bargaining
#  from .voting.borda_voting import allocate_by_borda_voting
#  from .direct.maximin import allocate_by_maximin
from allocate.allocation_helpers import to_labeled_list, get_all_allocations

from allocate.types.parliament import InputParliament, Allocation, Outcome

def allocate_by_maximin(parliament, options={"utility_discount": "sqrt"})-> tuple[List[Outcome], NoteBuilder]:
    relevant_parties = [
        party for party in convert_parliament_to_agents(parliament) if party["num_agents"] > 0
    ]

    num_of_projects = len(parliament[0]["evaluations"])
    budget = 100

    def utility_function(coefficients, proposed_allocation):
        return ith_utility_function(coefficients, proposed_allocation, options["utility_discount"])

    def objective_function(proposed_allocation_flat):
        utilities = [utility_function(party["coefficients"], proposed_allocation_flat) for party in relevant_parties]
        return -min(utilities) # negative because we are maximising this later with a minimisation algorithm

    def constraint_total_resources(proposed_allocation_flat):
        total_alloc = sum(proposed_allocation_flat)
        return budget - total_alloc

    initial_guess = [budget / num_of_projects for _ in range(num_of_projects)]

    result = minimize(
        objective_function,
        initial_guess,
        method='SLSQP',
        constraints={'type': 'eq', 'fun': constraint_total_resources},
        bounds=[(0, budget) for _ in range(num_of_projects)]
    )

    optimal_allocation = result.x
    min_worldview_id = min(relevant_parties, key=lambda p: utility_function(p["coefficients"], optimal_allocation))["worldview_id"]

    local_notes = NoteBuilder()
    local_notes.table("least_satisfied_worldview").define_headings(["Least Satisfied Worldview"])
    local_notes.table("least_satisfied_worldview").add_row([f"worldviewId:{min_worldview_id}"])

    labeled_list = to_labeled_list(optimal_allocation)
    overall_notes = NoteBuilder()

    return ([{"values": labeled_list, "notes": local_notes}], overall_notes)