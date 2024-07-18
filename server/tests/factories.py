DEFAULT_VALUES = [
    [2, 3, 5],
    [6, 0, 2],
    [1, 3, 1],
    [1, 3, 1],
]
DEFAULT_COUNTS = [3, 1, 2, 1]


def build_parliament(values=DEFAULT_VALUES, counts=DEFAULT_COUNTS):
    return [build_party(values[i], counts[i]) for i in range(len(values))]


def build_party(values, num):
    party = {
        "evaluations": [
            {"server_project_id": idx, "value": v} for idx, v in enumerate(values)
        ],
        "count": num,
    }
    return party


def build_parliamentarian(values):
    parliamentarian = {
        "evaluations": [
            {"server_project_id": idx, "value": v} for idx, v in enumerate(values)
        ]
    }
    return parliamentarian


def build_output_allocation():
    return [
        dict({"funding": 1, "server_project_id": 0}),
        dict({"funding": 12, "server_project_id": 1}),
    ]
