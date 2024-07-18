import { ListWithForm } from "../ListWithForm";
import projectSelectionPng from "./project_selection.png";

import { ProjectDetailsPanel } from "./ProjectDetailsPanel";

interface ProjectListDisplayProps {
  projects: Project[];
  selectedProject: Project | undefined;
  includedProjectIds: number[];
  toggleWalkthroughProjects: (arg0: boolean) => void;
  setIncludedProjectIds: (arg0: number[]) => void;
}

export const ProjectListDisplay = ({
  projects,
  toggleWalkthroughProjects,
  includedProjectIds,
  selectedProject,
  setIncludedProjectIds,
}: ProjectListDisplayProps) => {
  const toggleProjectIdInclusion = (id: number) => {
    toggleWalkthroughProjects(
      !(includedProjectIds.includes(id) && includedProjectIds.length === 1)
    );
    if (includedProjectIds.includes(id)) {
      setIncludedProjectIds(includedProjectIds.filter((iid) => iid !== id));
    } else if (includedProjectIds.length < 10) {
      setIncludedProjectIds([...includedProjectIds, id]);
    }
  };
  return (
    <ListWithForm
      title="Projects"
      description={<>Projects are <strong>fictional</strong> ventures attempting to improve the world in some way. Parliaments will seek consensus on how to divide funding into projects.</>}
      items={projects
        .sort((a, b) => a.id - b.id)
        .map((p) => ({
          selected: p.id === selectedProject?.id,
          disabled:
            !includedProjectIds.includes(p.id) &&
            includedProjectIds.length >= 10,
          onClick: () => {},
          text: p.name,
          href: `/projects/${p.id}`,
          checkboxValue: includedProjectIds.includes(p.id),
          onCheckboxClick: () => toggleProjectIdInclusion(p.id),
        }))}
      onClick={() => {}}
      panel={<ProjectDetailsPanel />}
      href="/projects"
      hrefLink="Usage Overview."
    />
  );
};
