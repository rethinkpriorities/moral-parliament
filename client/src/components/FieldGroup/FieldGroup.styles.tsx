import styled from "styled-components";

export { Label } from "../../styles/fonts";

export const InputIcon = styled.div`
  position: absolute;
  right: 1.25em;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  cursor: pointer;
`;

export const Input = styled.input<{ $locked?: boolean }>`
  width: 6em;
  padding: 0.4em;
  padding-right: 1em;
  ${(p) => p.$locked && "background: var(--grey);"}
`;

export const IconContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;
  svg {
    position: absolute;
    right: 0.3em;
    top: -0.8em;
  }
`;

export const Warning = styled.span`
  color: var(--red);
`;
