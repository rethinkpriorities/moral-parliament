import { useAtom } from "jotai";
import { useParams } from "react-router-dom";

import { allocationOptionsAtom } from "../../../../stores/Allocation.store";

import { StrategyOptionControls } from "./StrategyOptionControls.component";

export default () => {
  const [allocationOptions, setAllocationOptions] = useAtom(
    allocationOptionsAtom
  );
  const allocationStrategy = useParams()
    .allocationStrategy as AllocationStrategy;
  return (
    <StrategyOptionControls
      allocationStrategy={allocationStrategy}
      allocationOptions={allocationOptions}
      setAllocationOptions={setAllocationOptions}
    />
  );
};
