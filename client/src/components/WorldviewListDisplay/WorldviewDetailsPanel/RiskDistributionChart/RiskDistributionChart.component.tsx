import { discount } from "../../../../utils/projectWorldviewEvaluator";

const redToGreyColors: string[] = [
  "#FF0000",
  "#FF1111",
  "#FF3333",
  "#FF5555",
  "#FF6666",
  "#FF8888",
  "#FF9999",
  "#FFCCCC",
  "#FFE5E5",
  "#F2F2F2",
];

const greyToBlueColors: string[] = [
  "#ddddFF",
  "#bbbbFF",
  "#9999FF",
  "#8888FF",
  "#7777FF",
  "#6666FF",
  "#5555FF",
  "#4444FF",
  "#3333FF",
  "#2222FF",
  "#1111FF",
];
const colors: string[] = [...redToGreyColors, ...greyToBlueColors];

export const RiskDistributionChart = ({
  weightPos,
  weightNeg,
}: {
  weightPos: number;
  weightNeg: number;
}) => {
  const rows = 1;
  const cols = 21;
  const spacing = 5;
  const bins = Array(21)
    .fill(1)
    .map((_, idx) => -10 + 21 * (idx / 21))
    .map((v) =>
      v == 0 ? 1 : discount(2 ** Math.abs(v), v < 0 ? weightNeg : weightPos)
    );

  const length = 10;
  let xPos = 0;
  return (
    <>
      <svg
        style={{ width: "100%" }}
        viewBox={`0 0 ${cols * length + spacing * cols} ${rows * length + length * 2}`}
      >
        <g>
          {bins.map((bin, idx) => {
            const y = (length - length * Math.sqrt(bin)) / 2 + length;
            const curXPos = xPos;
            xPos = xPos + spacing + length;
            return (
              <>
                <rect
                  key={`${curXPos}-${y}`}
                  width={length * Math.sqrt(bin)}
                  height={length * Math.sqrt(bin)}
                  x={curXPos}
                  y={y}
                  fill={colors[idx]}
                  strokeWidth="0.5"
                  stroke="lightgrey"
                />

                <text x={curXPos} fontSize={5} y={30} fill="black">
                  {idx < 10 && "-"}{2 ** Math.abs(-10 + (21 * idx) / 21)}
                </text>
              </>
            );
          })}
        </g>
      </svg>
    </>
  );
};
