import styled from "styled-components";
import { Title as DefaultTitle } from "../../../styles/fonts";
export { Subtitle, Label } from "../../../styles/fonts";
import { BoxPanel } from "../../../styles/panel";

export const CodeContainer = styled.div`
  background: var(--black);
  color: var(--white);
  padding: 1em;
  max-height: 60vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 4em 3em auto;
`;

export const Container = styled(BoxPanel)`
  table {
    width: 100%;
    th {
      text-align: left;
    }
  }
  input {
    padding-right: 1em;
  }
  .input {
    .info {
      margin-left: -1.2em;
      font-size: 1.2em;
      line-height: 0.8em;
      vertical-align: middle;
    }
  }
`;

export const Title = styled(DefaultTitle)`
  font-size: 2rem;
  margin: auto;
  text-align: center;
`;

export const MainTab = styled.span<{ $selected?: boolean }>`
  cursor: pointer;
  text-decoration: ${(p) => p.$selected && "underline"};
  font-size: 1rem;
  font-weight: bold;
`;

export const InputSetContainer = styled.div`
  height: 2em;
  display: flex;
  justify-content: start;
  align-items: center;
  .info {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
`;

export const ToggleIcon = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  z-index: 1;
  margin-right: 0.5em;
`;

export const InputContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 6em;
  height: 2em;
  & ~ ${ToggleIcon} {
    margin-left: -0.8em;
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  right: 1.25em;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: var(--rp-yellow);
  }
`;
export const Description = styled.p``;

export const Input = styled.input`
  width: 8em;
  padding: 0.4em;
  padding-right: 1em;
  margin-right: -4em;
`;

export const BlockValue = styled.div`
  width: 5em;
  display: inline-block;
  height: 2em;
  padding: 0.4em;
  padding-right: 1em;
`;
