import React from "react";
import { useSetAtom } from "jotai";
import { queryParams } from "../utils/queryParameters";
import { parliamentAtom } from "../stores/Parliament.store";
import { projectsAtom, includedProjectIdsAtom } from "../stores/Project.store";
import { worldviewsAtom } from "../stores/Worldview.store";
import { getValuesFromSheet } from "../utils/getValuesFromSheet";

export const LoadHandler = () => {
  const setParliament = useSetAtom(parliamentAtom);
  const setProjects = useSetAtom(projectsAtom);
  const setIncludedProjectIds = useSetAtom(includedProjectIdsAtom);
  const setWorldviews = useSetAtom(worldviewsAtom);
  React.useEffect(() => {
    if (queryParams.load_from_sheet) {
      getValuesFromSheet(queryParams.load_from_sheet).then((results) => {
        setParliament(results.parliament);
        setProjects(results.projects);
        const includedProjects = results.projects
          .filter((p) => p.included)
          .map((p) => p.id);
        setIncludedProjectIds(includedProjects);
        setWorldviews(results.worldviews);
      });
    }
  }, []);
  return null;
};
