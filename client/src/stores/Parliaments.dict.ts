import { DEFAULT_WORLDVIEWS } from "./Worldview.list";

interface Parliamentarian {
  id: number;
  worldviewId: number;
}

type WorldviewCounts = Record<string, number>;

let idCounter = 0;
const nextId = () => {
  idCounter += 1;
  return idCounter;
};

const parliamentarianFactory = (wId: number): Parliamentarian => ({
  id: nextId(),
  worldviewId: wId,
});

const parliamentFactory = (worldviews: WorldviewCounts): Parliament => {
  const parliamentarians = Object.keys(worldviews).reduce(
    (acc: Parliamentarian[], k: string) => {
      const length = worldviews[k] || 0;
      const wId = DEFAULT_WORLDVIEWS.find((w: Worldview) => w.name === k)?.id!;
      return [
        ...acc,
        ...Array(length)
          .fill(0)
          .map(() => parliamentarianFactory(wId)),
      ] as Parliamentarian[];
    },
    []
  );
  return {
    members: parliamentarians,
  } as Parliament;
};

export const DEFAULT_PARLIAMENT: Parliament = parliamentFactory({
  "Total Welfarist Consequentialism": 2,
  "Total Utilitarianism": 2,
  "Total Negative Utilitarianism": 2,
  "Short-termist Utilitarianism": 2,
  "Person-Affecting Welfarist Consequentialism": 2,
  "Risk-Averse Welfarist Consequentialism": 2,
  "Rawlsian Contractarianism": 2,
  "Egalitarianism": 2,
  "Common Sense": 2,
  Kantianism: 2,
  Nietzscheanism: 2,
});

export const CONSEQUENTIALIST_PARLIAMENT: Parliament = parliamentFactory({
  "Total Welfarist Consequentialism": 3,
  "Total Utilitarianism": 2,
  "Total Negative Utilitarianism": 2,
  "Short-termist Welfarist Consequentialism": 3,
  "Person-Affecting Welfarist Consequentialism": 2,
  "Person-Affecting Utilitarianism": 2,
  "Risk-Averse Welfarist Consequentialism": 3,
  "Rawlsian Contractarianism": 0,
  "Egalitarianism": 0,
  "Common Sense": 0,
  Kantianism: 0,
  Nietzscheanism: 0,
});

export const ANIMAL_FRIENDLY_PARLIAMENT: Parliament = parliamentFactory({
  "Total Welfarist Consequentialism": 3,
  "Total Utilitarianism": 4,
  "Total Negative Utilitarianism": 4,
  "Short-termist Welfarist Consequentialism": 3,
  "Person-Affecting Welfarist Consequentialism": 1,
  "Person-Affecting Utilitarianism": 1,
  "Risk-Averse Welfarist Consequentialism": 3,
  "Rawlsian Contractarianism": 0,
  "Egalitarianism": 0,
  "Common Sense": 0,
  Kantianism: 0,
  Nietzscheanism: 0,
});

export const GCR_FRIENDLY_PARLIAMENT: Parliament = parliamentFactory({
  "Total Welfarist Consequentialism": 5,
  "Total Utilitarianism": 3,
  "Total Negative Utilitarianism": 3,
  "Short-termist Welfarist Consequentialism": 1,
  "Person-Affecting Welfarist Consequentialism": 0,
  "Person-Affecting Utilitarianism": 0,
  "Risk-Averse Welfarist Consequentialism": 1,
  "Rawlsian Contractarianism": 1,
  "Egalitarianism": 1,
  "Common Sense": 2,
  Kantianism: 1,
  Nietzscheanism: 3,
});

export const GHD_FRIENDLY_PARLIAMENT: Parliament = parliamentFactory({
  "Total Welfarist Consequentialism": 1,
  "Total Utilitarianism": 2,
  "Total Negative Utilitarianism": 3,
  "Short-termist Welfarist Consequentialism": 5,
  "Person-Affecting Welfarist Consequentialism": 3,
  "Person-Affecting Utilitarianism": 3,
  "Risk-Averse Welfarist Consequentialism": 4,
  "Rawlsian Contractarianism": 2,
  "Egalitarianism": 2,
  "Common Sense": 4,
  Kantianism: 1,
  Nietzscheanism: 0,
});
