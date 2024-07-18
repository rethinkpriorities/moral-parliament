import { DEFAULT_PROJECTS } from "./Project.list";

export const PROJECTS_DICT = DEFAULT_PROJECTS.reduce((dict, project) => {
  dict[project.id] = project;
  return dict;
}, {});

export const PROJECT_SUBSETS = {
  Animals: [
    "Lawyers for Chickens",
    "Shrimp Welfare International",
    "Happier Animals Now",
    "College Kindness Initiative",
    "Passionate about Pests",
    "Warm Thoughts for Wild Animals",
  ],
  GHD: [
    "Direct Transfers Everywhere",
    "People for the Just Treatment of Humans",
    "Tuberculosis Initiative",
    "AirScrubbers International",
    "Better Bangladesh",
    "Sayonara Syphilis",
  ],
  GCR: [
    "The Cassandra Fund",
    "The Hedonium Project",
    "Pandemics No More",
    "Soothsayers R Us",
    "Svalbard Global Book Vault",
    "Don’t F𝔸𝕀L",
  ],
  "Broad-Spectrum": [
    "Lawyers for Chickens",
    "Happier Animals Now",
    "Direct Transfers Everywhere",
    "People for the Just Treatment of Humans",
    "Tuberculosis Initiative",
    "AirScrubbers International",
    "Pandemics No More",
    "Svalbard Global Book Vault",
    "Artists without Borders",
  ],
};

export const getProjectsBySubset = (subsetName: string) => {
  const projectNames = PROJECT_SUBSETS[subsetName] as string[];
  return projectNames.map(
    (name: string) =>
      PROJECTS_DICT[
        Object.keys(PROJECTS_DICT).find(
          (key) => PROJECTS_DICT[key].name === name
        )
      ]
  );
};

export const getSubsetByProjectIds = (projectIdList: number[]) => {
  const subsetNames = Object.keys(PROJECT_SUBSETS);
  for (const name of subsetNames) {
    const subsetIds = getProjectsBySubset(name).map((p) => p.id);
    if (
      subsetIds.every((pid) => projectIdList.includes(pid)) &&
      projectIdList.every((pid) => subsetIds.includes(pid))
    ) {
      return name;
    }
  }
  return null;
};
