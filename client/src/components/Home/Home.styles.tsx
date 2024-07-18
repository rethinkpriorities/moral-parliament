import styled from "styled-components";

import { BoxPanel } from "../../styles/panel";
import { Title as DefaultTitle } from "../../styles/fonts";

export const P = styled.p`
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 1.2rem;
`;
export const Emph = styled.h3`
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 1.5rem;
  color: var(--rp-blue);
`;
export const LogoImg = styled.img`
  width: 15rem;
`;
export const Container = styled(BoxPanel)``;
export const Title = styled(DefaultTitle)`
  font-size: 2.5em;
  margin: 0;
  margin-top: 2rem;
  margin-bottom: 2em;
`;

export const GraphicContainer = styled.div`
  transform: scale(0.4);
  margin-top: -10%;
  margin-bottom: -10%;
`;
