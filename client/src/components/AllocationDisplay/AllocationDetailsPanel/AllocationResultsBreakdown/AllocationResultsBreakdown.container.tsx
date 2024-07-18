import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";

import { includedProjectsAtom } from "../../../../stores/Project.store"; // Import selectedProjectSubsetAtom
import {
  parliamentWithEvaluationsAtom,
  allocationOptionsAtom,
} from "../../../../stores/Allocation.store";
import { parliamentAtom } from "../../../../stores/Parliament.store";
import { includedProjectIdsAtom } from "../../../../stores/Project.store";
import { HOST } from "../../../../utils/host";

import { AllocationResultsBreakdown } from "./AllocationResultsBreakdown.component";

export default () => {
  const options = useAtomValue(allocationOptionsAtom);
  const allocationStrategy = useParams().allocationStrategy;
  const selectedProjects = useAtomValue(includedProjectsAtom); // Use selectedProjectSubsetAtom instead of projectsAtom
  const parliament = useAtomValue(parliamentAtom);
  const includedProjectIds = useAtomValue(includedProjectIdsAtom);
  if (parliament.members.length < 1)
    return <div>No results -- no parliament members</div>;
  if (includedProjectIds.length < 1)
    return <div>No results -- no projects</div>;
  const { data: consensusAllocations } = useQuery({
    queryKey: [
      "allocations",
      useAtomValue(parliamentWithEvaluationsAtom),
      allocationStrategy,
      options,
    ],
    queryFn: async ({
      queryKey: [, parliamentWithEvals, method, methodOptions], // Destructure selectedProjectIds from the query key
    }) => {
      const res = await fetch(`${HOST}/allocate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parliament: parliamentWithEvals,
          method: method,
          options: methodOptions,
        }),
      });
      return res.json();
    },
  });
  return (
    <AllocationResultsBreakdown
      projects={selectedProjects} // Pass selectedProjects instead of projects
      consensusAllocations={consensusAllocations?.outcomes}
      overallNotes={consensusAllocations?.notes}
    />
  );
};
