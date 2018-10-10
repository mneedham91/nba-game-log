from nba_api.stats.endpoints import commonallplayers
import pandas as pd
import requests

fields = ['PERSON_ID', 'DISPLAY_LAST_COMMA_FIRST', 'TEAM_ABBREVIATION']
url = 'https://nba-game-log.herokuapp.com/api/v1/player/'

# Download latest roster info and prepare it for comparison
latest_data = commonallplayers.CommonAllPlayers(is_only_current_season=1).get_data_frames()[0]
latest_data = latest_data[fields]
latest_data.columns = ['nba_id', 'name', 'team']
latest_data['last_name'] = ''
latest_data['first_name'] = ''


def first_name(x):
    try:
        return (x.split(',')[1])[1:]
    except IndexError:
        return ''


# Split name into first name, last name
latest_data['last_name'] = latest_data['name'].apply(lambda x: x.split(',')[0])
latest_data['first_name'] = latest_data['name'].apply(lambda x: first_name(x))
latest_data = latest_data.drop('name', 1).set_index('nba_id')

# Read in existing data
existing_data = pd.read_csv('players_export.csv').set_index('nba_id')

to_update = list()
to_add = list()

# Identify players whose data has changed
for nba_id in latest_data.index:
    try:
        if latest_data.loc[nba_id, 'team'] != existing_data.loc[nba_id, 'team']:
            to_update.append(nba_id)
    except KeyError:
        to_add.append(nba_id)


# Loop through changed players
for nba_id in to_update:
    # Send PUT API call using mongo _id
    _id = existing_data.loc[nba_id, '_id']
    new_team = latest_data.loc[nba_id, 'team']
    req = requests.put(url + _id, data={'team': new_team})
    print(nba_id, req.status_code)
    # Update team in data file
    existing_data.loc[nba_id, 'team'] = new_team

new_players_for_df = list()
for nba_id in to_add:
    # Send POST API call
    first_name = latest_data.loc[nba_id, 'first_name']
    last_name = latest_data.loc[nba_id, 'last_name']
    team = latest_data.loc[nba_id, 'team']
    payload = {
        'first_name': first_name,
        'last_name': last_name,
        'team': team,
        'nba_id': nba_id
    }
    req = requests.post(url, data=payload)
    print(nba_id, req.status_code)
    payload['_id'] = req.json()['_id']
    new_players_for_df.append(payload)

new_df = pd.DataFrame(new_players_for_df).set_index('nba_id')
final_data = existing_data.append(new_df)
final_data.to_csv('players_export.csv')
