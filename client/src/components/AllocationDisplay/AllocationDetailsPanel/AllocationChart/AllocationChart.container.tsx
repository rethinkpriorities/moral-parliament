import { useAtomValue } from "jotai";

import { includedProjectsAtom } from "../../../../stores/Project.store";

import { AllocationChart } from "./AllocationChart.component";

export default (props: any) => {
  const selectedProjects = useAtomValue(includedProjectsAtom); // Use the atom value

  return <AllocationChart {...props} selectedProjects={selectedProjects} />; // Pass selectedProjects instead of projects
};
