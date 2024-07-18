import styled, { css } from "styled-components";

export const ChartContainer = styled.div<{ $thumbnail?: boolean }>`
  ${(p) =>
    p.$thumbnail &&
    css`
  border: 2px solid var(--grey);
      background: var(--lightgrey);
      box-shadow: 2px 2px var(--grey);
    `}
  max-width: var(--content-width);
`;
