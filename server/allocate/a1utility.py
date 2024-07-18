import math
from typing import List


def get_utility_for(party, allocation, utility_function):
    coefficients = list(
        map(
            lambda x: x["value"],
            sorted(party["evaluations"], key=lambda x: x["server_project_id"]),
        )
    )
    return utility_function(coefficients, allocation)


# individual ith utility function
def ith_utility_function(
    coefficients: List[float],
    proposed_allocation: List[float],
    discount="sqrt",
) -> float:
    if len(coefficients) != len(proposed_allocation):
        raise ValueError(
            "The number of coefficients and proposed allocations must be the same."
        )

    utility_function = 0
    if discount == "sqrt":
        for coefficient, allocation in zip(coefficients, proposed_allocation):
            utility_function += coefficient * math.sqrt(allocation)
    if discount == "to-one-tenth":
        for coefficient, allocation in zip(coefficients, proposed_allocation):
            utility_function += coefficient * math.pow(allocation, 0.1)
    elif discount == "none":
        for coefficient, allocation in zip(coefficients, proposed_allocation):
            utility_function += coefficient * allocation

    return utility_function
