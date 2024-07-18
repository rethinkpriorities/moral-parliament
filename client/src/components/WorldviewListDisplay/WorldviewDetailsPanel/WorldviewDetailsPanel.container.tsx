import { useAtomValue, useAtom } from "jotai";
import { useParams } from "react-router-dom";

import { includedProjectsAtom } from "../../../stores/Project.store";
import { worldviewsAtom } from "../../../stores/Worldview.store";
import { walkthroughAtom } from "../../../stores/Walkthrough.store";
import { evaluate } from "../../../utils/projectWorldviewEvaluator";

import { WorldviewDetailsPanel } from "./WorldviewDetailsPanel.component";

export default function WorldviewContainer() {
  const [worldviews, setWorldviews] = useAtom(worldviewsAtom);
  const selectedWorldviewId = useParams().worldviewId as string;
  const selectedWorldview = worldviews.find(
    (w) => w.id === parseInt(selectedWorldviewId)
  );
  const walkthrough = useAtomValue(walkthroughAtom);

  const updateWorldview = (newValues: Partial<Worldview>) => {
    const newWorldviews = worldviews.map((w) => {
      if (w.id === selectedWorldview?.id) {
        const returnVal = { ...w, ...newValues } as Worldview;
        return returnVal;
      } else {
        return w;
      }
    }) as Worldview[];
    setWorldviews(newWorldviews);
  };

  const includedProjects = useAtomValue(includedProjectsAtom); // Use the atom value
  const sortedProjects = selectedWorldview
    ? [...includedProjects].sort(
        (
          a,
          b // Use selectedProjects instead of projects
        ) =>
          evaluate(a, selectedWorldview) > evaluate(b, selectedWorldview)
            ? -1
            : 1
      )
    : includedProjects; // Use includedProjects instead of projects
  return (
    <WorldviewDetailsPanel
      selectedWorldview={selectedWorldview}
      updateWorldview={updateWorldview}
      sortedProjects={sortedProjects}
      showNext={!!walkthrough?.worldviews}
    />
  );
}
