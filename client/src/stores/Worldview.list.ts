let id = -1;
const nextId = () => {
  id += 1;
  return id;
};
export const DEFAULT_WORLDVIEW = {
  name: "Universal Beneficence",
  description: "A worldview.",
  fill: "var(--rp-blue)",
  id: nextId(),
  stipulatedValues: [],
  recipientHumans: 1,
  recipientBirdsAndMammals: 1,
  recipientFishAndReptiles: 1,
  recipientInvertebrates: 1,
  determinacyExisting: 1,
  determinacySoon: 1,
  determinacyEver: 1,
  riskOrderDiscountPos: 0.5,
  riskOrderDiscountNeg: 1,
  effectAddGood: 1,
  effectRemoveBad: 1,
  valuePleasantness: 1,
  valueFlourishing: 0,
  valueEquity: 1,
};

const MWP_BIRDS_MAMMALS = 0.332;
const MWP_FISH_REPTILES = 0.089;
const MWP_INVERTS = 0.013;

export const DEFAULT_WORLDVIEWS = [
  {
    name: "Total Welfarist Consequentialism",
    description:
      "A moral view that aims to maximize the welfare of all individuals, present or future and human or otherwise.",
    fill: "#fd5f4b",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: MWP_BIRDS_MAMMALS * 0.8,
    recipientFishAndReptiles: MWP_FISH_REPTILES / 2,
    recipientInvertebrates: MWP_INVERTS / 5,
    determinacyExisting: 1,
    determinacySoon: 1,
    determinacyEver: 1,
    riskOrderDiscountPos: 1,
    riskOrderDiscountNeg: 1,
    effectAddGood: 1,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 1,
    valueEquity: 0,
  },
  {
    name: "Total Utilitarianism",
    description:
      "A moral view that aims to maximize the happiness / minimize the unhappiness of all individuals, present or future and human or otherwise.",
    fill: "#ef8b6e",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: MWP_BIRDS_MAMMALS,
    recipientFishAndReptiles: MWP_FISH_REPTILES,
    recipientInvertebrates: MWP_INVERTS,
    determinacyExisting: 1,
    determinacySoon: 1,
    determinacyEver: 1,
    riskOrderDiscountPos: 1,
    riskOrderDiscountNeg: 1,
    effectAddGood: 1,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 0,
    valueEquity: 0,
  },
  {
    name: "Total Negative Utilitarianism",
    description:
      "A moral view that aims to minimize the unhappiness of all individuals, present or future and human or otherwise.",
    fill: "#f5d044",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: MWP_BIRDS_MAMMALS,
    recipientFishAndReptiles: MWP_FISH_REPTILES,
    recipientInvertebrates: MWP_INVERTS,
    determinacyExisting: 1,
    determinacySoon: 1,
    determinacyEver: 1,
    riskOrderDiscountPos: 1,
    riskOrderDiscountNeg: 1.2,
    effectAddGood: 0,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 0,
    valueEquity: 0,
  },
  // fill: "#fe8cbf",
  {
    name: "Person-Affecting Welfarist Consequentialism",
    description:
      "A moral view that aims to maximize the welfare of existing individuals, human or otherwise.",
    fill: "#e5b680",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: MWP_BIRDS_MAMMALS * 0.8,
    recipientFishAndReptiles: MWP_FISH_REPTILES / 2,
    recipientInvertebrates: MWP_INVERTS / 5,
    determinacyExisting: 1,
    determinacySoon: 0,
    determinacyEver: 0,
    riskOrderDiscountPos: 1,
    riskOrderDiscountNeg: 1,
    effectAddGood: 1,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 1,
    valueEquity: 0,
  },
  {
    name: "Short-termist Utilitarianism",
    description:
      "A moral view that aims to maximize the happiness / minimize the suffering of near-future individuals, human or otherwise.",
    fill: "hsl(35.31deg 99.18% 51.96%)",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: MWP_BIRDS_MAMMALS,
    recipientFishAndReptiles: MWP_FISH_REPTILES,
    recipientInvertebrates: MWP_INVERTS,
    determinacyExisting: 1,
    determinacySoon: 0.5,
    determinacyEver: 0,
    riskOrderDiscountPos: 1,
    riskOrderDiscountNeg: 1,
    effectAddGood: 1,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 0,
    valueEquity: 0,
  },
  {
    name: "Risk-Averse Welfarist Consequentialism",
    description:
      "A moral view that aims to increase the welfare of individuals, human or otherwise, without taking long-shot bets or risking causing bad outcomes.",
    fill: "#e9ccf9",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: MWP_BIRDS_MAMMALS * 0.8,
    recipientFishAndReptiles: MWP_FISH_REPTILES / 2,
    recipientInvertebrates: MWP_INVERTS / 5,
    determinacyExisting: 1,
    determinacySoon: 0.5,
    determinacyEver: 0.1,
    riskOrderDiscountPos: 0.5,
    riskOrderDiscountNeg: 0.9,
    effectAddGood: 1,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 1,
    valueEquity: 0,
  },
  {
    name: "Rawlsian Contractarianism",
    description:
      " A moral view that aims to promote justice, fairness, and equity.",
    fill: "#c5f3f3",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: MWP_BIRDS_MAMMALS / 10,
    recipientFishAndReptiles: MWP_FISH_REPTILES / 10,
    recipientInvertebrates: MWP_INVERTS / 10,
    determinacyExisting: 1,
    determinacySoon: 0.5,
    determinacyEver: 0,
    riskOrderDiscountPos: 0.5,
    riskOrderDiscountNeg: 0.9,
    effectAddGood: 0.5,
    effectRemoveBad: 1,
    valuePleasantness: 0.25,
    valueFlourishing: 0.5,
    valueEquity: 1,
  },
  {
    name: "Common Sense",
    description: "A moral view that supports commonly held moral beliefs.",
    fill: "#bcd0d7",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: 0.001,
    recipientFishAndReptiles: 0.0005,
    recipientInvertebrates: 0,
    determinacyExisting: 1,
    determinacySoon: 0.2,
    determinacyEver: 0.0001,
    riskOrderDiscountPos: 0.75,
    riskOrderDiscountNeg: 1,
    effectAddGood: 0.25,
    effectRemoveBad: 1,
    valuePleasantness: 0.5,
    valueFlourishing: 1,
    valueEquity: 1,
  },
  {
    name: "Egalitarianism",
    description:
      "A moral view that aims to promote the welfare of all with no distinction between species",
    fill: "#b5e7a3",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: 1,
    recipientFishAndReptiles: 1,
    recipientInvertebrates: 1,
    determinacyExisting: 1,
    determinacySoon: 1,
    determinacyEver: 1,
    riskOrderDiscountPos: 0.8,
    riskOrderDiscountNeg: 0.8,
    effectAddGood: 1,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 1,
    valueEquity: 0,
  },
  {
    name: "Kantianism",
    description:
      "A moral view (loosely inspired by Kant) focused on obeying universal ethical rules which require us to respect the rights of rational creatures. This is worst-case risk-averse and generally focused on avoiding or rectifying harms.",
    fill: "#a3dd41",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: 0,
    recipientFishAndReptiles: 0,
    recipientInvertebrates: 0,
    determinacyExisting: 1,
    determinacySoon: 0,
    determinacyEver: 0,
    riskOrderDiscountPos: 0.5,
    riskOrderDiscountNeg: 1,
    effectAddGood: 0.25,
    effectRemoveBad: 1,
    valuePleasantness: 0,
    valueFlourishing: 0,
    valueEquity: 1,
  },
  {
    name: "Nietzscheanism",
    description:
      "A moral view  (loosely inspired by Nietzsche) that says that we should promote human excellence and have little concern for individual welfare. This view is very willing to take gambles on the prospect of large positive results.",
    fill: "#8cbf9b",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: 0,
    recipientFishAndReptiles: 0,
    recipientInvertebrates: 0,
    determinacyExisting: 1,
    determinacySoon: 1,
    determinacyEver: 1,
    riskOrderDiscountPos: 1,
    riskOrderDiscountNeg: 0.7,
    effectAddGood: 1,
    effectRemoveBad: 0.2,
    valuePleasantness: 0,
    valueFlourishing: 1,
    valueEquity: 0,
  },
  {
    name: "Custom",
    description: "A worldview to customize as you see fit.",
    fill: "#8c92f3",
    id: nextId(),
    stipulatedValues: [],
    recipientHumans: 1,
    recipientBirdsAndMammals: 1,
    recipientFishAndReptiles: 1,
    recipientInvertebrates: 1,
    determinacyExisting: 1,
    determinacySoon: 1,
    determinacyEver: 1,
    riskOrderDiscountPos: 1,
    riskOrderDiscountNeg: 1,
    effectAddGood: 1,
    effectRemoveBad: 1,
    valuePleasantness: 1,
    valueFlourishing: 1,
    valueEquity: 1,
  },
] as Worldview[];