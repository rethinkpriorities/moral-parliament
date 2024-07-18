interface Worldview {
  name: string;
  fill: string;
  id: number;
  description: string;
  stipulatedValues: [number, number][];
  recipientHumans: number;
  recipientBirdsAndMammals: number;
  recipientFishAndReptiles: number;
  recipientInvertebrates: number;
  determinacyExisting: number;
  determinacySoon: number;
  determinacyEver: number;
  riskOrderDiscountPos: number;
  riskOrderDiscountNeg: number;
  effectAddGood: number;
  effectRemoveBad: number;
  valuePleasantness: number;
  valueFlourishing: number;
  valueEquity: number;
}
