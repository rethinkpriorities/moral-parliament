import styled from "styled-components";

export const CircleContainer = styled.svg`
  width: calc(3vw + 3vh);
  min-width: calc(3vw + 3vh);
  max-width: calc(3vw + 3vh);
  margin: 5px;
  @media (min-width: 1000px) {
    margin: 10px;
  }
  stroke: var(--dark-grey);
`;
