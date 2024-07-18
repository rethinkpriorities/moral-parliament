import { DL, DT, DD, Table, THead, TH, TR, TD } from "./NotesDisplay.styles";

const drawTable = (table: NoteTable, replaceIds: (s: string) => string) => {
  if (table.rows.length === 1 && table.headings.length === 1)
    return (
      <DL key={table.headings.join()}>
        <DT>{table.headings[0]}:</DT>
        <DD>{replaceIds(table.rows[0][0])}</DD>
      </DL>
    );
  return (
    <Table key={table.headings.join()}>
      <THead>
        <TR>
          {table.headings.map((h) => (
            <TH key={h}>{h}</TH>
          ))}
        </TR>
      </THead>
      <tbody>
        {table.rows.map((d) => (
          <TR key={d.join()}>
            {d.map((di) => (
              <TD key={di}>{replaceIds(di)}</TD>
            ))}
          </TR>
        ))}
      </tbody>
    </Table>
  );
};
export const NotesDisplay = ({
  notes,
  worldviews,
  projects,
}: {
  notes: Note;
  worldviews: Worldview[];
  projects: Project[];
}) => {
  if (!notes) return null;
  const replaceIds = (str: string) => {
    for (const w of worldviews) {
      if (str?.replace) {
        str = str?.replace(new RegExp(`worldviewId:${w.id}(?!\\d)`), w.name);
      }
    }
    for (const p of projects) {
      if (str?.replace) {
        str = str?.replace(new RegExp(`projectId:${p.id}(?!\\d)`), p.name);
      }
    }
    return str;
  };

  return (
    <div>
      {Object.values(notes.tables).map((table) => drawTable(table, replaceIds))}
    </div>
  );
};
