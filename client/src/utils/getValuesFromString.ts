import Papa from "papaparse";

import { DEFAULT_PROJECT } from "../stores/Project.list";
import { DEFAULT_WORLDVIEW } from "../stores/Worldview.list";

const getRowsBetween = (
  rows: [string, string][],
  start: string,
  end: string
) => {
  const rowsToReturn = [];
  const tempRows = [...rows];
  let moving = false;

  while (tempRows.length > 0) {
    const nextRow = tempRows.shift();

    if (moving && nextRow) {
      if (nextRow[0] === end) {
        break;
      } else {
        rowsToReturn.push(nextRow);
      }
    }

    if (nextRow && nextRow[0] === start) {
      moving = true;
    }
  }

  return rowsToReturn;
};

const getGroupsFromRows = (rows: [string, string][]) => {
  const spaceSeparatedValues = [];
  const tempRows = [...rows];
  let nextGroup = [];

  while (tempRows.length > 0) {
    const nextRow = tempRows.shift();

    if (nextRow?.every((cell) => !cell)) {
      if (nextGroup.length !== 0) {
        spaceSeparatedValues.push(nextGroup);
        nextGroup = [];
      }
    } else if (nextRow) {
      nextGroup.push(nextRow);
    }
  }

  if (nextGroup.length !== 0) {
    spaceSeparatedValues.push(nextGroup);
    nextGroup = [];
  }

  return spaceSeparatedValues;
};

const numberIfNumber = (v: any): any => {
  if (typeof v === "string" && v.match(/[\d|\.]*$/)) {
    const num = parseFloat(v);
    return isNaN(num) ? v : num;
  } else {
    return v;
  }
};

const booleanIfBoolean = (v: any): any => {
  return ["true", "TRUE"].includes(v)
    ? true
    : ["false", "FALSE"].includes(v)
      ? false
      : v;
};

const arrayIfArray = (v: any): any => {
  if (typeof v === "string" && v[0] === "[") {
    return JSON.parse(v);
  } else {
    return v;
  }
};

const getObjectsFromGroups = (
  groups: [string, string][][],
  defaultObject: Project | Worldview
) => {
  return groups.map((g) =>
    g.reduce(
      (accum, row) => {
        if (row[1] !== "") {
          const key = row[0] as keyof Project | keyof Worldview;
          /* @ts-expect-error */
          accum[key] = arrayIfArray(numberIfNumber(booleanIfBoolean(row[1])));
        }
        return accum;
      },
      { ...defaultObject } as Project | Worldview
    )
  );
};

const buildParliamentFromRows = (rows: [string, string][]): Parliament => {
  const parliament = { members: [] } as Parliament;

  for (let i = 0; i < rows.length; i++) {
    const worldviewId = parseInt(rows[i][0], 10);
    const count = parseInt(rows[i][1]);

    if (!Number.isInteger(worldviewId)) {
      continue;
    }

    for (let j = 0; j < count; j++) {
      parliament.members.push({
        worldviewId: worldviewId,
        id: parliament.members.length + 1,
      });
    }
  }

  return parliament;
};

export const getValuesFromString = (csv: string, divider: string) => {
  let parliament, worldviews, projects;
  if (!csv.includes("<<<projects")) {
    throw Error("CSV lacks project section.");
  }
  if (!csv.includes("<<<worldviews")) {
    throw Error("CSV lacks worldviews section.");
  }
  if (!csv.includes("<<<parliament")) {
    throw Error("CSV lacks parliament section.");
  }
  const rows = Papa.parse(csv, { delimiter: divider }).data || [];
  if (rows.length === 0) {
    throw Error("No rows found in CSV.");
  }
  try {
    const projectRows = getRowsBetween(rows, "<<<projects", ">>>");
    projects = getObjectsFromGroups(
      getGroupsFromRows(projectRows),
      DEFAULT_PROJECT
    ) as Project[];
  } catch (e) {
    throw Error("Project formatting not recognized.");
  }
  try {
    const worldviewRows = getRowsBetween(rows, "<<<worldviews", ">>>");
    worldviews = getObjectsFromGroups(
      getGroupsFromRows(worldviewRows),
      DEFAULT_WORLDVIEW
    ) as Worldview[];
  } catch (e) {
    throw Error("Worldview formatting not recognized.");
  }
  try {
    const parliamentRows = getRowsBetween(rows, "<<<parliament", ">>>");
    parliament = buildParliamentFromRows(parliamentRows);
  } catch (e) {
    throw Error("Parliament formatting not recognized.");
  }
  return { projects, worldviews, parliament };
};
