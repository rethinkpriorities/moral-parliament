# testing all the other functions in the allocate module


import sys
import os

# Add the parent directory to the system path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from allocate.a7agents import convert_parliament_to_agents, add_u_star_to_agents
from allocate.a4approvalvotingsimulation import simulate_approval_voting_rounds
from allocate.a1utility import ith_utility_function
from allocate.allocate import allocate


# 2 agents
# 12 of type with coefficients 1, 2, 3
# 8 of type with coefficients 2, 0, 1

# { "parliament": [ { worldviewId: 1, count: 12, evaluations: [ {projectId: 1, value: 1} {projectId: 2, value: 2} {projectId: 3, value: 3} ] } { worldviewId: 2, count: 8, evaluations: [ {projectId: 1, value: 2} {projectId: 2, value: 0} {projectId: 3, value: 1} ] }] }
example1 = {
    "parliament": [
        {
            "worldviewId": 1,
            "count": 12,
            "evaluations": [
                {"projectId": 1, "value": 1},
                {"projectId": 2, "value": 2},
                {"projectId": 3, "value": 3},
            ],
        },
        {
            "worldviewId": 2,
            "count": 8,
            "evaluations": [
                {"projectId": 1, "value": 2},
                {"projectId": 2, "value": 0},
                {"projectId": 3, "value": 1},
            ],
        },
    ]
}


agents = convert_parliament_to_agents(example1["parliament"])
print("Agents")
print(agents)
print()


"""output:
Agents
[{'coefficients': [0.16666666666666666, 0.3333333333333333, 0.5], 'num_agents': 12, 's_i': 0.8}, 
 {'coefficients': [0.6666666666666666, 0.0, 0.3333333333333333], 'num_agents': 8, 's_i': 0.8}]
"""
# passed

add_u_star_to_agents(agents, 100, False)
# print(agents)
# print dictionary using tabulate
from tabulate import tabulate

table_data = [
    (agent["coefficients"], agent["num_agents"], agent["s_i"], agent["u_star"])
    for agent in agents
]
print(
    tabulate(
        table_data,
        headers=["Coefficients", "Num Agents", "s_i", "u_star"],
        tablefmt="pretty",
    )
)
print()

voting_simulation = simulate_approval_voting_rounds(
    agents, 100, ith_utility_function, step=10
)
print("Voting Simulations")
print(voting_simulation)
print()


# Convert data into a format that tabulate can use
table_data = [(str(x[0]), x[1]) for x in voting_simulation]
# Print the table
print(tabulate(table_data, headers=["Simulation", "Value"], tablefmt="pretty"))

"""output:
+--------------+-------+
|  Simulation  | Value |
+--------------+-------+
| (20, 0, 80)  |  20   |
| (30, 0, 70)  |  20   |
| (30, 10, 60) |  20   |
| (30, 20, 50) |  20   |
| (40, 10, 50) |  20   |
| (40, 20, 40) |  20   |
| (40, 30, 30) |  20   |
| (50, 10, 40) |  20   |
| (50, 20, 30) |  20   |
| (50, 30, 20) |  20   |
| (60, 10, 30) |  20   |
| (60, 20, 20) |  20   |
| (0, 0, 100)  |  12   |
| (0, 10, 90)  |  12   |
| (0, 20, 80)  |  12   |
| (0, 30, 70)  |  12   |
| (0, 40, 60)  |  12   |
| (0, 50, 50)  |  12   |
| (0, 60, 40)  |  12   |
| (0, 70, 30)  |  12   |
| (0, 80, 20)  |  12   |
| (10, 0, 90)  |  12   |
| (10, 10, 80) |  12   |
| (10, 20, 70) |  12   |
| (10, 30, 60) |  12   |
| (10, 40, 50) |  12   |
| (10, 50, 40) |  12   |
| (10, 60, 30) |  12   |
| (10, 70, 20) |  12   |
| (10, 80, 10) |  12   |
| (20, 10, 70) |  12   |
| (20, 20, 60) |  12   |
| (20, 30, 50) |  12   |
| (20, 40, 40) |  12   |
| (20, 50, 30) |  12   |
| (20, 60, 20) |  12   |
| (20, 70, 10) |  12   |
| (30, 30, 40) |  12   |
| (30, 40, 30) |  12   |
| (30, 50, 20) |  12   |
| (30, 60, 10) |  12   |
| (40, 40, 20) |  12   |
| (40, 50, 10) |  12   |
| (40, 0, 60)  |   8   |
| (50, 0, 50)  |   8   |
| (60, 0, 40)  |   8   |
| (60, 30, 10) |   8   |
| (70, 0, 30)  |   8   |
| (70, 10, 20) |   8   |
| (70, 20, 10) |   8   |
| (80, 0, 20)  |   8   |
| (80, 10, 10) |   8   |
| (80, 20, 0)  |   8   |
| (90, 0, 10)  |   8   |
| (90, 10, 0)  |   8   |
| (100, 0, 0)  |   8   |
| (0, 90, 10)  |   0   |
| (0, 100, 0)  |   0   |
| (10, 90, 0)  |   0   |
| (20, 80, 0)  |   0   |
| (30, 70, 0)  |   0   |
| (40, 60, 0)  |   0   |
| (50, 40, 10) |   0   |
| (50, 50, 0)  |   0   |
| (60, 40, 0)  |   0   |
| (70, 30, 0)  |   0   |
+--------------+-------+
"""

allocation = allocate(example1["parliament"], 3)
print("Allocation")
print(allocation)

"""
allocation = allocate(example1['parliament'], 2)

output:
Allocation
[{'projectId': 1, 'funding': 40}, {'projectId': 2, 'funding': 10}, {'projectId': 3, 'funding': 50}]
"""

"""
allocation = allocate(example1['parliament'], 1)

output:
Allocation
[{'projectId': 1, 'funding': 20}, {'projectId': 2, 'funding': 0}, {'projectId': 3, 'funding': 80}]
"""

"""
allocation = allocate(example1['parliament'], 3)

output:
Allocation
[{'projectId': 1, 'funding': 37.11304755329377}, {'projectId': 2, 'funding': 11.043580926314194}, {'projectId': 3, 'funding': 51.84337152039203}]
"""
