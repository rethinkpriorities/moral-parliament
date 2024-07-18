import React from "react";
import { HiOutlinePencil, HiPencil } from "react-icons/hi";
import { FaUndo } from "react-icons/fa";

import { InfoTag } from "../../InfoTag";
import {
  evaluate,
  evaluatePreRisk,
} from "../../../utils/projectWorldviewEvaluator";

import { EvaluateText } from "./EvaluateText.component";
import {
  InputContainer,
  InputSetContainer,
  Input,
  InputIcon,
  BlockValue,
  ToggleIcon,
} from "./WorldviewDetailsPanel.styles";

export const EditableEvaluation = ({
  project,
  worldview,
  updateWorldview,
}: {
  project: Project;
  worldview: Worldview;
  updateWorldview: (arg0: [number, number][]) => void;
}) => {
  const raw = evaluate(project, worldview).toFixed(2);
  const preRiskValue = evaluatePreRisk(project, worldview);
  const evaluated = evaluate(project, worldview, {
    ignoreStipulated: true,
  }).toFixed(2);
  const [edit, setEdit] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [editableValue, setEditableValue] = React.useState(raw);
  const toggleEdit = () => {
    if (edit) {
      const newStipulatedValues = [...worldview.stipulatedValues].filter(
        (s) => s[0] !== project.id
      );
      if (editableValue !== evaluated) {
        newStipulatedValues.push([project.id, parseFloat(editableValue)]);
      }
      updateWorldview(newStipulatedValues);
    }
    setEdit(!edit);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  return (
    <InputSetContainer onBlur={() => toggleEdit()}>
      {edit ? (
        <InputContainer>
          <Input
            onChange={(e) => setEditableValue(e.target.value)}
            value={editableValue}
            ref={inputRef}
          />
          {raw !== evaluated && (
            <InputIcon
              as={FaUndo}
              onMouseDown={() => {
                setEditableValue(evaluated);
              }}
            />
          )}
        </InputContainer>
      ) : (
        <BlockValue
          style={{
            color: raw !== evaluated ? "var(--red)" : "",
          }}
        >
          {raw}
        </BlockValue>
      )}
      <ToggleIcon onClick={toggleEdit} as={edit ? HiOutlinePencil : HiPencil} />
      <InfoTag>
        <EvaluateText
          raw={raw}
          preRiskValue={preRiskValue}
          project={project}
          worldview={worldview}
        />
      </InfoTag>
    </InputSetContainer>
  );
};
