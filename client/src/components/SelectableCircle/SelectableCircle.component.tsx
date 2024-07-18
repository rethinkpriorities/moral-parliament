import { CircleContainer } from "./SelectableCircle.styles";

interface SelectableCircleProps {
  id?: number;
  fill?: string;
  cursor?: string;
  selected?: boolean;
  cross?: boolean;
  onClick?: (id: number | undefined) => void;
}
export const SelectableCircle = ({
  id,
  fill,
  onClick,
  selected,
  cursor,
  cross,
}: SelectableCircleProps) => {
  return (
    <CircleContainer
      $selected={selected}
      $cursor={cursor}
      viewBox="0 0 110 110"
    >
      <circle
        onClick={() => onClick && onClick(id)}
        strokeWidth="7"
        fill={fill}
        cx="55"
        cy="55"
        r={selected ? "50" : "40"}
      />
      {cross && <line x1="100" y1="10" x2="10" y2="100" stroke="black" />}
    </CircleContainer>
  );
};
