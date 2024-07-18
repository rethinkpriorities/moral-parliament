import { useAtomValue } from "jotai";
import { walkthroughAtom } from "../../stores/Walkthrough.store";
import { WalkthroughModal } from "./WalkthroughModal.component";

export default () => {
  const walkthrough = useAtomValue(walkthroughAtom);
  return <WalkthroughModal walkthrough={walkthrough} />;
};
