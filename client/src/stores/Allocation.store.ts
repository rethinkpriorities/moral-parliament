import { parliamentAtom } from "./Parliament.store";
import { worldviewsAtom } from "./Worldview.store";
import { includedProjectsAtom } from "./Project.store";
import { atom } from "jotai";
import { evaluate } from "../utils/projectWorldviewEvaluator";

interface Eval {
  worldviewId: number;
  count: number;
  evaluations: { projectId: number; value: number }[];
}

type Evals = Eval[];

export const parliamentWithEvaluationsAtom = atom((get) => {
  const parliament = get(parliamentAtom);
  const worldviews = get(worldviewsAtom);
  const projects = get(includedProjectsAtom);
  const parliamentWithEvaluations = [] as Evals;
  worldviews.map((w: Worldview) => {
    const count = parliament.members.filter(
      (m: Parliamentarian) => m.worldviewId === w.id
    ).length;
    const evaluations = projects
      .map((p: Project) => ({
        projectId: p.id,
        value: evaluate(p, w),
      }))
      .sort((a, b) => a.projectId - b.projectId);
    parliamentWithEvaluations.push({
      worldviewId: w.id,
      count,
      evaluations,
    });
  });
  return parliamentWithEvaluations;
});

export const allocationOptionsAtom = atom({
  utilityDiscount: "sqrt",
  votingTiebreaker: "none",
  votingThreshold: 0.8,
  statusQuo: "merged",
});
