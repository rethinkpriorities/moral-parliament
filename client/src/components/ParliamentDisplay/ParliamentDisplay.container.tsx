import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { ParliamentDisplay } from "./ParliamentDisplay.component";
import { parliamentAtom } from "../../stores/Parliament.store";
import { walkthroughAtom } from "../../stores/Walkthrough.store";

export default () => {
  const parliament = useAtomValue(parliamentAtom);
  const [walkthrough, setWalkthrough] = useAtom(walkthroughAtom);
  useEffect(() => {
    if (walkthrough) {
      setWalkthrough({ ...walkthrough, parliament: true });
    }
  }, [walkthrough]);
  return (
    <ParliamentDisplay
      parliament={parliament}
      showNext={!!walkthrough?.parliament}
    />
  );
};
