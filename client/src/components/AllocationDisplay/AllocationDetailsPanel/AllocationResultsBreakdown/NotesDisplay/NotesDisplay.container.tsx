import { useAtomValue } from "jotai";

import { worldviewsAtom } from "../../../../../stores/Worldview.store";
import { projectsAtom } from "../../../../../stores/Project.store";

import { NotesDisplay } from "./NotesDisplay.component";

export default ({ notes }: { notes: Note }) => {
  const worldviews = useAtomValue(worldviewsAtom);
  const projects = useAtomValue(projectsAtom);
  return (
    <NotesDisplay notes={notes} worldviews={worldviews} projects={projects} />
  );
};
