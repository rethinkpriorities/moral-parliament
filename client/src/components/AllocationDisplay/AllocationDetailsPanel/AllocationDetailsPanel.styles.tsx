import styled from "styled-components";

export { Title, Subtitle, LabelledTitle, Label } from "../../../styles/fonts";

export const Container = styled.div`
  background: var(--white);
  padding: 3em;
  width: var(--content-width);
  max-width: 90%;
`;

export const Description = styled.div`
  max-width: var(--content-width);
  max-width: 90%;
`;

export const ListContainer = styled.div`
  ol ol {
    list-style: lower-latin;
  }
  li {
    margin-bottom: 0.75em;
  }
`;
