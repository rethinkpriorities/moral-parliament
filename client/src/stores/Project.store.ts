import { atom } from "jotai";
import { DEFAULT_PROJECTS } from "./Project.list";
import { getProjectsBySubset } from "./Projects.dict";

export const projectsAtom = atom<Project[]>(DEFAULT_PROJECTS);

export const includedProjectIdsAtom = atom<number[]>(
  getProjectsBySubset("Broad-Spectrum").map((p: Project) => p.id)
);
export const includedProjectsAtom = atom<Project[]>((get) => {
  const includedProjectIds = get(includedProjectIdsAtom);
  return get(projectsAtom).filter((p) => includedProjectIds.includes(p.id));
});
