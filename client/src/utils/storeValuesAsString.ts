const removeNewlines = (str: string | number): string | number => {
  if (typeof str === "string") {
    let newStr = str.replace(/\n/g, "");
    newStr = str.replace(/\s\s*/g, " ");
    return newStr;
  } else {
    return str;
  }
};

const objectToString = (obj: object) => {
  return Object.keys(obj).reduce(
    (acc, key: string) =>
      acc + `${key}|${removeNewlines(obj[key] as string | number)}\n`,
    ""
  );
};

export const storeValuesAsString = ({
  name,
  projects,
  worldviews,
  parliament,
}: {
  name: string;
  projects: Project[];
  worldviews: Worldview[];
  parliament: Parliament;
}) => {
  let str = `name|${name}\n`;
  str += "<<<projects|\n";
  for (const project of projects) {
    str += objectToString({
      ...project,
      stipulatedValues: [],
    });
    if (project !== projects[projects.length - 1]) {
      str += "|\n";
    }
  }
  str += ">>>|\n";
  str += "<<<worldviews|\n";
  for (const worldview of worldviews) {
    str += objectToString({
      ...worldview,
      stipulatedValues: JSON.stringify(worldview.stipulatedValues),
    });
    if (worldview !== worldviews[worldviews.length - 1]) {
      str += "|\n";
    }
  }
  str += ">>>|\n";
  str += "<<<parliament|\n";
  for (const worldview of worldviews) {
    str += `${worldview.id}|${parliament.members.filter((p) => p.worldviewId === worldview.id).length}\n`;
  }
  str += ">>>|\n";
  return str;
};
