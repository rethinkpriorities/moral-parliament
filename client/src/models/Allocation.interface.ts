interface Allotment {
  projectId: number;
  funding: number;
}

interface Allocation {
  name: string;
  description: string;
  values: Allotment[];
  notes: Note;
}

type AllocationStrategy =
  | "approval-voting"
  | "ranked-choice-voting"
  | "social-welfare"
  | "nash-bargaining"
  | "merged-favorites"
  | "borda-voting"
  | "maximin"
  | "favorite-theory";

interface AllocationStrategyOptions {
  utilityDiscount: "sqrt" | "none" | "to-one-tenth";
  votingTiebreaker: "none" | "most-utility" | "increased-threshold";
  votingThreshold: number;
  statusQuo: "merged" | "zeros";
}
