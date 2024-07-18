from allocate.types.parliament import InputParliament, OutputAllocation
from typing import List


def convert_from_server_ids(conversion_dict, outcomes: List[OutputAllocation]):
    for allocation in outcomes:
        for allotment in allocation['values']:
            allotment["projectId"] = conversion_dict[allotment["server_project_id"]]


def supplement_with_server_ids(parliament):
    server_to_client_dict = dict({})
    client_to_server_dict = dict({})
    next_id = -1  # start at 0 after incrementing
    for party in parliament:
        for evaluation in party["evaluations"]:
            if evaluation["projectId"] not in server_to_client_dict.values():
                next_id = next_id + 1
                server_to_client_dict[next_id] = evaluation["projectId"]
                client_to_server_dict[evaluation["projectId"]] = next_id
            evaluation["server_project_id"] = client_to_server_dict[evaluation["projectId"]]
    return server_to_client_dict
