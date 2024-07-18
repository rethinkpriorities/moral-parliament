from allocate.bargaining.nash_bargaining import solve_for_nash_bargain, remove_rejectors
from .factories import build_parliament
import numpy as np


def test_remove_rejectors():
    allocations = np.array([[3, 3, 1], [2, 4, 1], [2, 2, 3]])
    evaluations = np.array([[1, 2], [2, 0], [-1, 3]])
    result_allocations, result_evaluations = remove_rejectors(allocations, evaluations)
    assert np.array_equal(result_allocations, np.array([[3, 3, 1], [2, 4, 1]]))
    assert np.array_equal(result_evaluations, np.array([[1, 2], [2, 0]]))


def test_solve_for_nash_bargain():
    parliament = build_parliament()
    status_quo = [1, 2, 9]
    result = solve_for_nash_bargain(parliament, status_quo, "sqrt")
    assert len(result[0]) == 3
