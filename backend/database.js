// Database configuration and connection setup

const mysql = require('mysql2/promise');

// Environment variables should match your PHP names

const dbConfig = {

host: process.env.DB_HOST,

user: process.env.DB_USER,

password: process.env.DB_PASS, // Note: matches your PHP DB_PASS

database: process.env.DB_NAME,

ssl: { rejectUnauthorized: false } // Required for Azure MySQL

};

// Create connection pool

const pool = mysql.createPool(dbConfig);

// Test database connection

async function testConnection() {

try {

const connection = await pool.getConnection();

console.log('Database connected successfully');

// Test if table exists, create if it doesn't

const createTable = `

CREATE TABLE IF NOT EXISTS attendance (

id INT AUTO_INCREMENT PRIMARY KEY,

firstName VARCHAR(255) NOT NULL,

lastName VARCHAR(255) NOT NULL,

company VARCHAR(255) NOT NULL,

siteId INT NOT NULL,

status ENUM('IN', 'OUT') NOT NULL,

timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`;

await connection.query(createTable);

console.log('Attendance table verified/created');

connection.release();

} catch (err) {

console.error('Database connection failed:', err);

throw err;

}

// Export pool for use in other files

module.exports = {

pool,

testConnection

}}
