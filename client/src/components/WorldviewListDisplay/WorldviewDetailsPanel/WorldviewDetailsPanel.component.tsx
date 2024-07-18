import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NavLink } from "react-router-dom";
import { Button } from "../../../styles/buttons";
import { GiLightBulb } from "react-icons/gi";
import worldviewSelectionPng from "./worldview_selection.png";
import selectWorldviewPng from "./click_worldview.png";
import toggleParliamentarianPng from "./toggle_parliamentarian.png";
import worldviewDetailsPng from "./worldview_details.png";

import { FieldGroup } from "../../FieldGroup";
import { evaluate } from "../../../utils/projectWorldviewEvaluator";
import { NextPageButton } from "../../NextPageButton";
import { InfoTag } from "../../InfoTag";
import { Column, Row } from "../../../styles/containers";
import { SectionHeading } from "../../../styles/fonts";

import { fieldLabels } from "./fieldLabels";
import { EditableEvaluation } from "./EditableEvaluation.component";
import { infotags } from "./WorldviewDetailsPanel.info";
import { RiskDistributionChart } from "./RiskDistributionChart/RiskDistributionChart.component";
import { Container, Title, Description } from "./WorldviewDetailsPanel.styles";

interface WorldviewDetailsPanelProps {
  updateWorldview: (arg0: Partial<Worldview>) => void;
  selectedWorldview?: Worldview;
  sortedProjects: Project[];
  showNext: boolean;
}

