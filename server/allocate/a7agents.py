# the function below needs adjusting to suit the exact format of 'parliament'
from .a1utility import ith_utility_function
from .a2optimalselfish import optimise_demand, optimise_demand_analytically

from .types.agent import Agent
from .types.parliament import InputParliament


def convert_parliament_to_agents(
    parliament: InputParliament
) -> list[Agent]:
    agents = []
    for worldview in parliament:
        evaluations = worldview["evaluations"]
        total_value = sum(
            evaluation["value"] for evaluation in evaluations
        )  # to normalise raw values into usable coefficients
        coefficients = [
            e["value"]
            for e in sorted(evaluations, key=lambda x: x["server_project_id"])
        ]

        num_agents = worldview["count"]
        agents.append(
            {"coefficients": coefficients, "num_agents": num_agents, 'worldview_id': worldview['worldviewId']}
        )
    return agents


def add_u_star_to_agents(
    agents: list[Agent],
    utility_function,
    budget=100,
    analytic=False,
):
    if analytic:
        for agent in agents:
            optimal_allocation = optimise_demand_analytically(
                agent["coefficients"], budget, utility_function
            )
            # print(f"Optimal allocation for agent with coefficients {agent['coefficients']}: {optimal_allocation}")
            optimal_allocation_values = [
                value for value in optimal_allocation[0].values()
            ]
            agent["u_star"] = utility_function(
                agent["coefficients"], optimal_allocation_values
            )
    else:
        for agent in agents:
            initial_demands = [
                budget / len(agent["coefficients"]) for _ in agent["coefficients"]
            ]  # Evenly distribute the budget as an initial guess
            optimal_allocation = optimise_demand(
                agent["coefficients"], initial_demands, budget, utility_function
            )
            # print(f"Optimal allocation for agent with coefficients {agent['coefficients']}: {optimal_allocation}")
            agent["u_star"] = utility_function(
                agent["coefficients"], optimal_allocation
            )
