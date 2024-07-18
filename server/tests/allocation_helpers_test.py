from allocate.allocation_helpers import (
    get_all_allocations,
    get_evaluations_for_allocations,
)
from .factories import build_parliament
import numpy as np


def test_get_all_allocations():
    results = get_all_allocations(5, 5, 5)
    assert len(results) == 5
    assert [0, 0, 0, 5, 0] in results
    assert [0, 0, 0, 0, 0] not in results
    results = get_all_allocations(5, 1, 2)
    assert len(results) == 6
    results = get_all_allocations(8, 1, 2)
    assert [0, 8] in results
    assert [4, 4] in results
    assert len(results) == 9


def test_get_evaluations_for_allocations():
    parliament = build_parliament([[1, 1, 1], [2, 2, 2]], [1, 2])
    results = get_evaluations_for_allocations(
        parliament, [[1, 0, 3], [0, 1, 0]], "none"
    )
    assert results[0][0] == 4  # sum 1,1,1 * 1,0,3
    assert results[0][1] == 8  # sum 2,2,2 * 1,0,3
    assert results[1][0] == 1
    assert results[1][1] == 2
