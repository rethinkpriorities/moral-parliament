import { ListWithForm } from "../ListWithForm";

import { WorldviewDetailsPanel } from "./WorldviewDetailsPanel";

interface WorldviewListDisplayProps {
  worldviews: Worldview[];
  selectedWorldviewId?: number;
  parliamentIncludesId: (arg0: number) => boolean;
  toggleWorldviewInclusion: (arg0: number) => void;
}

export const WorldviewListDisplay = ({
  worldviews,
  selectedWorldviewId,
  parliamentIncludesId,
  toggleWorldviewInclusion,
}: WorldviewListDisplayProps) => {
  return (
    <ListWithForm
      title="Worldviews"
      description="Worldviews are value systems used to create relative preferential orderings of projects. They are represented by parties in the moral parliament. Each parliamentarian subscribes to some worldview."
      items={worldviews.map((w) => ({
        selected: w.id === selectedWorldviewId,
        href: `/worldviews/${w.id}`,
        text: w.name,
        checkboxValue: parliamentIncludesId(w.id),
        onCheckboxClick: () => toggleWorldviewInclusion(w.id),
      }))}
      panel={<WorldviewDetailsPanel />}
      href="/worldviews"
      hrefLink="Usage Overview."
    />
  );
};
