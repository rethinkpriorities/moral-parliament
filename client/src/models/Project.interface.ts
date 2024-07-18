interface Project {
  name: string;
  group: string;
  description: string;
  id: number;
  included?: boolean;
  scaleValue: number;
  recipientHumans: number;
  recipientBirdsAndMammals: number;
  recipientFishAndReptiles: number;
  recipientInvertebrates: number;
  determinacyExisting: number;
  determinacySoon: number;
  determinacyEver: number;
  probFor10x: number;
  probFor1x: number;
  probFor0x: number;
  probForMinus1x: number;
  probForMinus10x: number;
  effectAddGood: number;
  effectRemoveBad: number;
  valuePleasantness: number;
  valueFlourishing: number;
  valueEquity: number;
}
