import { useAtomValue, useAtom } from "jotai";

import { parliamentAtom } from "../../../stores/Parliament.store";
import { worldviewsAtom } from "../../../stores/Worldview.store";

import { ParliamentWorldviewStats } from "./ParliamentWorldviewStats.component";

export default () => {
  const [parliament, setParliament] = useAtom(parliamentAtom);
  const worldviews = useAtomValue(worldviewsAtom);
  const removeWorldview = (id: number) => {
    if (parliament.members.filter((p) => p.worldviewId === id).length <= 1)
      return;
    const newParliament = { members: [...parliament.members] };
    const idxToRemove = newParliament.members.findIndex(
      (m) => m.worldviewId === id
    );
    newParliament.members = newParliament.members.filter(
      (_m, idx) => idx !== idxToRemove
    );
    setParliament(newParliament);
  };

  const maxId = (parliament: Parliament) =>
    (parliament.members.map((m) => m.id).sort((a, b) => (b <= a ? 1 : -1))[0] ||
      0) + 1;

  const addWorldview = (id: number) => {
    if (parliament.members.length >= 50) return;
    const newParliament = { members: [...parliament.members] };
    newParliament.members.push({ id: maxId(parliament), worldviewId: id });
    setParliament(newParliament);
  };

  return (
    <ParliamentWorldviewStats
      removeWorldview={removeWorldview}
      addWorldview={addWorldview}
      parliament={parliament}
      worldviews={worldviews}
    />
  );
};
