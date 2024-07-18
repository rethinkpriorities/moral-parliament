import styled from "styled-components";

export const StepList = styled.ol`
  list-style: none;
  padding-left: 2em;
  li {
    display: flex;
    margin-bottom: 0.7em;
  }
  li span {
    margin-left: 1em;
    display: block;
  }
`;

export const StepNumber = styled.div<{ $blue?: boolean }>`
  font-size: 0.9rem;
  width: 1.2rem;
  margin-top: 0.3em;
  max-width: 1.2rem;
  height: 1.2rem;
  display: flex;
  background: ${(p) => (p.$blue ? "blue" : "var(--rp-red)")};
  border-radius: 100%;
  color: white;
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
