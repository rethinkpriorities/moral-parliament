import styled from "styled-components";

export const BoxPanel = styled.div`
  margin: 1em;
  width: 90%;
  max-width: min(var(--content-width), 90%);
  @media (min-width: 1000px) {
    width: 80%;
    padding: 2em 3em;
  }
  padding: 0em;
`;
