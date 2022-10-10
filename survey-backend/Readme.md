# Database setup

(following [this tutorial](https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/))

### install postgres

1. install postgresql with [homebrew](https://brew.sh/) (on Linux / OsX):
`brew install postgresql`
`brew services start postgresql`
(you can stop services with `brew services stop postgresql`)


### create database
2. create a new user and database in psql console 
```
psql postgres
CREATE ROLE me WITH LOGIN PASSWORD 'password';
CREATE DATABASE "cut-simulation-survey";
\q
```

3. then run database init file (cd to this folder)
```psql -U me -d cut-simulation-survey -a -f ./config/01-dbinit.sql```