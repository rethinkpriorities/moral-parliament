import { useParams } from "react-router-dom";
import { useAtomValue, useAtom } from "jotai";
import { ProjectListDisplay } from "./ProjectListDisplay.component";
import {
  projectsAtom,
  includedProjectIdsAtom,
} from "../../stores/Project.store";
import { walkthroughAtom } from "../../stores/Walkthrough.store";

export default () => {
  const projects = useAtomValue(projectsAtom);
  const [includedProjectIds, setIncludedProjectIds] = useAtom(
    includedProjectIdsAtom
  );
  const projectIdParam = useParams().projectId;
  const selectedProject = projectIdParam
    ? projects.find((project) => project.id === parseInt(projectIdParam, 10))
    : undefined;
  const [walkthrough, setWalkthrough] = useAtom(walkthroughAtom);
  const toggleWalkthroughProjects = (value: boolean) => {
    if (walkthrough) {
      setWalkthrough({ ...walkthrough, projects: value });
    }
  };

  return (
    <ProjectListDisplay
      toggleWalkthroughProjects={toggleWalkthroughProjects}
      projects={projects}
      setIncludedProjectIds={setIncludedProjectIds}
      selectedProject={selectedProject}
      includedProjectIds={includedProjectIds}
      showNext={walkthrough?.parliament}
    />
  );
};
