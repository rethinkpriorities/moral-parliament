from itertools import product, combinations_with_replacement
from .a1utility import ith_utility_function
from .a3approvalvotinground import approval_voting_round
from .types.agent import Agent
import numpy as np
from typing import List
from .note_builder import NoteBuilder


#  Get all assingments of a budget to projects at stated step size
#  Starts by allocating each step of the budget to projects
#  Then sums the number of steps allocated
#  def get_all_assignments(
#  budget: int, step: int, number_of_projects: int
#  ) -> list[list[int]]:
#  assignments = list(
#  combinations_with_replacement(range(number_of_projects), int(budget / step))
#  )
#  assignments = np.array(assignments)
#  sums = np.apply_along_axis(
#  lambda x: np.bincount(x, minlength=number_of_projects), 1, assignments
#  )
#  return (sums * step).tolist()


def simulate_approval_voting_rounds(
    agents: list[Agent],
    allocations,
    utility_function,
    threshold=0.8,
) -> List[tuple[list[float], int, NoteBuilder]]:
    # if budget % step != 0:
    #     raise ValueError("The budget should be divisible into k equal integer parts")
    # print(f"there's {len(allocations)} possible allocations that sum to the budget")

    # Simulate an approval voting round for each allocation
    allocations_votes_and_notes = [
        approval_voting_round(agents, allocation, utility_function, threshold)
        for allocation in allocations
    ]

    # Sort the allocations by the number of approval votes in descending order
    allocations_votes_and_notes.sort(key=lambda x: x[1], reverse=True)

    # Return the allocations
    return allocations_votes_and_notes
