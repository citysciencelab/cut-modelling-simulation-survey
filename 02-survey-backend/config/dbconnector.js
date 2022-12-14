const  Pool = require('pg').Pool
require('dotenv').config()


const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_MAX_CONNECTIONS } = process.env;

const pool = new Pool({
  max: DB_MAX_CONNECTIONS,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  idleTimeoutMillis: 30000
});


module.exports = {
    pool
}