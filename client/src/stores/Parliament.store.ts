import { atom } from "jotai";
import { DEFAULT_PARLIAMENT } from "./Parliaments.dict";

export const selectedParliamentarianIdAtom = atom<number | null>(null);
export const selectedParliamentarianAtom = atom((get) => {
  const parliament = get(parliamentAtom);
  const id = get(selectedParliamentarianIdAtom);
  return parliament.members.find((member) => member.id === id) || null;
});
export const parliamentAtom = atom<Parliament>(DEFAULT_PARLIAMENT);
