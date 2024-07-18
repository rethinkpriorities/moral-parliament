export const RiskDistributionWaffleChart: React.FC<{
  probabilities: { label: string; value: number }[];
  height?: number;
  width?: number;
  colorScheme?: string;
}> = ({ probabilities }) => {
  try {
    if (!probabilities) return null;

    const outcomeOrder = ["-10X", "-X", "0", "X", "10X"];
    const sortedProbabilities = [...probabilities].sort((a, b) => {
      return outcomeOrder.indexOf(a.label) - outcomeOrder.indexOf(b.label);
    });
    const rows = 2;
    const cols = 50;
    const spacing = 9 / 8;
    let bins = [];
    const mx10 = Array(
      Math.round(Math.min(1, sortedProbabilities[0].value) * 100)
    );
    mx10.fill("var(--red)");
    const mx1 = Array(
      Math.round(Math.min(1, sortedProbabilities[1].value) * 100)
    );
    mx1.fill("var(--light-red)");
    const x0 = Array(
      Math.round(Math.min(1, sortedProbabilities[2].value) * 100)
    );
    x0.fill("lightgrey");
    const x1 = Array(
      Math.round(Math.min(1, sortedProbabilities[3].value) * 100)
    );
    x1.fill("lightblue");
    const x10 = Array(
      Math.round(Math.min(1, sortedProbabilities[4].value) * 100)
    );
    x10.fill("var(--rp-blue)");
    bins = [...mx10, ...mx1, ...x0, ...x1, ...x10];

    const length = 100;

    return (
      <>
        <svg
          style={{ width: "100%" }}
          viewBox={`0 0 ${cols * length * spacing} ${rows * length * spacing}`}
        >
          <g>
            {bins.map((bin, idx) => {
              const y = (idx % rows) * (length * spacing);
              const x = Math.floor(idx / rows) * (length * spacing);
              let color = bin;
              return (
                <rect
                  key={`${x} ${y}`}
                  width={String(length)}
                  height={String(length)}
                  x={String(x)}
                  y={String(y)}
                  fill={color}
                />
              );
            })}
          </g>
        </svg>
        <div className="">
          &nbsp;
          <svg height="1em" width="1em" className="">
            <rect
              height="50"
              stroke="darkred"
              strokeWidth="0.5"
              width="50"
              fill={"var(--red)"}
            />
          </svg>
          -10X &nbsp;
          <svg height="1em" width="1em" className="">
            <rect
              height="50"
              width="50"
              stroke="grey"
              strokeWidth="0.5"
              fill={"var(--light-red)"}
            />
          </svg>
          -1X &nbsp;
          <svg height="1em" width="1em" className="">
            <rect
              height="50"
              stroke="darkblue"
              strokeWidth="0.5"
              width="50"
              fill={"lightgrey"}
            />
          </svg>
          0 &nbsp;
          <svg height="1em" width="1em" className="">
            <rect
              height="50"
              stroke="darkblue"
              strokeWidth="0.5"
              width="50"
              fill={"lightblue"}
            />
          </svg>
          1X &nbsp;
          <svg height="1em" width="1em" className="">
            <rect
              height="50"
              stroke="darkblue"
              strokeWidth="0.5"
              width="50"
              fill={"var(--rp-blue)"}
            />
          </svg>
          10X
        </div>
      </>
    );
  } catch (e) {
    return null;
  }
};
