import { StrategyOptionControls } from "./StrategyOptionControls";
import { AllocationResultsBreakdown } from "./AllocationResultsBreakdown";
import allocationSelectionPng from "./allocation_selection.png";
import { GiLightBulb } from "react-icons/gi";

import { Row } from "../../../styles/containers";
import {
  Title,
  Container,
  Description,
  LabelledTitle,
  ListContainer,
} from "./AllocationDetailsPanel.styles";

const STRATEGY_NAMES = {
  "approval-voting": "Approval Voting",
  "favorite-theory": `Most Popular View's Allocation`,
  "merged-favorites": `The Moral Marketplace`,
  "nash-bargaining": "Nash Bargaining Solution",
  "ranked-choice-voting": `Ranked Choice Voting`,
  "social-welfare": `Maximize Expected Choiceworthiness`,
  "borda-voting": "Borda Voting",
  maximin: "Maximize Minimum",
};
const STRATEGY_DESCRIPTIONS = {
  "approval-voting": `Parliamentarians vote on each possible allocation of a set granularity.
  Parliamentarians approve of those allocations which surpass some threshold value, determined as a percentage of the value of their favorite allocation. The tied allocations with the most votes are all shown below.`,
  "approval-utility": `Follows approval voting but it breaks ties by selecting the allocation that maximizes the sum of the utilities of the worldviews, weighted by their representation in the parliament.`,
  "favorite-theory": `Often termed 'my favorite theory' in the literature, this method is better referred to as 'my favorite worldview' in the context of this tool. It chooses an allocation based only on the preferences of the most popular worldview in the parliament.
  If there is a tie, then a worldview will be selected at random. This is the 'coup d'état' approach.`,
  "social-welfare": `A method that selects the allocation that maximizes the sum of the utilities of the worldviews, weighted by their representation in the parliament. This method treats utilities for all worldviews as if they fall on the same scale, despite the fact that some worldviews see more avenues for value than others.`,
  "borda-voting": (
    <ListContainer>
      <p>
      In the Borda method, worldviews give higher scores to the projects they rank higher. The project with the largest combined score (i.e. the <em>Credence-Weighted Borda Score</em>) is then selected. 
      Specifically, 
      </p>
      <ol>
        <li>A project's <em> Borda Score </em>according to a worldview is calculated by counting the number of options that are less preferred than it, and subtracting the number of options that are more preferred. </li>
        <ol>
        <li>Unlike traditional Borda Scores, which often omit the subtraction step, our method includes it for tie-breaking purposes, like in <a href="https://www.jstor.org/stable/41105961" target="_blank" rel="noopener noreferrer">Saari (1990)</a>. </li>
        </ol>
        <li>A project's <em>Credence-Weighted Borda Score</em> is the sum of its Borda Scores across all worldviews, with each score weighted by the proportion of delegates from that worldview in the parliament.</li>
      </ol>
    </ListContainer>
  ),
  "ranked-choice-voting": (
    <ListContainer>
      <p>
        Ranked-Choice Voting (RCV) – also known as Instant Runoff Voting (IRV)
        in single-winner elections – follows the steps below:
      </p>
      <ol>
        <li>Voters rank candidates according to their preferences.</li>
        <li>If no candidate receives a majority of first-preference votes,</li>
        <ol>
          <li>
            the candidate with the fewest first-preference votes is eliminated,
          </li>
          <li>
            and their votes are redistributed to the remaining candidates based
            on the next preference on each ballot.
          </li>
        </ol>
        <li>
          This process continues until a single candidate has an absolute
          majority of first-preference votes.
        </li>
        <li>That candidate is chosen.</li>{" "}
      </ol>
    </ListContainer>
  ),
  "merged-favorites": `This method gives each parliamentarian a slice of the budget to allocate as they each see fit,
  then combines each's chosen allocation into one shared portfolio. This process is relatively insensitive to considerations of decreasing cost-effectiveness.`,
  "nash-bargaining": `This method compares the evaluations of a number of possible allocations for each parliamentarian with a base allocation.
  It selects the allocation that improves on the base allocation the most, where the most is interpreted in terms of the product of differences of evaluations.`,
  maximin: `Sometimes termed the 'Rawlsian Social Welfare Function', this method maximizes the payoff for the least-satisfied worldview.
  This method treats utilities for all worldviews as if they fall on the same scale, despite the fact that some worldviews see more avenues for value than others.
  The number of parliamentarians assigned to each worldview doesn't matter because the least satisfied parliamentarian is decisive.`,
};

export const AllocationDetailsPanel = ({
  allocationStrategy,
}: {
  allocationStrategy: AllocationStrategy;
}) => {
  if (typeof allocationStrategy == "undefined") {
    return (
      <Container>
        <h1>Allocation Strategies</h1>
        <p>
          Each parliamentarian ranks projects based on the worldview they
          represent. Then, there are several ways of deriving an allocation from
          the preferences of the members of the parliament. As you change the
          derivation method, you’ll see the allocation change accordingly.
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
            Click on an allocation method to see a description of that method
            and use it to get a verdict for your parliament.
          </div>
        </Row>
        <br />
        <Row>
          <img
            src={allocationSelectionPng}
            style={{
              margin: "auto",
              width: "400px",
              border: "2px solid grey",
              boxShadow: "3px 3px 2px lightgrey",
            }}
          />
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Title>{STRATEGY_NAMES[allocationStrategy]}</Title>
      <LabelledTitle>Method Description</LabelledTitle>
      <Description>{STRATEGY_DESCRIPTIONS[allocationStrategy]}</Description>
      <LabelledTitle>
        Results &nbsp;
        <StrategyOptionControls />
      </LabelledTitle>
      <AllocationResultsBreakdown />
    </Container>
  );
};
