from typing import List
from allocate.types.parliament import InputParliament, Allocation
from itertools import product, combinations_with_replacement
import numpy as np
from numpy.typing import NDArray


def to_labeled_list(flat_list: List[float]) -> Allocation:
    return [
        {"server_project_id": i, "funding": round(item, 2)}
        for i, item in enumerate(flat_list)
    ]


def get_all_allocations(
    budget: int, step: int, number_of_projects: int
) -> List[List[int]]:
    assignments = list(
        combinations_with_replacement(range(number_of_projects), int(budget / step))
    )
    assignments = np.array(assignments)
    sums = np.apply_along_axis(
        lambda x: np.bincount(x, minlength=number_of_projects), 1, assignments
    )
    return (sums * step).tolist()


def evaluations_to_array(evaluations):
    max_project_id = max(map(lambda x: int(x["server_project_id"]), evaluations))
    array = np.zeros(max_project_id + 1)
    for evaluation in evaluations:
        project_id = evaluation["server_project_id"]
        value = evaluation["value"]
        array[project_id] = value
    return array


def get_evaluations_for_allocations(
    parliament: InputParliament, allocations: List[List[float]], utility_discount_str
):
    evaluation_list = []
    for party in parliament:
        for _ in range(party["count"]):
            evaluation_list.append(evaluations_to_array(party["evaluations"]))
    evaluation_array = np.array(evaluation_list)
    allocation_array = np.array(allocations)
    if utility_discount_str == "sqrt":
        allocation_array = np.sqrt(allocation_array)
    if utility_discount_str == "to-one-tenth":
        allocation_array = np.power(allocation_array, 2 / 3)
    allocation_array = np.reshape(
        allocation_array, (allocation_array.shape[0], 1, allocation_array.shape[1])
    )

    # For each element in each evaluation in evaluation_array, multiply it by each allocation in each allocation_array
    allocation_evaluation_array = evaluation_array * allocation_array

    total_allocation_evaluation_array = np.sum(allocation_evaluation_array, axis=2)
    return total_allocation_evaluation_array
