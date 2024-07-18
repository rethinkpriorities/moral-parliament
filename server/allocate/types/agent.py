from typing import TypedDict

Agent = TypedDict(
    "Agent",
    {"coefficients": list[float], "u_star": float, "s_i": float, "num_agents": int, "worldview_id": int},
)
