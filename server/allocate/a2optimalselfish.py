from scipy.optimize import minimize, Bounds
import numpy as np
from numpy.typing import NDArray
from sympy import symbols, Eq, sqrt, solve
from typing import List, Dict
from allocate.types.parliament import (
    InputParliament,
    OutputAllocation,
    Parliamentarian,
    WorldviewEvaluation,
)


def get_merged_favorite_allocation(
    parliament: InputParliament, budget, utility_function
) -> List[float]:
    allocation = [0.0] * len(parliament[0]["evaluations"])
    parliament_size = sum(party["count"] for party in parliament)
    for party in parliament:
        if party["count"] == 0:
            continue
        favorite_allocation = get_favorite_allocation(
            party, budget / parliament_size, utility_function
        )
        allocation = [
            x + y * party["count"] for x, y in zip(allocation, favorite_allocation)
        ]
    return allocation


def get_favorite_allocation(
    parliamentarian: Parliamentarian, budget: int, utility_function
):
    evaluations = [e["value"] for e in parliamentarian["evaluations"]]

    return optimise_demand(
        evaluations,
        [budget / len(evaluations) for _ in range(len(evaluations))],
        budget,
        utility_function,
    )


def optimise_demand(
    coefficients: List[float],
    initial_demands: List[int],
    budget: int,
    utility_function,
) -> List[float]:
    def negative_utility_function(demands: List[int]) -> float:
        return -1 * utility_function(coefficients, demands)

    constraints = {"type": "eq", "fun": lambda demands: np.sum(demands) - budget}
    bounds = Bounds(0, np.inf)  # demands must be non-negative

    result = minimize(
        negative_utility_function,
        initial_demands,
        method="SLSQP",
        constraints=constraints,
        bounds=bounds,
        options={"maxiter": 10000},
    )
    return result.x.tolist()


def optimise_demand_analytically(
    coefficients: List[float], budget: int
) -> List[Dict[str, float]]:
    demands = symbols(" ".join([f"d{i}" for i in range(len(coefficients))]))
    marginal_utilities = [
        coefficient / (2 * sqrt(demand))
        for coefficient, demand in zip(coefficients, demands)
    ]
    budget_constraint = Eq(sum(demand for demand in demands), budget)
    equal_marginal_utilities = [
        Eq(marginal_utility, marginal_utilities[0])
        for marginal_utility in marginal_utilities[1:]
    ]
    solutions = solve([budget_constraint] + equal_marginal_utilities, demands)
    return [
        {str(sol): val.evalf() for sol, val in zip(demands, solution)}
        for solution in solutions
    ]
