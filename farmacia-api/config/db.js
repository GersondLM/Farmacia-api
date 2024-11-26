const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('Conectado a la base de datos PostgreSQL'))
    .catch((err) => console.error('Error al conectar a PostgreSQL', err));

module.exports = pool;
