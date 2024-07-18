import React from "react";

import { CodeContainer } from "./WorldviewDetailsPanel.styles";

export const EvaluateText = ({
  raw,
  preRiskValue,
  project,
  worldview,
}: {
  raw: string;
  project: Project;
  preRiskValue: number;
  worldview: Worldview;
}) => {
  const [showValues, setShowValues] = React.useState(true);
  const detailed = (first: string, second: string) =>
    showValues ? first : second;
  return (
    <div>
      <p>
        Each 'Raw' value was calculated according to the formula in the black
        box below. The parameter settings can be adjusted in the corresponding
        Worldview and Project tabs. The 'Raw' value can also be manually
        overwritten by clicking on the pencil.
      </p>
      <span> Show</span>
      <label>
        <input
          name="details"
          type="radio"
          checked={showValues}
          onClick={() => setShowValues(true)}
        ></input>
        values inputted
      </label>
      <label>
        <input
          name="details"
          type="radio"
          checked={!showValues}
          onClick={() => setShowValues(false)}
        ></input>
        formula
      </label>
      <br />
      <br />
      <CodeContainer>
        <>
          <div style={{ gridColumn: "1 / -1" }}>
            <u>Total Raw Value</u>
          </div>
          <div>{detailed(raw, "raw")}</div>
          <div>=</div>
          <div>
            {detailed(String(project.probFor10x), "project.probFor10x")}
            {" * "}
            {detailed(String(preRiskValue * 10), "preRiskValue * 10")}
            {" * "}
          </div>
          <div />
          <div />
          <div>
            {detailed(
              String(worldview.riskOrderDiscountPos),
              "worldview.riskOrderDiscountPos"
            )}
            <sup>
              log<sub>10</sub>(
              {detailed((preRiskValue * 10).toFixed(), "preRiskValue * 10")})
            </sup>
          </div>
        </>
        <>
          <div></div>
          <div>+</div>
          <div>
            {detailed(String(project.probFor1x), "project.probFor1x")}
            {" * "}
            {detailed(String(preRiskValue), "preRiskValue")}
            {" * "}
          </div>
          <div />
          <div />
          <div>
            {detailed(
              String(worldview.riskOrderDiscountPos),
              "worldview.riskOrderDiscountPos"
            )}
            <sup>
              log<sub>10</sub>(
              {detailed(preRiskValue.toFixed(), "preRiskValue ")})
            </sup>
          </div>
        </>
        <>
          <div></div>
          <div>-</div>
          <div>
            {detailed(String(project.probForMinus1x), "project.probForMinus1x")}
            {" * "}
            {detailed(String(preRiskValue), "preRiskValue")}
            {" * "}
          </div>
          <div />
          <div />
          <div>
            {detailed(
              String(worldview.riskOrderDiscountNeg),
              "worldview.riskOrderDiscountNeg"
            )}
            <sup>
              log<sub>10</sub>(
              {detailed(preRiskValue.toFixed(), "preRiskValue")})
            </sup>
          </div>
        </>
        <>
          <div></div>
          <div>-</div>
          <div>
            {detailed(
              String(project.probForMinus10x),
              "project.probForMinus10x"
            )}
            {" * "}
            {detailed(String(preRiskValue * 10), "preRiskValue * 10")}
            {" * "}
          </div>
          <div />
          <div />
          <div>
            {detailed(
              String(worldview.riskOrderDiscountNeg),
              "worldview.riskOrderDiscountNeg"
            )}
            <sup>
              log<sub>10</sub>(
              {detailed((preRiskValue * 10).toFixed(), "preRiskValue * 10")})
            </sup>
          </div>
        </>
        <div style={{ marginTop: "10px", gridColumn: "1 / -1" }}>
          <u>Pre-Risk Value</u>
        </div>
        <>
          <div>{detailed(preRiskValue.toFixed(), "preRisk")}</div>
          <div>=</div>
          <div>
            {detailed(String(project.scaleValue), "project.scaleValue")}
          </div>
        </>
        <>
          <div>*</div>
          <div>(</div>
          <div></div>
        </>
        <>
          <div />
          <div />
          <div>
            {detailed(
              (project.recipientHumans * worldview.recipientHumans).toFixed(2),
              "project.recipientHumans * worldview.recipientHumans"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (
                project.recipientBirdsAndMammals *
                worldview.recipientBirdsAndMammals
              ).toFixed(2),
              "project.recipientBirdsAndMammals * worldview.recipientBirdsAndMammals"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (
                project.recipientFishAndReptiles *
                worldview.recipientFishAndReptiles
              ).toFixed(2),
              "project.recipientFishAndReptiles * worldview.recipientFishAndReptiles"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (
                project.recipientInvertebrates *
                worldview.recipientInvertebrates
              ).toFixed(2),
              "project.recipientInvertebrates * worldview.recipientInvertebrates"
            )}
          </div>
        </>
        <>
          <div></div>
          <div>)</div>
          <div></div>
        </>
        <>
          <div>*</div>
          <div>(</div>
          <div></div>
        </>
        <>
          <div></div>
          <div></div>
          <div>
            {detailed(
              (
                project.determinacyExisting * worldview.determinacyExisting
              ).toFixed(2),
              "project.determinacyExisting * worldview.determincayExisting"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (project.determinacySoon * worldview.determinacySoon).toFixed(2),
              "project.determinacySoon * worldview.determinacySoon"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (project.determinacyEver * worldview.determinacyEver).toFixed(2),
              "project.determinacyEver * worldview.determinacyEver"
            )}
          </div>
        </>
        <>
          <div></div>
          <div>)</div>
          <div></div>
        </>
        <>
          <div>*</div>
          <div>(</div>
          <div></div>
        </>
        <>
          <div></div>
          <div></div>
          <div>
            {detailed(
              (project.effectAddGood * worldview.effectAddGood).toFixed(2),
              "project.effectAddGood * worldview.effectAddGood"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (project.effectRemoveBad * worldview.effectRemoveBad).toFixed(2),
              "project.effectRemoveBad * worldview.effectRemoveBad"
            )}
          </div>
        </>
        <>
          <div></div>
          <div>)</div>
          <div></div>
        </>
        <>
          <div>*</div>
          <div>(</div>
          <div></div>
        </>
        <>
          <div></div>
          <div></div>
          <div>
            {detailed(
              (project.valuePleasantness * worldview.valuePleasantness).toFixed(
                2
              ),
              "project.valuePleasantness * worldview.valuePleasantness"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (project.valueFlourishing * worldview.valueFlourishing).toFixed(
                2
              ),
              "project.valueFlourishing * worldview.valueFlourishing"
            )}
          </div>
        </>
        <>
          <div />
          <div>+</div>
          <div>
            {detailed(
              (project.valueEquity * worldview.valueEquity).toFixed(2),
              "project.valueEquity * worldview.valueEquity"
            )}
          </div>
        </>
        <>
          <div></div>
          <div>)</div>
          <div></div>
        </>
        <>
          <div>)</div>
          <div></div>
          <div></div>
        </>
      </CodeContainer>
    </div>
  );
};
