import { atom } from "jotai";
import { DEFAULT_WORLDVIEWS } from "./Worldview.list";

export const worldviewsAtom = atom<Worldview[]>(DEFAULT_WORLDVIEWS);
export const selectedWorldviewIdAtom = atom<number | undefined>(undefined);

export const selectedWorldviewAtom = atom((get) => {
  const worldviews = get(worldviewsAtom);
  const id = get(selectedWorldviewIdAtom);
  return worldviews.find((worldview) => worldview.id === id) || undefined;
});

