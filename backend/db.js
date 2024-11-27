const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'lifestyle_app',
    password: 'PgUas9',
    port: 5432,
});

pool.connect()
    .then(client => {
        console.log("Connected to PostgreSQL");
        client.release();
    })
    .catch(err => console.error("Error connecting to PostgreSQL", err.stack));

module.exports = pool;