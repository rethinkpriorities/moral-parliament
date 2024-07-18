# Assume 'parliament' has structure [{ 'evaluations': [{ server_project_id: 2, value: 0.5 }, ...] }...]
# Or something else?
from .a6allocationmethods import (
    allocate_by_top,
    allocate_by_social_utility,
    allocate_by_borda_voting,
    allocate_by_maximin,
    allocate_by_social_welfare,
    allocate_by_favourite_theory,
    allocate_by_ranked_choice_voting,
    allocate_by_nash_bargaining,
    allocate_by_merged_favorites,
)
