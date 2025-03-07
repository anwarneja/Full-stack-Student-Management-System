const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Match your .env key
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306 // Use port from .env, default to 3306
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;
