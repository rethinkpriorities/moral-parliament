import json
import re


class Table:
    def __init__(self):
        self.headings = []
        self.rows = []

    def define_headings(self, new_headings):
        self.headings = new_headings
        return self

    def add_row(self, new_row):
        self.rows.append(new_row)
        return self

    def print_table(self):
        return {"headings": self.headings, "rows": self.rows}


class NoteBuilder:
    def __init__(self):
        self.notes = {"tables": {}}

    def table(self, table_name):
        if table_name in self.notes["tables"]:
            return self.notes["tables"][table_name]
        else:
            new_table = Table()
            self.notes["tables"][table_name] = new_table
            return new_table

    def print_notes(self, conversion_dict):
        notes_obj = {"tables": {}}
        for table_name, table in self.notes["tables"].items():
            notes_obj["tables"][table_name] = table.print_table()
        json_str = json.dumps(notes_obj)

        for key, value in conversion_dict.items():
            json_str = re.sub(
                r"server_project_id:{}(?=\D|\Z)".format(re.escape(str(key))),
                "projectId:{}".format(value),
                json_str,
            )

        notes_obj = json.loads(json_str)
        return notes_obj
