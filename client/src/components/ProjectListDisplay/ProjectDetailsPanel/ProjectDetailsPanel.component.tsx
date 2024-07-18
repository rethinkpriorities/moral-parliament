import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import React from "react";
import projectSelectionPng from "./project_selection.png";
import selectProjectPng from "./click_project.png";
import projectDetailsPng from "./project_details.png";
import { GiLightBulb } from "react-icons/gi";

import { FieldGroup } from "../../FieldGroup";
import { Row, Column } from "../../../styles/containers";
import { SectionHeading } from "../../../styles/fonts";
import { RiskDistributionWaffleChart } from "./RiskDistributionWaffleChart";
import { Modal } from "../../Modal";
import { GiExpand } from "react-icons/gi";

import { fieldLabels } from "./fieldLabels.ts";
import { ProjectCheckboxList } from "./ProjectCheckboxList";
import { NextPageButton } from "../../NextPageButton";
import { PreferenceTable } from "./PreferenceTable";
import {
  Container,
  Label,
  Title,
  Description,
} from "./ProjectDetailsPanel.styles";

interface ProjectDetailsProps {
  selectedProject?: Project;
  updateProject: (arg0: Partial<Project>) => void;
  worldviewRatings: [string, number, number, number[]][];
  showNext: boolean;
}

