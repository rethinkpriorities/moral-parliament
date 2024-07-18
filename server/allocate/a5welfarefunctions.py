#  from .a2optimalselfish import optimise_demand, optimise_demand_analytically
from .types.agent import Agent

# how do we decide between ties? utilitarian W function from the allocations that have max approval votes


#  def utilitarian_welfare_function(agents: list[Agent], budget: int, analytic=True) -> dict[str, float]:
#  # Compute the sum of each ith coefficient across all agents
#  summed_coefficients = sum_coefficients(agents);

#  # Use the chosen method to find the ideal social allocation
#  if analytic:
#  return optimise_demand_analytically(summed_coefficients, budget)
#  else:
#  initial_demands = [0.1] * len(summed_coefficients)
#  return optimise_demand(summed_coefficients, initial_demands, budget)


def sum_coefficients(agents: list[Agent]):
    num_of_projects = len(agents[0]["coefficients"])
    summed_coefficients = [
        sum(agent["coefficients"][i] * agent["num_agents"] for agent in agents)
        for i in range(num_of_projects)
    ]
    return summed_coefficients
