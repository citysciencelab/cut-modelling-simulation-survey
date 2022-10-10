# Survey backend
The backend consists of a postgres database and of an express API. 

## Database setup

### Install Postgres

1. Install postgresql with [homebrew](https://brew.sh/) (on Linux / OsX):
`brew install postgresql`
`brew services start postgresql`
(you can stop services with `brew services stop postgresql`)


### Create Database
2. Create a new user and database in psql console 
```
psql postgres
CREATE ROLE me WITH LOGIN PASSWORD 'password';
CREATE DATABASE "cut-simulation-survey";
\q
```

3. Then run database init file (cd to this folder)
```psql -U me -d cut-simulation-survey -a -f ./config/01-dbinit.sql```

## Express API
With `npm i`, install the dependencies and with `npm start`, start the local development server. The different endpoints of the API are listed in [routes.js](/routes/routes.js). 
