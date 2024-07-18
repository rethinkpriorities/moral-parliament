import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContent = styled(FaSpinner)`
  font-size: 3em;
  animation: ${rotate} 1s linear infinite;
  animation-timing-function: steps(8, end);
`;

const SpinnerContainer = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Spinner = () => (
  <SpinnerContainer>
    <SpinnerContent />
  </SpinnerContainer>
);
