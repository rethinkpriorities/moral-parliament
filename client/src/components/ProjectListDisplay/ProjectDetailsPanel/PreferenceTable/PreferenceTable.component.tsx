import { Progress, Bar } from "./PreferenceTable.styles";

const ordinize = (number: number): string => {
  if (number === 1) {
    return "1st";
  } else if (number === 2) {
    return "2nd";
  } else if (number === 3) {
    return "3rd";
  } else {
    return number.toString() + "th";
  }
};

export const PreferenceTable = ({
  project,
  worldviewRatings,
}: {
  project: Project;
  worldviewRatings: [string, number, number, number[]][];
}) => {
  return (
    <>
      <p>
        Each worldview rates projects on its own scale and comparisons of
        ratings across worldviews may not be meaningful. However, we can get
        some sense of the feelings of each worldview for a project by charting
        its value against the ratings of other projects.
      </p>
      <p>
        The following chart depicts the ranking and absolute position of{" "}
        {project.name} on a scale from best (right) to worst (left) of all defined projects for
        each worldview. The thick red lines indicate its position. The thin grey
        lines indicate the positions of other projects.
      </p>
      <table style={{ width: "100%" }}>
        <tbody>
          {worldviewRatings.map((r) => (
            <tr key={JSON.stringify(r)}>
              <td>{r[0]}</td>
              <td>{ordinize(r[1] + 1)}</td>
              <td>
                <Progress>
                  {r[3].map((oR: number, idx: number) => (
                    <Bar
                      key={`${oR}-${idx}`}
                      $subdued
                      $value={Math.round(oR * 99) + 1.75}
                    ></Bar>
                  ))}
                  <Bar
                    $subdued={false}
                    $value={Math.round(r[2] * 98) + 0.75}
                  ></Bar>
                </Progress>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
