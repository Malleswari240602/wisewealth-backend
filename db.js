const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 5,   // ⚡ required for Clever Cloud
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to Clever Cloud MySQL!");
    connection.release();
  }
});

module.exports = pool;
