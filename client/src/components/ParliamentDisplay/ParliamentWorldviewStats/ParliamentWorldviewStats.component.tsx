import { BiSolidUserMinus, BiSolidUserPlus } from "react-icons/bi";

import {
  Container,
  CircleSVG,
  ButtonContainer,
  MemberControls,
  Grid,
  Label,
} from "./ParliamentWorldviewStats.styles";

interface ParliamentWorldviewStatsProps {
  parliament: Parliament;
  worldviews: Worldview[];
  removeWorldview: (id: number) => void;
  addWorldview: (id: number) => void;
}

export const ParliamentWorldviewStats = ({
  worldviews,
  parliament,
  removeWorldview,
  addWorldview,
}: ParliamentWorldviewStatsProps) => {
  return (
    <Container>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "normal",
          textDecoration: "underline",
        }}
      >
        <b>{parliament.members.length}</b> Parliamentarians
      </h2>
      {worldviews.map((w) => {
        if (parliament.members.every((p) => p.worldviewId !== w.id))
          return null;
        return (
          <Grid key={w.id}>
            <Label>
              <CircleSVG
                viewBox="0 0 10 10"
                style={{ minWidth: "2rem", minHeight: "2rem" }}
              >
                <circle
                  strokeWidth="1"
                  stroke="grey"
                  fill={w.fill}
                  cx="5"
                  cy="5"
                  r={"4"}
                />
              </CircleSVG>
              {w.name}
            </Label>
            <MemberControls>
              {parliament.members.filter((m) => m.worldviewId === w.id).length}(
              {Math.floor(
                (parliament.members.filter((m) => m.worldviewId === w.id)
                  .length *
                  100.0) /
                  parliament.members.length
              )}
              %)
              <ButtonContainer onClick={() => removeWorldview(w.id)}>
                <BiSolidUserMinus />
              </ButtonContainer>
              <ButtonContainer
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addWorldview(w.id);
                }}
              >
                <BiSolidUserPlus />
              </ButtonContainer>
            </MemberControls>
          </Grid>
        );
      })}
    </Container>
  );
};
