import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 3em;
  z-index: 3;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 20rem;
  min-width: 250px;
  border-spacing: 0.3em;
  font-size: var(--text-size);
  padding: 0.3em 1em;
  svg:hover {
    fill: var(--rp-yellow);
  }
  &:nth-of-type(2n + 1) {
    background: rgba(0, 0, 0, 0.05);
  }
`;
export const MemberControls = styled.div`
  display: grid;
  margin-left: 2rem;
  grid-template-columns: 6.5rem 2rem 2rem;
`;

export const ButtonContainer = styled.span`
  display: inline-block;
  cursor: pointer;
`;

export const Label = styled.span`
  display: flex;

  align-items: center;
  min-width: 12rem;
`;

export const CircleSVG = styled.svg`
  width: var(--text-size);
  height: var(--text-size);
  margin-right: 4px;
  display: inline-block;
`;
