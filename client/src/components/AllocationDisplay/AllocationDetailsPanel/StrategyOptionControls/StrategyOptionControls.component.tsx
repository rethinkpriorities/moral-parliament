import React from "react";

import { InfoTag } from "../../../InfoTag";
import { Modal } from "../../../Modal";

import {
  Container,
  Label,
  SectionTitle,
  SettingsButton,
} from "./StrategyOptionControls.styles";

export const StrategyOptionControls = ({
  allocationOptions,
  allocationStrategy,
  setAllocationOptions,
}: {
  allocationStrategy: AllocationStrategy;
  allocationOptions: AllocationStrategyOptions;
  setAllocationOptions: (arg0: object) => object;
}) => {
  const [votingThreshold, setVotingThreshold] = React.useState(0.8);
  const [isOpen, setIsOpen] = React.useState(false);
  if (!isOpen) {
    return (
      <SettingsButton
        onClick={() => {
          setIsOpen(true);
        }}
        >
        Edit Settings
      </SettingsButton>
    );
  }
  if (isOpen) {
    return (
      <>
        <SettingsButton
          onClick={() => {
            setIsOpen(true);
          }}
          >
          Edit Settings
        </SettingsButton>
        <Modal
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <h3>Settings</h3>
          <Container>
            <SectionTitle>
              Diminishing Marginal Returns
              <InfoTag>
                <p>
                  The tool uses a background 'Utility' function that takes funding spent on a 
                  project as an input and returns the value obtained from that project.
                </p>
                <p>
                  By default, we assume that the project always goes up with more funding. But we also
                  assume that projects have diminishing returns. Together, this means that more funding increases the
                  value of a project, but at a decreasing rate. This rate is determined by the shape of the utility function.
                   We offer some alternatives:
                </p>
                <ul>
                  <li>
                    <b>To the Power of 0.1:</b> Raises the funding to the power of 0.1 to obtain value, which
                    produces a faster rate of diminishing marginal returns than the square root option. 
                  </li>
                  <br />
                  <li>
                    <b>Square Root:</b> A commonly used function with significant diminishing marginal returns at higher funding
                    levels. This is equivalent to raising funding to the power of 0.5.
                  </li>
                  <br />
                  <li>
                    <b>None:</b> Value increases perfectly linearly with funding. No diminishing returns at higher funding levels.
                  </li>
                </ul>
              </InfoTag>
            </SectionTitle>
            <Label>
              <input
                type="radio"
                value="none"
                onClick={() =>
                  setAllocationOptions({
                    ...allocationOptions,
                    utilityDiscount: "none",
                  })
                }
                checked={allocationOptions.utilityDiscount === "none"}
              />
              None (linear function){" "}
            </Label>
            <Label>
              <input
                type="radio"
                value="sqrt"
                onClick={() =>
                  setAllocationOptions({
                    ...allocationOptions,
                    utilityDiscount: "sqrt",
                    })
                }
                checked={allocationOptions.utilityDiscount === "sqrt"}
              />
              Some (square root)
            </Label>
            <Label>
              <input
                type="radio"
                value="to-one-tenth"
                onClick={() =>
                  setAllocationOptions({
                    ...allocationOptions,
                    utilityDiscount: "to-one-tenth",
                  })
                }
                checked={allocationOptions.utilityDiscount === "to-one-tenth"}
              />
              More (to the power of 0.1)
            </Label>
            {allocationStrategy === "approval-voting" && (
              <>
                <SectionTitle>
                  Voting Threshold
                  <InfoTag>
                    <p>
                      In a given round of voting, each parliamentarian casts
                      votes for allocations based on how well they perform
                      relative to the best allocation. This threshold determines
                      the minimum relative value. A candidate allocation must
                      secure an amount of value greater than that threshold x
                      the optimal allocation's value for a parliamentarian in
                      order for that parliamentarian to vote for it.
                    </p>
                  </InfoTag>
                </SectionTitle>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={votingThreshold * 100}
                  onChange={(e) =>
                    setVotingThreshold(parseFloat(e.target.value) / 100)
                  }
                  onMouseUp={(_e: React.MouseEvent) => {
                    setAllocationOptions({
                      ...allocationOptions,
                      votingThreshold: votingThreshold,
                    });
                  }}
                />
                {allocationOptions.votingThreshold * 100}
                <SectionTitle>
                  Voting Tiebreaker
                  <InfoTag>
                    <p>
                      If multiple allocations receive the same number of votes,
                      how will a tiebreaker be decided?
                    </p>
                    <ul>
                      <li>
                        <b>Increased Threshold:</b> Additional rounds of voting
                        will be run from the top vote-getters with a slight bump
                        to the threshold until only one remains.
                      </li>
                      <br />
                      <li>
                        <b>Most Utility:</b> The candidate allocation from among
                        the top vote-getters with the most utility is selected.
                      </li>
                      <br />
                      <li>
                        <b>None:</b> All top-voted results will be displayed.
                      </li>
                    </ul>
                  </InfoTag>
                </SectionTitle>
                <Label>
                  <input
                    type="radio"
                    value="none"
                    onClick={() =>
                      setAllocationOptions({
                        ...allocationOptions,
                        votingTiebreaker: "increased-threshold",
                      })
                    }
                    checked={
                      allocationOptions.votingTiebreaker ===
                      "increased-threshold"
                    }
                  />
                  Increased Threshold
                </Label>
                <Label>
                  <input
                    type="radio"
                    value="none"
                    onClick={() =>
                      setAllocationOptions({
                        ...allocationOptions,
                        votingTiebreaker: "most-utility",
                      })
                    }
                    checked={
                      allocationOptions.votingTiebreaker === "most-utility"
                    }
                  />
                  Most Utility
                </Label>
                <Label>
                  <input
                    type="radio"
                    value="none"
                    onClick={() =>
                      setAllocationOptions({
                        ...allocationOptions,
                        votingTiebreaker: "none",
                      })
                    }
                    checked={allocationOptions.votingTiebreaker === "none"}
                  />
                  None
                </Label>
              </>
            )}
            {allocationStrategy === "nash-bargaining" && (
              <>
                <SectionTitle>
                  Status Quo
                  <InfoTag>
                    <p>
                      Bargaining starts from a status quo -- an allocation which
                      any parliamentarian can fall back if they don't accept any
                      offers.
                    </p>
                  </InfoTag>
                </SectionTitle>
                <Label>
                  <input
                    type="radio"
                    value="none"
                    onClick={() =>
                      setAllocationOptions({
                        ...allocationOptions,
                        statusQuo: "merged",
                      })
                    }
                    checked={allocationOptions.statusQuo === "merged"}
                  />
                  Merged favorites
                </Label>
                <Label>
                  <input
                    type="radio"
                    value="none"
                    onClick={() =>
                      setAllocationOptions({
                        ...allocationOptions,
                        statusQuo: "zeros",
                      })
                    }
                    checked={allocationOptions.statusQuo === "zeros"}
                  />
                  Zeros
                </Label>
              </>
            )}
          </Container>
        </Modal>
      </>
    );
  }
};
