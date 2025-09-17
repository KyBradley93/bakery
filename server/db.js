const { Pool } = require('pg');
require('dotenv').config({ debug: process.env.DEBUG });


console.log('Password type:', typeof process.env.DB_PASSWORD);
console.log('Password:', process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Error connecting to the database', err.stack));

module.exports = pool;