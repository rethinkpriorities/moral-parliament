import { useSetAtom } from "jotai";

import { WalkthroughButton } from "./WalkthroughButton.component";

import { includedProjectIdsAtom } from "../../../stores/Project.store";
import { parliamentAtom } from "../../../stores/Parliament.store";
import { walkthroughAtom } from "../../../stores/Walkthrough.store";

export default () => {
  const setWalkthrough = useSetAtom(walkthroughAtom);
  const setParliament = useSetAtom(parliamentAtom);
  const setIncludedProjectIds = useSetAtom(includedProjectIdsAtom);
  const startWalkthrough = () => {
    window.scrollTo(0, 0);

    setParliament({ members: [] });
    setIncludedProjectIds([]);
    setWalkthrough({
      projects: false,
      worldviews: false,
      parliament: false,
      allocations: false,
    });
  };
  return <WalkthroughButton startWalkthrough={startWalkthrough} />;
};
