import { ListWithForm } from "../ListWithForm";
import { AllocationDetailsPanel } from "./AllocationDetailsPanel";

const allocationStrategies: { name: AllocationStrategy; label: string }[] = [
  { name: "favorite-theory", label: "My Favorite Theory" },
  { name: "maximin", label: "Maximin" },
  { name: "social-welfare", label: "Max Expected Choiceworthiness" },
  { name: "merged-favorites", label: "Moral Marketplace" },
  { name: "approval-voting", label: "Approval Voting" },
  { name: "borda-voting", label: "Borda Voting" },
  { name: "ranked-choice-voting", label: "Ranked Choice Voting" },
  // { name: "group-bargaining", label: "Group Bargaining" },
  { name: "nash-bargaining", label: "Nash Bargaining" },
];

export const AllocationDisplay = ({
  allocationStrategy,
  clearWalkthrough,
}: {
  clearWalkthrough: () => void;
  allocationStrategy: AllocationStrategy;
}) => {
  return (
    <ListWithForm
      title="Allocation"
      description="There are different ways of deriving a consensus from the opinions of a group. The following methods provide different interpretations of what a group supports."
      items={allocationStrategies.map((a) => {
        return {
          selected: a.name === allocationStrategy,
          href: `/allocations/${a.name}`,
          text: a.label,
          onClick: clearWalkthrough,
        };
      })}
      href="/allocations"
      panel={<AllocationDetailsPanel />}
    ></ListWithForm>
  );
};
