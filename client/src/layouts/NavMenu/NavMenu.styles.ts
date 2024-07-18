import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--nav-menu-width);
  background: var(--primary);
  border-right: 1px solid var(--grey);
  display: flex;
  flex-direction: column;
  padding: 0.15rem;
  align-items: center;
  z-index: 1000;
`;

export const MenuItem = styled.div`
  margin: 0.25em;
  font-size: var(--nav-menu-font-size);
  cursor: pointer;
  color: var(--black);
  &.active {
    color: var(--white);
  }
  &:hover {
    color: var(--white);
  }
`;

export const Outtext = styled.div`
  display: none;
  position: absolute;
  background: pink;
  background: var(--primary);
  top: 7%;
  left: 130%;
  font-size: 0.7em;
  padding: 0em 0.4em;
  border: 1px solid var(--grey);
  animation: grow 0.2s forwards;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.2);

  @keyframes grow {
    from {
      transform: scaleX(0);
      transform-origin: left;
    }
    to {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

export const Flipout = styled.div`
  position: relative;
  &:hover {
    ${Outtext} {
      display: block;
    }
  }
`;
interface WalkthroughSignProps {
  $completed: boolean;
  $onDeck: boolean;
}

const animateKeyframes = keyframes`
  0% {
    background: var(--rp-red);
  }
  85% {
    background: var(--rp-red);
  }
  90% {
    background: var(--rp-yellow);
  }
  95% {
    background: var(--rp-red);
  }
  100% {
    background: var(--rp-yellow);
  }
`;
export const WalkthroughSign = styled.div<WalkthroughSignProps>`
  font-size: 0.9rem;
  position: absolute;
  right: 5px;
  background: ${(props) => {
    if (props.$completed) {
      return "var(--rp-yellow)";
    } else if (props.$onDeck) {
      return "blue";
    } else {
      return "var(--rp-red)";
    }
  }};
  border-radius: 100%;
  width: 1.2rem;
  height: 1.2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(p) =>
    p.$onDeck &&
    css`
      ${MenuItem}:not(.active) & {
        animation: ${animateKeyframes} 2s ease-in-out 0.1s infinite;
      }
    `}
`;
