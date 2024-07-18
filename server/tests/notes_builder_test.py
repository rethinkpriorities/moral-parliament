from allocate.note_builder import NoteBuilder


def test_notes_builder():
    notes = NoteBuilder()
    notes.table("test").define_headings(["my heading"])
    notes.table("test").add_row(["value 1"])
    notes.table("test").add_row(["value 2"])
    printed_table_obj = notes.print_notes({})["tables"]["test"]
    assert printed_table_obj
    assert printed_table_obj["headings"][0] == "my heading"
    assert printed_table_obj["rows"][0][0] == "value 1"
