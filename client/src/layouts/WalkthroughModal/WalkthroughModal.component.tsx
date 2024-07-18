import { useState } from "react";
import { Modal } from "../../components/Modal";
import { Button } from "../../styles/buttons";
import { StepList, StepNumber } from "./WalkthroughModal.styles";

export const WalkthroughModal = ({
  walkthrough,
}: {
  walkthrough: Walkthrough;
}) => {
  const [showModal, setShowModal] = useState(true);
  if (!walkthrough || !showModal) return null;
  return (
    <Modal onClose={() => setShowModal(false)}>
      <p>
        You have four tabs on the left numbered for the steps you should follow:
      </p>
      <StepList>
        <li>
          <StepNumber $blue>1</StepNumber>
          <span>
            On the <strong>Projects tab</strong>, select some projects by
            checking boxes. You can also click on each one and customize their
            settings.
          </span>
        </li>
        <li>
          <StepNumber>2</StepNumber>
          <span>
            On the <strong>Worldviews tab</strong>, select some worldviews to
            include in the parliament.
          </span>
        </li>
        <li>
          <StepNumber>3</StepNumber>
          <span>
            On the <strong>Parliament tab</strong>, add or remove
            parliamentarians.
          </span>
        </li>
        <li>
          <StepNumber>4</StepNumber>
          <span>
            On the <strong>Allocations tab</strong>, select a metanormative
            method and see the results it gives.
          </span>
        </li>
      </StepList>
      <p>
        Once you're comfortable with the basics, you can make changes to the
        parliament in any order you'd like. We offer default sets of projects
        and parliament compositions in the Home tab.
      </p>
      <br />
      <Button onClick={() => setShowModal(false)}>Got it</Button>
    </Modal>
  );
};
