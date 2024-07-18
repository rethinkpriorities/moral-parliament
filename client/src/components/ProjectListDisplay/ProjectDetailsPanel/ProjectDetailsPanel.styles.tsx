import styled from "styled-components";

export { FormTitle, Subtitle, Label } from "../../../styles/fonts";
import { BoxPanel } from "../../../styles/panel";

export const Description = styled.p``;
export const Title = styled.h1`
  font-size: 2rem;
  margin: auto;
`;
export const Container = styled(BoxPanel)`
  .react-tabs__tab--selected {
    background: var(--primary);
  }
`;
