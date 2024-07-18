export const discount = (num: number, orderDiscount: number) => {
  if (num === 0) {
    return 1;
  }
  const orders = Math.log10(Math.abs(num));
  return orderDiscount ** orders;
};

export const evaluatePreRisk = (project: Project, worldview: Worldview) => {
  return (
    project.scaleValue *
    ((project.recipientHumans * worldview.recipientHumans +
      project.recipientBirdsAndMammals * worldview.recipientBirdsAndMammals +
      project.recipientFishAndReptiles * worldview.recipientFishAndReptiles +
      project.recipientInvertebrates * worldview.recipientInvertebrates) *
      (project.determinacyExisting * worldview.determinacyExisting +
        project.determinacySoon * worldview.determinacySoon +
        project.determinacyEver * worldview.determinacyEver) *
      (project.effectAddGood * worldview.effectAddGood +
        project.effectRemoveBad * worldview.effectRemoveBad) *
      (project.valuePleasantness * worldview.valuePleasantness +
        project.valueFlourishing * worldview.valueFlourishing +
        project.valueEquity * worldview.valueEquity))
  );
};
export const evaluate = (
  project: Project,
  worldview: Worldview,
  options = { ignoreStipulated: false }
) => {
  const stipulatedValue = worldview.stipulatedValues.find(
    (w) => w[0] === project.id
  )?.[1];

  if (stipulatedValue && !options.ignoreStipulated) {
    return stipulatedValue;
  }
  const preRiskResult = evaluatePreRisk(project, worldview);
  // now calculate the expected value with the weighted probabilities
  const result =
    10 *
      preRiskResult *
      project.probFor10x *
      discount(preRiskResult * 10, worldview.riskOrderDiscountPos) +
    1 *
      preRiskResult *
      project.probFor1x *
      discount(preRiskResult, worldview.riskOrderDiscountPos) +
    -1 *
      preRiskResult *
      project.probForMinus1x *
      discount(preRiskResult * 1, worldview.riskOrderDiscountNeg) +
    -10 *
      preRiskResult *
      project.probForMinus10x *
      discount(preRiskResult * 10, worldview.riskOrderDiscountNeg);
  return result;
};
