import { useAtom, useAtomValue } from "jotai";

import { projectsAtom } from "../../../stores/Project.store";
import { worldviewsAtom } from "../../../stores/Worldview.store";
import { evaluate } from "../../../utils/projectWorldviewEvaluator";
import { walkthroughAtom } from "../../../stores/Walkthrough.store";

import { useParams } from "react-router-dom";

import { ProjectDetailsPanel } from "./ProjectDetailsPanel.component";

export default () => {
  const [projects, setProjects] = useAtom(projectsAtom);
  const projectIdParam = useParams().projectId;
  const selectedProject = projectIdParam
    ? projects.find((project) => project.id === parseInt(projectIdParam, 10))
    : undefined;
  const walkthrough = useAtomValue(walkthroughAtom);

  const updateProject = (newValues: Partial<Project>) => {
    const newProjects = projects.map((p) => {
      if (p.id === selectedProject?.id) {
        const returnVal = { ...p, ...newValues } as Project;
        return returnVal;
      } else {
        return p;
      }
    }) as Project[];
    setProjects(newProjects);
  };
  const worldviews = useAtomValue(worldviewsAtom);
  const worldviewRatings = worldviews.map((worldview) => {
    const allRatings = projects.map((p) =>
      evaluate(p, worldview, { ignoreStipulated: true })
    );
    const max = Math.max(...allRatings);
    const min = Math.min(...allRatings);
    const evaluation = selectedProject
      ? evaluate(selectedProject, worldview, {
          ignoreStipulated: true,
        })
      : 0;
    const relativeRating = (evaluation - min) / (max - min);
    const allRelativeRatings = allRatings.map(
      (ev: number) => (ev - min) / (max - min)
    );
    const rank = allRatings
      .sort((a, b) => (a < b ? 1 : -1))
      .indexOf(evaluation);
    return [worldview.name, rank, relativeRating, allRelativeRatings] as [
      string,
      number,
      number,
      number[],
    ];
  });
  return (
    <ProjectDetailsPanel
      selectedProject={selectedProject}
      updateProject={updateProject}
      worldviewRatings={worldviewRatings}
      showNext={!!walkthrough?.projects}
    />
  );
};
