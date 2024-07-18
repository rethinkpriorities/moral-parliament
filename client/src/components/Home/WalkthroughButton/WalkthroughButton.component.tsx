import { NavLink } from "react-router-dom";

import { Button } from "../../../styles/buttons";
import { Row } from "../../../styles/containers";

export const WalkthroughButton = ({
  startWalkthrough,
}: {
  startWalkthrough: () => void;
}) => {
  return (
    <>
      <Row $center>
        <Button as={NavLink} to={"/projects"} onClick={startWalkthrough}>
          Start Walkthrough
        </Button>
      </Row>
      <br />
    </>
  );
};
