import styled from "styled-components";

export const Progress = styled.div`
  position: relative;
  width: 20rem;
  height: 1.5rem;
  border: 2px solid var(--rp-blue);
  overflow: hidden;
  background: var(--lightgrey);
  @media screen and (max-width: 600px) {
    width: 10rem;
  }
`;

export const Bar = styled.div<{ $value: number; $subdued: boolean }>`
  position: absolute;
  left: ${(p) => p.$value}%;
  transform: translateX(-5px);
  width: ${(p) => (p.$subdued ? "3px" : "10px")};
  height: calc(1.5rem - 2px);
  background: ${(p) => (p.$subdued ? "var(--grey)" : "var(--rp-red)")};
`;
