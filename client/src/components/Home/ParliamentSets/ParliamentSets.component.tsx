import {
  ANIMAL_FRIENDLY_PARLIAMENT,
  DEFAULT_PARLIAMENT,
  CONSEQUENTIALIST_PARLIAMENT,
  GCR_FRIENDLY_PARLIAMENT,
  GHD_FRIENDLY_PARLIAMENT,
} from "../../../stores/Parliaments.dict";
import { Button, ButtonList } from "../../../styles/buttons";

export const ParliamentSets = ({
  setParliament,
  parliament,
}: {
  setParliament: (arg0: Parliament) => void;
  parliament: Parliament;
}) => {
  return (
    <>
      <ButtonList>
        <h3>Parliament Compositions</h3>
        {(
          [
            [DEFAULT_PARLIAMENT, "Equal Representation"],
            [CONSEQUENTIALIST_PARLIAMENT, "Consequentialist"],
            [GHD_FRIENDLY_PARLIAMENT, "GHD-Friendly"],
            [ANIMAL_FRIENDLY_PARLIAMENT, "Animal-Friendly"],
            [GCR_FRIENDLY_PARLIAMENT, "GCR-Friendly"],
          ] as [Parliament, string][]
        ).map(([newParliament, label]) => (
          <Button
            key={label}
            $selected={parliament === newParliament}
            onClick={() => {
              setParliament(newParliament);
            }}
          >
            {label}
          </Button>
        ))}
        {![
          DEFAULT_PARLIAMENT,
          CONSEQUENTIALIST_PARLIAMENT,
          ANIMAL_FRIENDLY_PARLIAMENT,
          GCR_FRIENDLY_PARLIAMENT,
          GHD_FRIENDLY_PARLIAMENT,
        ].includes(parliament) && (
          <Button $selected={true} disabled={true}>
            Custom
          </Button>
        )}
      </ButtonList>
    </>
  );
};
