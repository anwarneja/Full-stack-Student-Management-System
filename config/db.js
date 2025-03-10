// const mysql = require('mysql');
// require('dotenv').config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
        
//     }
//     console.log('Connected to the MySQL database.');
// });

// module.exports = db;
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,

    connectTimeout: 5000,      // Fail after 5s instead of 10s
  acquireTimeout: 5000,      // 5s to acquire a connection
  waitForConnections: true,  // Queue if pool is busy
  queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Pool connection failed:', err);
        throw err;
    }
    console.log('Connected to MySQL pool.');
    connection.release();
});

module.exports = pool;