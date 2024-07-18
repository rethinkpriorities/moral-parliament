import { evaluate } from "./projectWorldviewEvaluator";

export const allocate = (
  parliament: Parliament,
  projects: Project[],
  worldviews: Worldview[]
) => {
  const allocation = {} as Record<number, number>;
  projects.map((p) => p.id).forEach((pId) => (allocation[pId] = 0));
  for (const worldview of worldviews) {
    const sortedProjects = projects.sort((a, b) =>
      evaluate(a, worldview) > evaluate(b, worldview) ? -1 : 1
    );
    const favoredId = sortedProjects[0]!.id;
    allocation[favoredId] =
      allocation[favoredId] +
      (parliament.members.filter((m) => m.worldviewId === worldview.id)
        .length *
        1.0) /
        parliament.members.length;
  }
  return allocation;
};
