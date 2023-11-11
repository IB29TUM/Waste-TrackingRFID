import pandas as pd
from sqlalchemy import create_engine
import MySQLdb

df=pd.read_csv('data1.csv', delimiter=';')

# Replace 'username', 'password', 'localhost', 'database_name' with your MySQL credentials
engine = create_engine('mysql://root:5429@127.0.0.1/team_6')
table_name = 'ecoredeem_data'
df.to_sql(table_name, con=engine, if_exists='replace', index=False)
engine.dispose()