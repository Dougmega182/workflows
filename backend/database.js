const mysql = require('mysql2/promise'); // Use promise-based MySQL2

// ✅ Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'transform.mysql.database.azure.com', // Azure MySQL host
    user: process.env.DB_USER || 'Dale', // Your Azure MySQL user
    password: process.env.DB_PASS || 'Transformhomes2011$', // Your Azure MySQL password
    database: process.env.DB_NAME || 'transform', // Your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false } // ✅ Required for Azure MySQL
});

module.exports = pool; // Export the connection pool
