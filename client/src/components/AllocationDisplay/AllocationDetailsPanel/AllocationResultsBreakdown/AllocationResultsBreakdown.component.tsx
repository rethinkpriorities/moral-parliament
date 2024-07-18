import React from "react";

import { AllocationChart } from "../AllocationChart";
import { Spinner } from "../../../Spinner";
import { NotesDisplay } from "./NotesDisplay";

import {
  Table,
  ChartGrid,
  GridContainer,
} from "./AllocationResultsBreakdown.styles";

export const AllocationResultsBreakdown = ({
  projects,
  overallNotes,
  consensusAllocations,
}: {
  consensusAllocations: Allocation[];
  overallNotes: Note;
  projects: Project[];
}) => {
  const [selectedChartIdx, setSelectedChartIdx] = React.useState(0);
  if (!consensusAllocations) return <Spinner />;
  if (!consensusAllocations[0]) return <div>No outcomes found</div>;
  if (!consensusAllocations[selectedChartIdx]?.values) setSelectedChartIdx(0);
  return (
    <>
      {consensusAllocations.length > 1 && (
        <>
          <br />
          <strong>Tied Allocations:</strong>
          <span> {consensusAllocations.length}</span>
          <GridContainer>
            <ChartGrid>
              {consensusAllocations.map((v, i) => (
                <div
                  onClick={() => setSelectedChartIdx(i)}
                  key={JSON.stringify(v)}
                  style={{
                    outline:
                      selectedChartIdx == i ? "3px solid var(--red)" : "",
                    cursor: "pointer",
                  }}
                >
                  <AllocationChart
                    fundingValues={v.values}
                    thumbnail={true}
                    colorScheme="contrast"
                    height={40}
                    width={66}
                  />
                </div>
              ))}
            </ChartGrid>
          </GridContainer>
        </>
      )}
      <NotesDisplay notes={overallNotes} />
      {(Object.keys(overallNotes.tables).some(Boolean) ||
        consensusAllocations.length > 1) && (
        <>
          <br />
          <br />
          <hr style={{ width: "50%" }} />
          <br />
          <br />
        </>
      )}
      <AllocationChart
        fundingValues={consensusAllocations[selectedChartIdx]?.values}
        />
      <br />
        <Table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Funding</th>
            </tr>
          </thead>
          <tbody>
            {projects
              .sort((a, b) => (a.id < b.id ? -1 : 1))
              .map((p: Project) => {
                return (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>
                      {consensusAllocations[selectedChartIdx]?.values?.find(
                        (a) => a.projectId === p.id
                      )?.funding || 0}
                      %
                    </td>
                  </tr>
                );
              })}
          </tbody>
      <NotesDisplay notes={consensusAllocations[selectedChartIdx]?.notes} />
        </Table>
    </>
  );
};
