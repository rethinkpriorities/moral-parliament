import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { walkthroughAtom } from "../../stores/Walkthrough.store";
import { AllocationDisplay } from "./AllocationDisplay.component";
export default () => {
  const [walkthrough, setWalkthrough] = useAtom(walkthroughAtom);
  const clearWalkthrough = () => {
    if (
      walkthrough?.projects &&
      walkthrough?.worldviews &&
      walkthrough?.parliament
    ) {
      setWalkthrough({ ...walkthrough, allocations: true });
      setTimeout(() => setWalkthrough(null), 3000);
    }
  };
  const allocationStrategy = useParams()
    .allocationStrategy as AllocationStrategy;
  return (
    <AllocationDisplay
      clearWalkthrough={clearWalkthrough}
      allocationStrategy={allocationStrategy}
    />
  );
};
