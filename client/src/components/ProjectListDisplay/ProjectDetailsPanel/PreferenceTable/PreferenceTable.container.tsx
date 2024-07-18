import { PreferenceTable } from "./PreferenceTable.component";
import { useAtomValue } from "jotai";
import { projectsAtom } from "../../../../stores/Project.store";
import { worldviewsAtom } from "../../../../stores/Worldview.store";
import { evaluate } from "../../../../utils/projectWorldviewEvaluator";

export default ({ project }: { project: Project }) => {
  const projects = useAtomValue(projectsAtom);
  const worldviews = useAtomValue(worldviewsAtom);
  const worldviewRatings = worldviews.map((worldview) => {
    const allRatings = projects.map((p) =>
      evaluate(p, worldview, { ignoreStipulated: true })
    );
    const max = Math.max(...allRatings);
    const min = Math.min(...allRatings);
    const evaluation = evaluate(project, worldview, { ignoreStipulated: true });
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
    <PreferenceTable project={project} worldviewRatings={worldviewRatings} />
  );
};
