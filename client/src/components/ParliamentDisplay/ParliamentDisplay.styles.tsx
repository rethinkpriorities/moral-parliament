import styled, { css } from "styled-components";
export { Title } from "../../styles/fonts";

export const Description = styled.p`
  margin: 1em;
`;
export const StatsContainer = styled.div`
  margin: auto;
  @media (min-width: 800px) {
    background: var(--lightgrey);
    height: 100%;
  }
`;

export const ParliamentContainer = styled.div`
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 25rem calc(100% - 25rem);
    height: 100vh;
    background: var(--lightgrey);
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80vh;
  position: relative;
  align-items: stretch;
`;

export const ContentContainer = styled.div`
  display: none;
  overflow: hidden;
  @media (min-width: 800px) {
    background: var(--white);
    border-left: 1px solid var(--grey);
    display: flex;
  }
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  margin: auto;
`;
export const ParliamentScaler = styled.div<{ $parliamentarianCount: number }>`
  ${(p) => {
    if (p.$parliamentarianCount > 30) {
      return css`
        transform: scale(0.65);
        transform-origin: 50% 50%;
        @media (max-width: 1200px) {
          transform: scale(0.35);
          transform-origin: 50% 50%;
        }
      `;
    }
    if (p.$parliamentarianCount > 20) {
      return css`
        transform: scale(0.75);
        transform-origin: 50% 50%;
        @media (max-width: 1200px) {
          transform: scale(0.35);
          transform-origin: 50% 50%;
        }
      `;
    }
    if (p.$parliamentarianCount > 10) {
      return css`
        transform: scale(0.85);
        transform-origin: 50% 50%;
        @media (max-width: 1200px) {
          transform: scale(0.5);
          transform-origin: 50% 50%;
        }
      `;
    }
  }}
`;
