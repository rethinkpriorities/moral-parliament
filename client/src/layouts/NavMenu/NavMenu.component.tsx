import {
  GiHouse,
  GiCongress,
  GiWireframeGlobe,
  GiAbacus,
  GiCargoCrane,
  GiSave,
} from "react-icons/gi";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import {
  Container,
  MenuItem,
  Flipout,
  Outtext,
  WalkthroughSign,
} from "./NavMenu.styles";

export const NavMenu = ({
  walkthrough,
}: {
  walkthrough: Walkthrough | null;
}) => {
  const nextStep =
    walkthrough &&
    (Object.keys(walkthrough) as (keyof Walkthrough)[]).find(
      (k) => !walkthrough[k]
    );
  return (
    <Container>
      <MenuItem as={NavLink} to={"/" + location.search}>
        <Flipout>
          <GiHouse />
          <Outtext>Home</Outtext>
        </Flipout>
      </MenuItem>
      <MenuItem as={NavLink} to={"/projects" + location.search}>
        {walkthrough && (
          <WalkthroughSign
            $completed={walkthrough.projects}
            $onDeck={nextStep === "projects"}
          >
            {walkthrough.projects ? <FaCheck /> : 1}{" "}
          </WalkthroughSign>
        )}
        <Flipout>
          <GiCargoCrane />
          <Outtext>Projects</Outtext>
        </Flipout>
      </MenuItem>
      <MenuItem as={NavLink} to={"/worldviews" + location.search}>
        {walkthrough && (
          <WalkthroughSign
            $completed={walkthrough.worldviews}
            $onDeck={nextStep === "worldviews"}
          >
            {walkthrough.worldviews ? <FaCheck /> : 2}{" "}
          </WalkthroughSign>
        )}
        <Flipout>
          <GiWireframeGlobe />
          <Outtext>Worldviews</Outtext>
        </Flipout>
      </MenuItem>
      <MenuItem as={NavLink} to={"/parliament" + location.search}>
        {walkthrough && (
          <WalkthroughSign
            $completed={walkthrough.parliament}
            $onDeck={nextStep === "parliament"}
          >
            {walkthrough.parliament ? <FaCheck /> : 3}{" "}
          </WalkthroughSign>
        )}
        <Flipout>
          <GiCongress />
          <Outtext>Parliament</Outtext>
        </Flipout>
      </MenuItem>
      <MenuItem as={NavLink} to={"/allocations" + location.search}>
        {walkthrough && (
          <WalkthroughSign
            $completed={walkthrough.allocations}
            $onDeck={nextStep === "allocations"}
          >
            {walkthrough.allocations ? <FaCheck /> : 4}{" "}
          </WalkthroughSign>
        )}
        <Flipout>
          <GiAbacus />
          <Outtext>Allocations</Outtext>
        </Flipout>
      </MenuItem>
      <MenuItem as={NavLink} to={"/save_and_load" + location.search}>
        <Flipout>
          <GiSave />
          <Outtext>Save/Load</Outtext>
        </Flipout>
      </MenuItem>
    </Container>
  );
};
