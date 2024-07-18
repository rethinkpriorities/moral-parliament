import logo from "./rp.logo.full.png";
import { ParliamentGraphic } from "../ParliamentGraphic";
import { DEFAULT_PARLIAMENT } from "../../stores/Parliaments.dict";
import { Row } from "../../styles/containers";
import { WalkthroughButton } from "./WalkthroughButton";

import { ParliamentSets } from "./ParliamentSets";
import { ProjectSets } from "./ProjectSets";
import {
  Title,
  LogoImg,
  Container,
  GraphicContainer,
  P,
  Emph,
} from "./Home.styles";

export const Home = () => {
  return (
    <Container>
      <LogoImg src={logo} />
      <Title>Moral Parliament</Title>
      <Emph>
        How should you allocate philanthropic resources in the face of moral
        uncertainty?{" "}
      </Emph>
      <P>
        This tool allows you to explore a parliamentary approach that attempts
        to answer that question. It assumes that the views over which we’re
        uncertain can be represented as parties in a moral parliament, where the
        size of each party reflects our confidence in the corresponding view.
        Parliaments have been proposed to provide a useful framework for
        decision-making under normative uncertainty. This tool illustrates some
        upshots of those analogies.
      </P>
      <GraphicContainer>
        <ParliamentGraphic parliamentToDisplay={DEFAULT_PARLIAMENT} />
      </GraphicContainer>
      <P>
        <strong>If you're new to the tool, we recommend you start by clicking on the 
        "Walkthrough" button below. </strong> It will create a fresh new parliament 
        and guide you through the tool.
      </P>
      <WalkthroughButton />
      <br />
      <hr />
      <br />
      <h2>Suggested Configurations</h2>
      <P>Alternatively, we offer several pre-built sets of projects and parliaments.</P>

      <Row $wrap>
        <ParliamentSets />
        <ProjectSets />
      </Row>
      <P>
       <em> Note: GHD means Global Health and Development, and GCR means Global
        Catastrophic Risks.</em> 
      </P>
      <P>
        The Moral Parliament tool is highly configurable. Beyond the presets above, 
        you can choose a set of moral views (we call them
        “worldviews”), a set of projects (i.e., initiatives
        to which you might allocate resources), fully customize both sets, and click 
        on the "Allocations” tab on the left. 
        The results will be a distribution of resources across
        the projects based on the selected metanormative you select.
        {/* For more information, check out [link][this */}
        {/* introduction to the tool] or [link][the full documentation]. */}
      </P>
    </Container>
  );
};
