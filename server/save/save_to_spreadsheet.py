import gspread
from oauth2client.service_account import ServiceAccountCredentials

def create_google_sheet(csv_string, host, credentials_path='./credentials.json', sheet_name='Portfolio Project Data'):
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']

    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_path, scope)
    client = gspread.authorize(credentials)

    found_line = None
    for line in csv_string.split('\n'):
        if line.startswith('name|'):
            found_line = line
            break

    if found_line:
        sheet_name = found_line.split('|')[1]
    else:
        sheet_name = 'New Configuration'


    spreadsheet = client.create(sheet_name)
    spreadsheet.share('', perm_type='anyone', role='writer')
    #  spreadsheet.share('dshiller@rethinkpriorities.org', perm_type='user', role='writer')
    worksheet = spreadsheet.sheet1

    rows = csv_string.split('\n')

    # Insert new rows at the beginning of the data
    rows.insert(0, f'Sheet id|{spreadsheet.id}')
    rows.insert(0, f'url|=HYPERLINK("{host}?load_from_sheet={spreadsheet.id}", "Link to builder" )')

    cell_list = worksheet.range(f'A1:B{len(rows) + 10}')

    for i, row in enumerate(rows):
        cols = row.split('|')
        for j, col in enumerate(cols):
            cell_list[j + i*len(cols)].value = col
    worksheet.update_cells(cell_list, value_input_option='user_entered')


    return spreadsheet.id
