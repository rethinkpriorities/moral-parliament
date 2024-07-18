import React from "react";
import { ParliamentWorldviewStats } from "./ParliamentWorldviewStats";
import { ParliamentGraphic } from "../ParliamentGraphic";
import { NextPageButton } from "../NextPageButton";
import {
  ParliamentContainer,
  ContentContainer,
  StatsContainer,
  Description,
  ParliamentScaler,
  Title,
} from "./ParliamentDisplay.styles";

interface ParliamentDisplayProps {
  parliament: Parliament;
  showNext: boolean;
}

export const ParliamentDisplay: React.FC<ParliamentDisplayProps> = ({
  parliament,
  showNext,
}) => {
  return (
    <ParliamentContainer>
      <StatsContainer>
        <br />
        <Title $noMargin>Moral Parliament</Title>
        <Description>
          The moral parliament is a representation of the variety of value
          systems that we give credence to. Each parliamentarian has a
          worldview. The relative number of parliamentarians for a worldview
          represents how confident we are in tha worldview.
        </Description>
        <ParliamentWorldviewStats />
      </StatsContainer>
      <ContentContainer>
        <ParliamentScaler $parliamentarianCount={parliament.members.length}>
          <ParliamentGraphic />
        </ParliamentScaler>
        <br />
        {showNext && (
          <NextPageButton path="/allocations">Next Step</NextPageButton>
        )}
      </ContentContainer>
    </ParliamentContainer>
  );
};
