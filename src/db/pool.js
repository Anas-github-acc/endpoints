const mysql = require('mysql2/promise');
const env = require('../config/env');

const ssl =
  env.DB_SSL === 'true'
    ? {
        rejectUnauthorized: env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
      }
    : undefined;

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  ssl,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
