import React from "react";
import { Container } from "./BackgroundContent.styles";

export const BackgroundContent = ({
  children,
  fullWidth,
}: {
  children: React.ReactNode;
  fullWidth: boolean;
}) => {
  return <Container $fullWidth={fullWidth}>{children}</Container>;
};
