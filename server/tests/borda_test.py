from allocate.voting.borda_voting import allocate_by_borda_voting

def build_parliament(values, counts):
    parliament = []
    for i, (value_list, count) in enumerate(zip(values, counts)):
        evaluations = [{"server_project_id": j, "value": value} for j, value in enumerate(value_list)]
        parliament.append({"worldviewId": i, "evaluations": evaluations, "count": count})
    return parliament

def test_allocate_by_borda_voting():
    # Define the projects and worldviews
    projects = ["Tuberculosis Initiative", "Direct Transfers Everywhere", "AirScrubbers International", "People for the Just Treatment of Humans"]
    values = [[3, 2, 1, 0], [3, 1, 2, 0], [0, 1, 2, 3]]  # 3 worldviews with different preferences/coeffs for the projects (0 is the least preferred, 3 is the most preferred)
    counts = [64, 32, 4]
    parliament = build_parliament(values, counts)

    # Call the function
    result, _ = allocate_by_borda_voting(parliament)

    # Extract the Borda scores from the notes
    borda_scores = {
        int(row[0].split(":")[1]): row[1]
        for row in result[0]["notes"].table("borda_scores").rows
    }

    # Define the expected results (see by hand calculation below)
    expected_results = {
        0: 2.76,
        1: 0.28,
        2: -0.28,
        3: -2.76
    }

    # Check that the results match the expected results
    for project_id, expected_score in expected_results.items():
        actual_score = borda_scores[project_id]
        assert round(actual_score, 2) == expected_score, f"For project {projects[project_id]}, expected {expected_score} but got {actual_score}"

# Run the test
test_allocate_by_borda_voting()

# By hand calculation:

# Tuberculosis Initiative  (3-0)*0.64 + (3-0)*0.32 + (0-3)*0.04 = 2.76

# Direct Transfers Everywhere (2-1)* 0.64 + (1-2)* 0.32 + (1-2)*0.04 = 0.28

# AirScrubbers International (1-2)* 0.64 + (2-1)*0.32  + (2-1)*0.04 = -0.28

# People for the Just Treatment of Humans (0-3)* 0.64 + (0-3)* 0.32 + (3-0)*0.04 = -2.76

# Parliament I used:
# https://docs.google.com/spreadsheets/d/1tRcMgt0Vg-0_6vnEU1xNVB7Wx-0QbwMUJo4wynduYio/edit#gid=0