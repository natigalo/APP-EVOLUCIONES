const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'AppHC',
  password: '1234',
  port: 5432, // puerto por defecto de PostgreSQL
});

module.exports = pool;