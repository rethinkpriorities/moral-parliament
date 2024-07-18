import { useAtomValue, useAtom } from "jotai";
import { ProjectCheckboxList } from "./ProjectCheckboxList.component";
import { walkthroughAtom } from "../../../../stores/Walkthrough.store";
import {
  projectsAtom,
  includedProjectIdsAtom,
} from "../../../../stores/Project.store";

export default () => {
  const projects = useAtomValue(projectsAtom);
  const [includedProjectIds, setIncludedProjectIds] = useAtom(
    includedProjectIdsAtom
  );
  const [walkthrough, setWalkthrough] = useAtom(walkthroughAtom);
  const toggleWalkthroughProjects = (value: boolean) => {
    if (walkthrough) {
      setWalkthrough({ ...walkthrough, projects: value });
    }
  };

  return (
    <ProjectCheckboxList
      projects={projects}
      includedProjectIds={includedProjectIds}
      toggleIncludedProjectId={(id: number) => {
        toggleWalkthroughProjects(
          !(includedProjectIds.includes(id) && includedProjectIds.length === 1)
        );
        includedProjectIds.includes(id)
          ? setIncludedProjectIds(includedProjectIds.filter((i) => i !== id))
          : setIncludedProjectIds([...includedProjectIds, id]);
      }}
    />
  );
};
