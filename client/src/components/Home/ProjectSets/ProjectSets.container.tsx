import { useAtom } from "jotai";

import {
  getProjectsBySubset,
  getSubsetByProjectIds,
} from "../../../stores/Projects.dict";

import { ProjectSets } from "./ProjectSets.component";
import { includedProjectIdsAtom } from "../../../stores/Project.store";

export const ProjectSetsContainer = () => {
  const [includedProjectIds, setIncludedProjectIds] = useAtom(
    includedProjectIdsAtom
  );

  const handleSubsetSelect = (subsetName: string | null) => {
    if (!subsetName) {
      setIncludedProjectIds([]);
    } else {
      const projects = getProjectsBySubset(subsetName);
      setIncludedProjectIds(projects.map((p) => p.id));
    }
  };

  const selectedProjectGroupName = getSubsetByProjectIds(includedProjectIds);

  return (
    <ProjectSets
      selectedProjectGroupName={selectedProjectGroupName}
      onSubsetSelect={handleSubsetSelect}
    />
  );
};

export default ProjectSetsContainer;
