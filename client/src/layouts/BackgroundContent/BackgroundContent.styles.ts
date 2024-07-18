import styled from "styled-components";

export const Container = styled.div`
  margin-left: var(--nav-menu-width);
  width: calc(100% - var(--nav-menu-width));
  @media (max-width: 1000px) {
    margin-left: var(--nav-menu-width);
  }
  flex-grow: 1;
`;
