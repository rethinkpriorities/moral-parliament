import styled from "styled-components";
import {
  Row as DefaultRow,
  Column as DefaultColumn,
} from "../../styles/containers";
import { Button as DefaultButton } from "../../styles/buttons";

export const A = styled.a`
  color: var(--rp-blue);
`;
export const Container = styled.div`
  width: 100%;
  max-width: var(--content-width);
  padding: 5em;
`;
export const Row = styled(DefaultRow)`
  max-width: 50rem;
  margin: auto;
`;
export const Button = styled(DefaultButton)`
  margin: 0;
  width: 100%;
  max-width: 100%;
`;
export const Column = styled(DefaultColumn)`
  width: 22rem;
  margin: 3em;
`;
export const Label = styled.label`
  font-size: 1.2rem;
`;
export const Input = styled.input`
  padding: 1em;
  width: 100%;
  margin: 0;
`;
