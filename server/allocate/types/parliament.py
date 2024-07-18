from typing import List, TypedDict
from allocate.note_builder import NoteBuilder


class ProjectEvaluation(TypedDict):
    server_project_id: int
    value: float


class Parliamentarian(TypedDict):
    evaluations: List[ProjectEvaluation]


class WorldviewEvaluation(TypedDict):
    worldviewId: int
    count: int
    evaluations: List[ProjectEvaluation]
    s_i: int


InputParliament = List[WorldviewEvaluation]


class FundingAllotment(TypedDict):
    server_project_id: int
    funding: int


Allocation = List[FundingAllotment]


class Outcome(TypedDict):
    notes: NoteBuilder
    values: List[FundingAllotment]


OutputOutcome = List[Outcome]
OutputAllocation = List[FundingAllotment]
