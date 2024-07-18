import styled, { css } from "styled-components";

export { Title } from "../../styles/fonts";

export const ListBox = styled.div`
  @media (min-width: 800px) {
    display: grid;
  }
  grid-template-columns: 25rem auto;
`;

export const PanelHolder = styled.div`
  background: var(--white);
  @media (min-width: 800px) {
    border-left: 1px solid var(--grey);
  }
`;

export const FormTitle = styled.h3``;

export const ListContainer = styled.div``;
export const Description = styled.p`
  margin: 1em;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 800px) {
    height: 100%;
    min-height: 100vh;
  }
  background: var(--lightgrey);
`;

export const Item = styled.div<{
  $selected?: boolean;
  $disabled?: boolean;
  $deactivated?: boolean | undefined;
}>`
  background: var(--rp-light-blue);
  position: relative;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1em;
  cursor: pointer;
  ${(p) =>
    p.$deactivated &&
    css`
      background: var(--dark-grey);
      color: var(--grey);
      &:visited,
      &:hover {
        color: var(--grey);
      }
    `}
  ${(p) =>
    p.$selected &&
    css`
      background: var(--rp-yellow);
      color: var(--black);
      &:visited,
      &:hover {
        color: var(--black);
      }
      @media (min-width: 800px) {
        &::after {
          position: absolute;
          display: block;
          left: calc(100% - 20px);
          top: 5px;
          transform: rotate(45deg);
          transform-origin: 50% 50%;
          width: 42px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          height: 80%;
          background: var(--rp-yellow);
          border-right: 1px solid var(--grey);
          border-top: 1px solid var(--grey);
          content: "";
        }
      }
    `}
  svg {
    font-size: 1em;
    @media (min-width: 1000px) {
      font-size: 1.25em;
    }
  }
`;

export const CheckboxHolder = styled.div`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  z-index: 5;
`;
