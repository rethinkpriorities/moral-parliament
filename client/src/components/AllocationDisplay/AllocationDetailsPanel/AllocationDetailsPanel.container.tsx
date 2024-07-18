import { useParams } from "react-router-dom";

import { AllocationDetailsPanel } from "./AllocationDetailsPanel.component";

export default () => {
  const allocationStrategy = useParams()
    .allocationStrategy as AllocationStrategy;
  return <AllocationDetailsPanel allocationStrategy={allocationStrategy} />;
};
