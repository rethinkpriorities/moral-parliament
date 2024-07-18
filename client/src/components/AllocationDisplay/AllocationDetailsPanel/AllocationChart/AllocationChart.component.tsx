import * as Plot from "@observablehq/plot";

import { ObservablePlot } from "../../../ObservablePlot";

import { ChartContainer } from "./AllocationChart.styles";

export const AllocationChart = ({
  selectedProjects, // Use selectedProjects instead of projects
  fundingValues,
  height = 500,
  width = 1000,
  thumbnail,
  colorScheme,
}: {
  fundingValues: Allotment[];
  selectedProjects: Project[]; // Use selectedProjects instead of projects
  height?: number;
  thumbnail?: boolean;
  width?: number;
  colorScheme?: string;
}) => {
  if (!fundingValues || !selectedProjects) return null; // Add a check for selectedProjects
  const projectsAllocations = selectedProjects // Use selectedProjects instead of projects
    .map((p) => ({
      name: p.name,
      funding: fundingValues.find((a) => a.projectId === p.id)?.funding || 0,
      id: p.id,
    }))
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  const options: Plot.PlotOptions = {
    x: { label: null },
    height: height,
    width: width,
    marginBottom: height >= 500 ? 100 : 0,
    marginRight: width >= 1000 ? 200 : 0,
    y: { label: null, domain: [0, 100] },
    color: { legend: true },
    marks: [
      Plot.barY(projectsAllocations, {
        x: (v) => v.name,
        y: "funding",
        fill:
          colorScheme === "contrast"
            ? "var(--rp-blue)"
            : "var(--rp-light-blue)",
        inset: 0.5,
      }),
    ],
  };
  if (height >= 500) {
    options?.marks?.push(
      Plot.axisX({
        color: (v) => {
          return projectsAllocations?.find((pA) => pA.name == v)?.funding! > 0
            ? "black"
            : "grey";
        },
        tickRotate: 10,
        fontSize: "1.5em",
      })
    );
  } else {
    options?.marks?.push(Plot.axisY({ ticks: [] }));
  }
  return (
    <>
      <ChartContainer $thumbnail={thumbnail}>
        <ObservablePlot options={options} />
      </ChartContainer>
    </>
  );
};
