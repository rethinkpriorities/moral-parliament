from scipy.optimize import minimize
from allocate.note_builder import NoteBuilder
from allocate.a7agents import convert_parliament_to_agents
from allocate.a1utility import ith_utility_function
from allocate.allocation_helpers import to_labeled_list, get_all_allocations
from allocate.direct.maximin import allocate_by_maximin
from .factories import build_parliament

# This test was used to compare two methods, but now we're just using direct method

# def direct_allocate_by_maximin(parliament, options={"utility_discount": "sqrt"}):
#     relevant_parties = [
#         party for party in convert_parliament_to_agents(parliament) if party["num_agents"] > 0
#     ]

#     num_of_projects = len(parliament[0]["evaluations"])
#     budget = 100

#     def utility_function(coefficients, proposed_allocation):
#         return ith_utility_function(coefficients, proposed_allocation, options["utility_discount"])

#     def objective_function(proposed_allocation_flat):
#         utilities = [utility_function(party["coefficients"], proposed_allocation_flat) for party in relevant_parties]
#         return -min(utilities) # negative because we are maximising this later with a minimisation algorithm

#     def constraint_total_resources(proposed_allocation_flat):
#         total_alloc = sum(proposed_allocation_flat)
#         return budget - total_alloc

#     initial_guess = [budget / num_of_projects for _ in range(num_of_projects)]

#     result = minimize(
#         objective_function,
#         initial_guess,
#         method='SLSQP',
#         constraints={'type': 'eq', 'fun': constraint_total_resources},
#         bounds=[(0, budget) for _ in range(num_of_projects)]
#     )

#     optimal_allocation = result.x
#     min_worldview_id = min(relevant_parties, key=lambda p: utility_function(p["coefficients"], optimal_allocation))["worldview_id"]

#     local_notes = NoteBuilder()
#     local_notes.table("least_satisfied_worldview").define_headings(["Least Satisfied Worldview"])
#     local_notes.table("least_satisfied_worldview").add_row([f"worldviewId:{min_worldview_id}"])

#     labeled_list = to_labeled_list(optimal_allocation)
#     overall_notes = NoteBuilder()

#     return ([{"values": labeled_list, "notes": local_notes}], overall_notes)


# def compare_allocations(direct_allocations, implemented_allocations, tolerance=1e-2):
#     for da, ia in zip(direct_allocations, implemented_allocations):
#         print(f"Comparing project {da['server_project_id']}: {da['funding']} vs {ia['funding']}")
#         assert da["server_project_id"] == ia["server_project_id"]
#         assert abs(da["funding"] - ia["funding"]) < tolerance, f"Funding differs: {da['funding']} != {ia['funding']}"


# def test_allocate_by_maximin():
#     parliament = build_parliament()
    
#     # Adding worldviewId to the parliament structure
#     for i, party in enumerate(parliament):
#         party["worldviewId"] = i
    
#     # Test with the direct suggested approach
#     result_direct = direct_allocate_by_maximin(parliament)
    
#     # Test with the implemented approach
#     result_implemented = allocate_by_maximin(parliament)
    
#     # Check allocations with tolerance
#     direct_allocations = result_direct[0][0]["values"]
#     implemented_allocations = result_implemented[0][0]["values"]
#     compare_allocations(direct_allocations, implemented_allocations)

#     # Check notes
#     direct_notes = result_direct[0][0]["notes"].tables["least_satisfied_worldview"].rows
#     implemented_notes = result_implemented[0][0]["notes"].tables["least_satisfied_worldview"].rows
#     assert direct_notes == implemented_notes, f"Notes differ: {direct_notes} != {implemented_notes}"

#     # Check overall notes (if applicable)
#     direct_overall_notes = result_direct[1].tables if hasattr(result_direct[1], 'tables') else {}
#     implemented_overall_notes = result_implemented[1].tables if hasattr(result_implemented[1], 'tables') else {}
#     assert direct_overall_notes == implemented_overall_notes, f"Overall notes differ: {direct_overall_notes} != {implemented_overall_notes}"


# # Example test execution
# if __name__ == "__main__":
#     test_allocate_by_maximin()
#     print("All maximin tests passed.")
