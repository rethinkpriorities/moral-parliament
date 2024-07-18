import { useAtom } from "jotai";

import { parliamentAtom } from "../../../stores/Parliament.store";

import { ParliamentSets } from "./ParliamentSets.component";

export default () => {
  const [parliament, setParliament] = useAtom(parliamentAtom);
  return (
    <ParliamentSets parliament={parliament} setParliament={setParliament} />
  );
};
