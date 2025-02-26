import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,      // Azure MySQL Host
  user: process.env.DB_USER,      // Azure MySQL User
  password: process.env.DB_PASS,  // Azure MySQL Password
  database: process.env.DB_NAME,  // Azure MySQL Database Name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: true } // Ensure secure connection
});

export default pool;
