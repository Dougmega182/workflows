const mysql = require('mysql2/promise'); // Use mysql2 with promises

// ✅ Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'transform.mysql.database.azure.com',
    user: process.env.DB_USER || 'Dale',
    password: process.env.DB_PASS || 'Transformhomes2011$', // ⚠️ Ensure this matches Azure's database password
    database: process.env.DB_NAME || 'transform',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false } // ✅ Required for Azure MySQL
});

module.exports = pool; // ✅ Export the connection pool
