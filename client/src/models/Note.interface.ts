interface Note {
  tables: NoteTable[];
}

interface NoteTable {
  headings: string[];
  rows: string[][];
}
