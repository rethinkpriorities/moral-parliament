import { SelectableCircle } from "../SelectableCircle";
import { Row } from "../../styles/containers";

interface ParliamentGraphicProps {
  parliament: Parliament;
  worldviews: Worldview[];
}
export const ParliamentGraphic = ({
  parliament,
  worldviews,
}: ParliamentGraphicProps) => {
  const rowCount = Math.min((parliament.members.length + 5) / 8, 4);
  const breakIdx = [];
  const rows: Parliamentarian[][] = [[], [], [], [], [], []].slice(0, rowCount);
  for (let j = 0; j <= rowCount; j++) {
    breakIdx.push(
      Math.max((parliament.members.length * (1 + j)) / rowCount) + rowCount
    );
  }
  breakIdx.push(1000);
  const tempParliament = new Set(parliament.members);
  for (const id of worldviews.map((w) => w.id)) {
    let nextMember = [...tempParliament].find((m) => m.worldviewId === id);

    while (nextMember) {
      for (let i = 0; i < rows.length; i++) {
        if (
          rows[i].length < breakIdx[i] &&
          rows.every(
            (r, idx) =>
              idx <= i || rows[i].length < r.length + 2 * (idx - i) + 2
          )
        ) {
          rows[i].push(nextMember);
          break;
        }
      }

      tempParliament.delete(nextMember);
      nextMember = [...tempParliament].find((m) => m.worldviewId === id);
    }
  }
  return (
    <>
      {rows.map((row) => (
        <Row key={row.map((r) => r.id).join()} $center>
          {row.map((p) => (
            <SelectableCircle
              key={p.id}
              id={p.id}
              fill={worldviews.find((ph) => ph.id === p.worldviewId)?.fill}
            />
          ))}
        </Row>
      ))}
    </>
  );
};
