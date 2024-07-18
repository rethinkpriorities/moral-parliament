import { NavLink } from "react-router-dom";
import React from "react";
import { Button } from "../styles/buttons";
import { FaAngleRight } from "react-icons/fa6";
import styled, { keyframes } from "styled-components";

const moveRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(50px);
    opacity: 0;
  }
`;

const MovingAngle = styled.div`
  position: absolute;
  opacity: 0;
  left: 0;
  animation: ${moveRight} 2s infinite;
  animation-timing-function: linear;
  &:nth-of-type(2) {
    animation-delay: 0.5s;
  }
  &:nth-of-type(3) {
    animation-delay: 1s;
  }
  &:nth-of-type(4) {
    animation-delay: 1.5s;
  }
`;

const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 10rem;
  font-weight: bold;
  &:hover {
    max-width: 10rem;
  }
  box-shadow: 5px 5px 20px grey;
  z-index: 1000;
`;

export const NextPageButton = ({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) => {
  return (
    <FloatingButton as={NavLink} to={path}>
      {children}
      <span style={{ position: "relative" }}>
        <MovingAngle size={25} as={FaAngleRight} />
        <MovingAngle size={25} as={FaAngleRight} />
        <MovingAngle size={25} as={FaAngleRight} />
        <MovingAngle size={25} as={FaAngleRight} />
      </span>
    </FloatingButton>
  );
};
