import { styled, css } from "styled-components";

export const Button = styled.button<{ $selected?: boolean; $small?: boolean }>`
  margin: 0.5em;
  background: var(--rp-blue);
  &:hover {
    background: var(--rp-dark-blue);
  }
  text-align: center;
  &,
  &:hover,
  &:visited {
    color: var(--white);
  ${(p) =>
    p.$small ??
    css`
      width: 50%;
      min-width: 18em;
      max-width: 80%;
      padding: 0.75em;
  @media (min-width: 1000px) {
    padding: 1em 2em;
    font-size: 1.2em;
  }
    `}
  cursor: pointer;
  border-radius: 0px;
  ${(p) =>
    p.$selected &&
    css`
      color: var(--black);
      background: var(--rp-yellow);
    `}
  ${(p) =>
    p.disabled &&
    css`
      background: var(--dark-grey);
      &:hover {
        background: var(--dark-grey);
      }
      cursor: not-allowed;
    `}
`;
export const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
