import { NavMenu } from "./NavMenu.component";
import { walkthroughAtom } from "../../stores/Walkthrough.store";
import { useAtomValue } from "jotai";

export default () => {
  const walkthrough = useAtomValue(walkthroughAtom);
  return <NavMenu walkthrough={walkthrough} />;
};
