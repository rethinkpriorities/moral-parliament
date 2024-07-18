import { PROJECT_SUBSETS } from "../../../stores/Projects.dict";
import { Button, ButtonList } from "../../../styles/buttons";

export const ProjectSets = ({
  onSubsetSelect,
  selectedProjectGroupName,
}: {
  onSubsetSelect: (arg0: string | null) => void;
  selectedProjectGroupName: string | null;
}) => {
  return (
    <ButtonList>
      <h3>Project Sets</h3>
      {Object.keys(PROJECT_SUBSETS).map((name) => (
        <Button
          key={name}
          $selected={selectedProjectGroupName === name}
          onClick={() => onSubsetSelect(name)}
        >
          {name}
        </Button>
      ))}
      {!selectedProjectGroupName && (
        <Button
          key="custom"
          $selected={!selectedProjectGroupName}
          onClick={
            selectedProjectGroupName ? () => onSubsetSelect(null) : () => {}
          }
        >
          Custom
        </Button>
      )}
    </ButtonList>
  );
};