export const WorldviewDetailsPanel = ({
  updateWorldview,
  selectedWorldview,
  sortedProjects,
  showNext,
}: WorldviewDetailsPanelProps) => {
  if (typeof selectedWorldview?.id == "undefined") {
    return (
      <Container>
        <h1>What are Worldviews?</h1>
        <p>
          Worldviews are value systems that have four basic components: the
          relative importance of:
        </p>
        <ul style={{ listStyle: "none" }}>
          <li>(1) humans, animals, and AIs;</li>{" "}
          <li>(2) current and future beings;</li>
          <li>(3) moral considerations, and</li>
          <li>(4) attitudes toward risk.</li>
        </ul>
        <p>
          The names of the worldviews are nods to their respective inspirations,
          not claims that these settings perfectly represent the views of
          particular historical figures. Each worldview is fully customizable.
          To give you a better sense of the implications of editing a worldview,
          we show you how your edits alter the evaluations of a handful of
          projects.
        </p>
        <Row $middle>
          <GiLightBulb
            style={{
              color: "var(--rp-blue)",
              fontSize: "3em",
              marginRight: "1rem",
            }}
          />
          <div style={{ width: "100%" }}>
            To the left,{" "}
            <strong>
              select which worldviews you would like to be represented in your
              parliament
            </strong>
            .
          </div>
        </Row>
        <br />
        <Row>
          <img
            src={worldviewSelectionPng}
            style={{
              margin: "auto",
              width: "400px",
              border: "2px solid grey",
              boxShadow: "3px 3px 2px lightgrey",
            }}
          />
        </Row>
        <br />
        <br />
        <Row $middle>
          <GiLightBulb
            style={{
              color: "var(--rp-blue)",
              fontSize: "3em",
              marginRight: "1rem",
            }}
          />
          <div style={{ width: "100%" }}>
            Each worldview you select adds 3 parliamentarians to the parliament.
            This number can be changed in the{" "}
            <NavLink to="/parliament" style={{ textDecoration: "underline" }}>
              parliament page
            </NavLink>
            .
          </div>
        </Row>
        <br />
        <Row>
          <img
            src={toggleParliamentarianPng}
            style={{
              margin: "auto",
              width: "400px",
              border: "2px solid grey",
              boxShadow: "3px 3px 2px lightgrey",
            }}
          />
        </Row>
        <br />
        <br />
        <Row $middle>
          <GiLightBulb
            style={{
              color: "var(--rp-blue)",
              fontSize: "3em",
              marginRight: "1rem",
            }}
          />
          <div style={{ width: "100%" }}>
            Click on a worldview to see a description and its specific parameter
            settings.
          </div>
        </Row>
        <br />
        <Row>
          <img
            src={selectWorldviewPng}
            style={{
              margin: "auto",
              width: "400px",
              border: "2px solid grey",
              boxShadow: "3px 3px 2px lightgrey",
            }}
          />
        </Row>
        <br />
        {showNext && (
          <NextPageButton path="/parliament">Next Step</NextPageButton>
        )}
      </Container>
    );
  }
  return (
    <Container>
      <Title>
        <Column>{selectedWorldview?.name} Worldview</Column>
      </Title>

      {typeof selectedWorldview?.id === "undefined" ? (
        <span key="none">None selected</span>
      ) : (
        <div key={selectedWorldview?.id}>
          <>
            <SectionHeading>Description</SectionHeading>
            <Description>{selectedWorldview.description}</Description>
            <SectionHeading>Evaluations</SectionHeading>
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Worldview's Valuation</th>
                  <th className="hidden-on-mobile">Normalized</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((p) => {
                  return (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>
                        <EditableEvaluation
                          updateWorldview={(v) =>
                            updateWorldview({ stipulatedValues: v })
                          }
                          worldview={selectedWorldview}
                          project={p}
                        />
                      </td>
                      <td className="hidden-on-mobile">
                        {(
                          evaluate(p, selectedWorldview) /
                          evaluate(sortedProjects[0], selectedWorldview)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {selectedWorldview.stipulatedValues[0] && (
              <small style={{ color: "var(--red)" }}>
                Red values have been overriden with stipulated numbers.
              </small>
            )}
          </>
          <>
            <SectionHeading>Settings</SectionHeading>
            <Tabs>
              <TabList>
                <div className="tab-container">
                  <Tab>Beneficiaries</Tab>
                  <Tab>
                    Population <span className="hidden-on-tablet">Status</span>
                  </Tab>
                  <Tab>
                    <span className="hidden-on-tablet">Effect</span> Valence
                  </Tab>
                  <Tab>
                    Value <span className="hidden-on-tablet">Type</span>
                  </Tab>
                  <Tab>Risk</Tab>
                </div>
              </TabList>

              <TabPanel>
                <FieldGroup
                  fields={
                    [
                      "recipientHumans",
                      "recipientBirdsAndMammals",
                      "recipientFishAndReptiles",
                      "recipientInvertebrates",
                    ] as (keyof Worldview)[]
                  }
                  tags={infotags}
                  fieldLabels={fieldLabels}
                  selectedItem={selectedWorldview}
                  updateItem={updateWorldview}
                />
              </TabPanel>
              <TabPanel>
                <FieldGroup
                  fields={
                    [
                      "determinacyExisting",
                      "determinacySoon",
                      "determinacyEver",
                    ] as (keyof Worldview)[]
                  }
                  selectedItem={selectedWorldview}
                  tags={infotags}
                  fieldLabels={fieldLabels}
                  updateItem={updateWorldview}
                />
              </TabPanel>
              <TabPanel>
                <FieldGroup
                  fields={
                    ["effectAddGood", "effectRemoveBad"] as (keyof Worldview)[]
                  }
                  selectedItem={selectedWorldview}
                  tags={infotags}
                  fieldLabels={fieldLabels}
                  updateItem={updateWorldview}
                />
              </TabPanel>
              <TabPanel>
                <FieldGroup
                  fields={
                    [
                      "valuePleasantness",
                      "valueFlourishing",
                      "valueEquity",
                    ] as (keyof Worldview)[]
                  }
                  selectedItem={selectedWorldview}
                  tags={infotags}
                  fieldLabels={fieldLabels}
                  updateItem={updateWorldview}
                />
              </TabPanel>
              <TabPanel>
                <p>
                  One way to account for risky prospects is to adjust the weight
                  given to outcomes with higher or lower magnitude effects. By
                  setting a discount for very good or bad outcomes, you can
                  adjust how comfortable a worldview is about taking long-shots
                  or actions that might backfire.
                  <InfoTag>
                    If you're risk-loving, you might give the positive outcomes
                    more weight, relative to the negative outcomes less. And if
                    you were risk-averse, you might give outcomes 10X and X
                    values lower than 1 and set the weights for 0 and -X at 1.
                    <p>
                      Note that the baseline outcome 'X' for each project is the
                      corresponding number under the 'Raw' column in the table
                      above.
                    </p>
                  </InfoTag>
                </p>
                <p>
                  The following chart depicts the selected risk settings,
                  showing the relative weights (by size) used to adjust very
                  high and very low prospect results (labeled numbers).
                </p>
                <RiskDistributionChart
                  weightPos={selectedWorldview.riskOrderDiscountPos}
                  weightNeg={selectedWorldview.riskOrderDiscountNeg}
                />
                <br />
                <FieldGroup
                  fields={
                    [
                      "riskOrderDiscountPos",
                      "riskOrderDiscountNeg",
                    ] as (keyof Worldview)[]
                  }
                  selectedItem={selectedWorldview}
                  tags={infotags}
                  fieldLabels={fieldLabels}
                  updateItem={updateWorldview}
                />
                <Row $center>
                  <h3>Defaults: </h3>
                  <Button
                    $small
                    onClick={() =>
                      updateWorldview({
                        riskOrderDiscountPos: 0.7,
                        riskOrderDiscountNeg: 0.7,
                      })
                    }
                  >
                    Cautious
                  </Button>
                  <Button
                    $small
                    onClick={() =>
                      updateWorldview({
                        riskOrderDiscountPos: 1.2,
                        riskOrderDiscountNeg: 1.2,
                      })
                    }
                  >
                    Ambitious
                  </Button>
                  <Button
                    $small
                    onClick={() =>
                      updateWorldview({
                        riskOrderDiscountPos: 0.7,
                        riskOrderDiscountNeg: 1.2,
                      })
                    }
                  >
                    Worst-Case Averse
                  </Button>
                  <Button
                    $small
                    onClick={() =>
                      updateWorldview({
                        riskOrderDiscountPos: 1.2,
                        riskOrderDiscountNeg: 0.7,
                      })
                    }
                  >
                    Best-Case Seeking
                  </Button>
                </Row>
              </TabPanel>
            </Tabs>
            <br />
          </>
          {showNext && (
            <NextPageButton path="/parliament">Next Step</NextPageButton>
          )}
        </div>
      )}
    </Container>
  );
};
