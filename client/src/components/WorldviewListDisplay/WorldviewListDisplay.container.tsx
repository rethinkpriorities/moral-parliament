import { useAtom, useAtomValue } from "jotai";
import { useParams } from "react-router-dom";
import { WorldviewListDisplay } from "./WorldviewListDisplay.component";
import { worldviewsAtom } from "../../stores/Worldview.store";
import { walkthroughAtom } from "../../stores/Walkthrough.store";
import { parliamentAtom } from "../../stores/Parliament.store";

export default () => {
  const worldviews = useAtomValue(worldviewsAtom);
  const worldviewId = useParams().worldviewId as string;
  const [parliament, setParliament] = useAtom(parliamentAtom);
  const [walkthrough, setWalkthrough] = useAtom(walkthroughAtom);
  const parliamentIncludesId = (id: number): boolean => {
    return parliament.members.some(
      (parliamentarian) => parliamentarian.worldviewId === id
    );
  };
  const toggleWorldviewInclusion = (id: number) => {
    const newParliament = {
      members: [...parliament.members],
    };
    if (newParliament.members.some((p) => p.worldviewId === id)) {
      newParliament.members = newParliament.members.filter(
        (p) => p.worldviewId !== id
      );
    } else {
      const maxId = (parliament: Parliament) =>
        parliament.members.map((p) => p.id).sort()[0];
      for (let i = 0; i < 3; i++) {
        newParliament.members.push({
          id: maxId(newParliament) + 1,
          worldviewId: id,
        });
      }
    }
    setWalkthrough(
      walkthrough && {
        ...walkthrough,
        worldviews: !!newParliament.members.length,
      }
    );
    setParliament(newParliament);
  };
  return (
    <WorldviewListDisplay
      selectedWorldviewId={parseInt(worldviewId)}
      parliamentIncludesId={parliamentIncludesId}
      toggleWorldviewInclusion={toggleWorldviewInclusion}
      worldviews={worldviews}
    />
  );
};