const listItems = (strings: string[]) => {
  if (strings.length === 1) return strings[0];
  if (strings.length === 2) return strings.join(" and ");
  return (
    strings.slice(0, -1).join(", ") + ", and " + strings[strings.length - 1]
  );
};
export const ProjectDetailsPanel = ({
  selectedProject,
  updateProject,
  worldviewRatings,
  showNext,
}: ProjectDetailsProps) => {
  const [showPreferenceModal, setShowPreferenceModal] = React.useState(false);
  if (!selectedProject) {
    return (
      <Container>
        <h1>What are Projects?</h1>
        <p>
          Projects are the fictional charitable organizations and initiatives to
          which you might allocate resources. Each project categorizes impact
          acrosss a range of morally-relevant categories. All the project
          settings are customizable.
        </p>
        <p>
          Our project sets group individual projects into the standard EA cause
          areas. You can also build a custom set that better represents the live
          options in your own case.
        </p>
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
            To the left,{" "}
            <strong>
              select which projects you would like to include by clicking on
              those projects' checkboxes
            </strong>
            . These projects will form the options for parliamentarians to vote
            on.
          </div>
        </Row>
        <br />
        <Row>
          <img
            src={projectSelectionPng}
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
          <div style={{ width: "100%" }}>You can select up to 10 projects.</div>
        </Row>
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
            Click on a project to see a description and its specific parameter
            settings.
          </div>
        </Row>
        <br />
        <Row>
          <img
            src={selectProjectPng}
            style={{
              margin: "auto",
              width: "400px",
              border: "2px solid grey",
              boxShadow: "3px 3px 2px lightgrey",
            }}
          />
        </Row>
        {showNext && (
          <NextPageButton path="/worldviews">Next Step</NextPageButton>
        )}
      </Container>
    );
  }

  const favorites = worldviewRatings.filter((w) => w[1] < 3);
  const leastFavoriteRank = Math.max(...worldviewRatings.map((w) => w[1]));
  const leastFavorites = worldviewRatings.filter(
    (w) => w[1] > leastFavoriteRank - 3
  );
  const probabilities = [
    { label: "10X", value: selectedProject.probFor10x },
    { label: "X", value: selectedProject.probFor1x },
    { label: "0", value: selectedProject.probFor0x },
    { label: "-X", value: selectedProject.probForMinus1x },
    { label: "-10X", value: selectedProject.probForMinus10x },
  ];
  return (
    <Container>
      <span key={selectedProject?.id}>
        <Column>
          <Title>{selectedProject.name}</Title>
        </Column>
        <br />
        <SectionHeading>Description</SectionHeading>
        <Description>{selectedProject.description}</Description>
        <SectionHeading>Settings</SectionHeading>
        <p>
          The overall value is carved up by various kinds of value. A worldview
          values a project in terms of its overall value, as reapportioned by
          how much it cares about each component.
        </p>
        <p>
          There are four categories under which we carve off different
          components of values. The total value in each category should sum to
          one. Each value of a field in a category represents the percentage of
          the overall value coming from that component. A value of 1 indicates
          it represents 100% of value. Each category is indepedent of the
          others.
        </p>
        <Tabs>
          <TabList>
            <Tab>Beneficiaries</Tab>
            <Tab>
              <span className="hidden-on-tablet">Population</span> Status
            </Tab>
            <Tab>
              Effect <span className="hidden-on-tablet">Valence</span>
            </Tab>
            <Tab>
              <span className="hidden-on-tablet">Value</span> Type
            </Tab>
            <Tab>Risk</Tab>
            <Tab>Scale</Tab>
          </TabList>

          <TabPanel>
            <FieldGroup
              fields={
                [
                  "recipientHumans",
                  "recipientBirdsAndMammals",
                  "recipientFishAndReptiles",
                  "recipientInvertebrates",
                ] as (keyof Project)[]
              }
              fieldLabels={fieldLabels}
              normalize={true}
              selectedItem={selectedProject}
              updateItem={updateProject}
            />
          </TabPanel>
          <TabPanel>
            <FieldGroup
              fields={
                [
                  "determinacyExisting",
                  "determinacySoon",
                  "determinacyEver",
                ] as (keyof Project)[]
              }
              fieldLabels={fieldLabels}
              normalize={true}
              selectedItem={selectedProject}
              updateItem={updateProject}
            />
          </TabPanel>
          <TabPanel>
            <FieldGroup
              fields={["effectAddGood", "effectRemoveBad"] as (keyof Project)[]}
              fieldLabels={fieldLabels}
              normalize={true}
              selectedItem={selectedProject}
              updateItem={updateProject}
            />
          </TabPanel>
          <TabPanel>
            <FieldGroup
              fields={
                [
                  "valuePleasantness",
                  "valueFlourishing",
                  "valueEquity",
                ] as (keyof Project)[]
              }
              fieldLabels={fieldLabels}
              normalize={true}
              selectedItem={selectedProject}
              updateItem={updateProject}
            />
          </TabPanel>
          <TabPanel>
            <p>
              Take the 'Overall Value' of this project above, denoted by 'X', as
              a baseline. Suppose that the only possible outcomes are -10X, -X,
              0, X, 10X. You will now choose the probability for each of these.
            </p>
            <p>
              Your probabilities will automatically add up to 1. You can lock
              each one after setting them.
            </p>
            <RiskDistributionWaffleChart probabilities={probabilities} />
            <br />
            <p>With what probability might the project...</p>
            <FieldGroup
              fields={
                [
                  "probFor10x",
                  "probFor1x",
                  "probFor0x",
                  "probForMinus1x",
                  "probForMinus10x",
                ] as (keyof Project)[]
              }
              fieldLabels={fieldLabels}
              normalize={true}
              selectedItem={selectedProject}
              updateItem={updateProject}
            />
          </TabPanel>
          <TabPanel>
            <Row $middle>
              <div style={{ marginRight: "4rem" }}>
                <p>
                  Scale value is a measure of the total amount of good the
                  project will do. The number specified here is the value
                  assuming every categorization is fully valued.
                </p>
                <p>
                  {" "}
                  Individual worldviews will assign a lesser value to this
                  project based on how it discounts the value in each category.
                </p>
              </div>
              <div>
                <Label style={{ margin: 0 }}>Scale Value</Label>

                <input
                  style={{
                    maxWidth: "10rem",
                    marginRight: "1em",
                    fontSize: "2rem",
                    padding: "0.5em",
                  }}
                  value={selectedProject.scaleValue}
                  onChange={(e) => {
                    updateProject({ scaleValue: parseFloat(e.target.value) });
                  }}
                />
              </div>
            </Row>
          </TabPanel>
        </Tabs>
        <SectionHeading>Standings</SectionHeading>

        {favorites[0] && (
          <p>
            <span>
              {selectedProject.name} is among the{" "}
              <strong style={{ color: "var(--rp-blue)" }}>most-liked</strong>{" "}
              projects for {listItems(favorites.map((f) => f[0]))}.
            </span>
            <br />
          </p>
        )}
        {leastFavorites[0] && (
          <p>
            {selectedProject.name} is among the{" "}
            <strong style={{ color: "var(--rp-red)" }}>least-liked</strong>{" "}
            projects for {listItems(leastFavorites.map((f) => f[0]))}.
          </p>
        )}
        {!favorites[0] && !leastFavorites[0] && (
          <p>
            {selectedProject.name} is not among the favorites of any worldview.
          </p>
        )}
        <a
          style={{ cursor: "pointer" }}
          onClick={() => setShowPreferenceModal(true)}
        >
          See full breakdown of standings by worldview.
          <GiExpand />
        </a>
        {showPreferenceModal && (
          <Modal onClose={() => setShowPreferenceModal(false)}>
            <SectionHeading>
              Project Standings Breakdown by Worldview
            </SectionHeading>
            <PreferenceTable project={selectedProject} />
          </Modal>
        )}
        {showNext && (
          <NextPageButton path="/worldviews">Next Step</NextPageButton>
        )}
      </span>
    </Container>
  );
};
