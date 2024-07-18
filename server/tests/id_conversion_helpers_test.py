from allocate.id_conversion_helpers import (
    supplement_with_server_ids,
    convert_from_server_ids,
)

from .factories import build_parliament, build_output_allocation


def test_supplement_with_server_ids():
    parliament = [
        {
            "evaluations": [
                dict({"projectId": 12, "value": 6}),
                dict({"projectId": 5, "value": 4}),
            ],
            "count": 3,
        },
        {
            "evaluations": [
                dict({"projectId": 12, "value": 2}),
                dict({"projectId": 5, "value": 1}),
            ],
            "count": 1,
        },
    ]
    conversion_dict = supplement_with_server_ids(parliament)
    assert parliament[0]["evaluations"][0]["server_project_id"] == 0
    assert parliament[0]["evaluations"][1]["server_project_id"] == 1
    assert conversion_dict[0] == 12
    assert conversion_dict[1] == 5


def test_convert_from_server_ids():
    output_allocation = build_output_allocation()
    conversion_dict = dict({0: 12, 1: 5})
    convert_from_server_ids(conversion_dict, [{"values": output_allocation}])
    assert output_allocation[0]["projectId"] == 12
    assert output_allocation[1]["projectId"] == 5
