import { useAtomValue } from "jotai";

import { parliamentAtom } from "../../stores/Parliament.store";
import { worldviewsAtom } from "../../stores/Worldview.store";

import { ParliamentGraphic } from "./ParliamentGraphic.component";

export default ({
  parliamentToDisplay,
}: {
  parliamentToDisplay?: Parliament;
}) => {
  const parliament = useAtomValue(parliamentAtom);
  const worldviews = useAtomValue(worldviewsAtom);
  return (
    <ParliamentGraphic
      parliament={parliamentToDisplay ?? parliament}
      worldviews={worldviews}
    />
  );
};
