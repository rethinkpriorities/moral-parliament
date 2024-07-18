import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSetAtom, useAtom } from "jotai";

import { parliamentAtom } from "../../stores/Parliament.store";
import {
  projectsAtom,
  includedProjectIdsAtom,
} from "../../stores/Project.store";
import { worldviewsAtom } from "../../stores/Worldview.store";
import { walkthroughAtom } from "../../stores/Walkthrough.store";
import { getValuesFromSheet } from "../../utils/getValuesFromSheet";
import { getValuesFromString } from "../../utils/getValuesFromString";
import { HOST } from "../../utils/host";
import { storeValuesAsString } from "../../utils/storeValuesAsString";

import { SaveAndLoadDisplay } from "./SaveAndLoadDisplay.component";

const sanitizedContent = (content: string): string =>
  content.replace(/[<>&\n]/g, (match: string): string => {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\n":
        return "<br />";
      default:
        return match;
    }
  });

export default () => {
  const [parliament, setParliament] = useAtom(parliamentAtom);
  const [projects, setProjects] = useAtom(projectsAtom);
  const [includedProjectIds, setIncludedProjectIds] = useAtom(
    includedProjectIdsAtom
  );
  const [worldviews, setWorldviews] = useAtom(worldviewsAtom);
  const setWalkthrough = useSetAtom(walkthroughAtom);
  const [sheetId, setSheetId] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  let [_searchParams, setSearchParams] = useSearchParams();

  const projectsWithInclusion = projects.map((p) => ({
    ...p,
    included: includedProjectIds.includes(p.id),
  }));
  const openAsWindow = (name: string) => {
    const str = storeValuesAsString({
      name,
      projects: projectsWithInclusion,
      worldviews,
      parliament,
    });
    const w = window.open()!;
    w.document.write(`<div>${sanitizedContent(str)}</div>`);
  };
  const save = (name: string) => {
    setIsSaving(true);
    setSheetId(null);
    const str = storeValuesAsString({
      name,
      projects: projectsWithInclusion,
      worldviews,
      parliament,
    });
    fetch(`${HOST}/save_as_sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(str),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error while saving");
        }
      })
      .then((data) => {
        alert("Saved successfully! (see the generated sheet under the 'Save' button)");
        setIsSaving(false);
        setSearchParams({ load_from_sheet: data.sheetId });
        setSheetId(data.sheetId);
      })
      .catch((error) => {
        setIsSaving(false);
        alert(`${error}`);
      });
  };

  const loadSheet = (sheetId: string) => {
    setWalkthrough(null);
    getValuesFromSheet(
      sheetId || "1g_oUW-t3oyukPic7BrLcPYIKGMQN-G-1oisQH4VeNtk"
    ).then((results) => {
      setParliament(results.parliament);
      setProjects(results.projects);
      setIncludedProjectIds(
        results.projects.filter((p) => p.included).map((p) => p.id)
      );
      setWorldviews(results.worldviews);
      alert("Loaded data successfully!");
    });
  };

  const loadFile = (file: Blob) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        try {
          const results = getValuesFromString(event.target.result, "|");
          setParliament(results.parliament);
          setProjects(
            results.projects.map((p: Project) => ({
              ...p,
              included: undefined,
            }))
          );
          setIncludedProjectIds(
            results.projects.filter((p) => p.included).map((p) => p.id)
          );
          setWorldviews(results.worldviews);
          alert("Loaded data successfully!");
        } catch (e) {
          alert(`${e}`);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <SaveAndLoadDisplay
      openAsWindow={openAsWindow}
      isSaving={isSaving}
      saveSheet={save}
      loadSheet={loadSheet}
      sheetId={sheetId}
      loadFile={loadFile}
    />
  );
};
