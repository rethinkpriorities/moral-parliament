from allocate.allocation_helpers import (
    get_all_allocations,
    get_evaluations_for_allocations,
    to_labeled_list,
)
import numpy as np
import json
from allocate.types.parliament import InputParliament
from allocate.note_builder import NoteBuilder

from allocate.a1utility import ith_utility_function, get_utility_for
from allocate.a2optimalselfish import get_merged_favorite_allocation


def get_increments(increments_out_of_100, allocation):
    incremented_allocation_arr = increments_out_of_100 * 0.1 + allocation * 0.9
    return np.round(incremented_allocation_arr, 2)


def remove_rejectors(possible_allocations, evaluations):
    """Given an array of allocations and corresponding sets of evaluations of each, remove all allocations, evals, for which some eval is 0"""
    filtered_allocations = possible_allocations[(evaluations >= 0).all(axis=1)]
    filtered_evaluations = evaluations[(evaluations >= 0).all(axis=1)]
    return filtered_allocations, filtered_evaluations


def get_products(possible_allocations):
    return np.product(possible_allocations, axis=1)


# Get all assingments of a budget to projects at stated step size
# Starts by allocating each step of the budget to projects
# Then sums the number of steps allocated
def solve_for_nash_bargain(
    parliament: InputParliament, status_quo, utility_discount_str
):
    number_of_projects = len(parliament[0]["evaluations"])
    if number_of_projects < 3:
        granularity = 1
    elif number_of_projects < 5:
        granularity = 2.5
    elif number_of_projects < 7:
        granularity = 5
    else:
        granularity = 10

    # Start witl a list of all possible allocations
    all_possible_allocations = np.array(
        get_all_allocations(100, granularity, number_of_projects)
    )
    # Take a weighted average of each possible allocation with the existing status quo allocation
    # These are the allocations we'll consider for this round
    possible_increments = get_increments(all_possible_allocations, np.array(status_quo))

    # Add the status quo allocation so it remains a candidate
    possible_allocations = np.append(
        possible_increments, np.array(status_quo).reshape(1, len(status_quo)), axis=0
    )

    # Evaluate each allocation for each parliamentarian
    evaluations_for_allocations = get_evaluations_for_allocations(
        parliament,
        possible_allocations,
        utility_discount_str,
    )

    # Evaluate the status quo allocation for eac parliamentarin
    evaluations_for_status_quo = get_evaluations_for_allocations(
        parliament, [status_quo], utility_discount_str
    )

    # Find the difference between the status quo and each allocation for each parliamentarian.
    # The nash bargain solution will maximize the products of these differences.
    evaluations_less_status_quo = (
        evaluations_for_allocations - evaluations_for_status_quo
    )

    # Throw out the allocations which are evaluated by someone as worse than the status quo
    allocations_with_no_rejectors, evaluations_with_no_rejectors = remove_rejectors(
        possible_allocations, evaluations_less_status_quo
    )

    # Find the product of each parliamentarians eval of each allocation.
    products = get_products(evaluations_with_no_rejectors)
    sorted_allocations_by_product_sum = allocations_with_no_rejectors[
        np.argsort(-products)
    ]

    number_of_max_products = np.sum(products == np.max(products))
    max_allocations = sorted_allocations_by_product_sum[0:number_of_max_products]

    # Return list of allocations that maximize this product.
    return max_allocations


def annotate_allocation(allocation, status_quo, parliament, utility_function):
    notes = NoteBuilder()
    notes.table("improvements").define_headings(
        ["Worldview", "Utility improvement over status quo"]
    )
    for party in parliament:
        utility_from_change = get_utility_for(
            party, allocation, utility_function
        ) - get_utility_for(party, status_quo, utility_function)
        notes.table("improvements").add_row(
            [
                "worldviewId:" + str(party["worldviewId"]),
                str(round(utility_from_change, 2)),
            ]
        )
    notes.table("project_changes").define_headings(
        ["Project", "Change from status quo"]
    )
    for idx, allotment in enumerate(allocation):
        notes.table("project_changes").add_row(
            [
                "server_project_id:" + str(idx),
                ("+" if allotment > status_quo[idx] else "")
                + str(round(allotment - status_quo[idx], 2)),
            ]
        )

    return notes


#  Runs main function times and returns list of the results
def allocate_by_nash_bargaining(
    parliament: InputParliament,
    options={"utility_discount": "sqrt", "status_quo": "merged"},
):
    number_of_projects = len(parliament[0]["evaluations"])
    notes = NoteBuilder()

    # Utility function for parliamentarians
    def utility_function(coefficients, proposed_allocation):
        return ith_utility_function(
            coefficients, proposed_allocation, options["utility_discount"]
        )

    # Everyone must agree that a bargain improves on this.
    if options["status_quo"] == "merged":
        # Start with an allocation where each parliamentarian gets to put in their favorites.
        status_quo = get_merged_favorite_allocation(parliament, 100, utility_function)
    elif options["status_quo"] == "zeros":
        status_quo = np.zeros(number_of_projects)

    # We don't consider all possibilities at once, because there are far too many.
    # Instead, we consider possible incremental improvements on the starting allocation,
    # repeating until no improvements can be agreed upon.
    consensus_allocations = np.array([status_quo])
    # pivot allocation is allocation we will try to incrementally improve
    pivot_allocation = consensus_allocations[0]
    better_allocations = np.array([])
    while not np.array_equal(consensus_allocations, better_allocations):
        consensus_allocations = better_allocations
        better_allocations = solve_for_nash_bargain(
            parliament, pivot_allocation, options["utility_discount"]
        )
        pivot_allocation = better_allocations[0]

    return (
        [
            {
                "values": to_labeled_list(allocation),
                "notes": annotate_allocation(
                    allocation, status_quo, parliament, utility_function
                ),
            }
            for allocation in consensus_allocations
        ],
        notes,
    )
