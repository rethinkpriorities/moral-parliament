import styled from "styled-components";
import React from "react";

import { FaCheck } from "react-icons/fa";
const Box = styled.div<{ disabled?: boolean }>`
  background: white;
  width: 1em;
  height: 1em;
  border: 2px solid var(--dark-grey);
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

export const Checkmark = styled.span`
  color: var(--rp-red);
  height: 90%;
  width: 90%;
  position: absolute;
  top: 5%;
  line-height: 1em;
`;

export const Checkbox = ({
  checked,
  disabled,
  onClick,
}: {
  checked: boolean;
  disabled: boolean;
  onClick: (e?: React.MouseEvent) => void;
}) => {
  return (
    <Box onClick={onClick} disabled={disabled}>
      {checked && <Checkmark as={FaCheck} />}
    </Box>
  );
};
