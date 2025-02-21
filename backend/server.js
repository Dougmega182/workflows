const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express(); // ✅ Define app before using it
const port = process.env.PORT || 8080;

// Import the database connection pool
const { pool, testConnection } = require('./database');

app.use(cors());
app.use(express.json());

// Test the database connection on startup
async function initializeDatabase() {
    try {
        await testConnection();  // Test the connection and create the table
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Failed to initialize database:", error);
        process.exit(1); // Exit the process if database initialization fails
    }
}

// Call the initialization function
initializeDatabase();

// ✅ Serve the frontend files from the correct directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Health check route
app.get('/health', (req, res) => {
    res.send({ status: "Server is running" });
});

// ✅ Serve index.html when accessing `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false } // Required for Azure MySQL
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Sign-In Tradesman
app.post('/signin', async (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "IN")';
    try {
        const [result] = await pool.query(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed in successfully' });
        } catch (err) {
        console.error("Sign-in error:", err);
        return res.status(500).json({ error: err.message });
        }
});


// Sign-Out Tradesman
app.post('/signout', async (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "OUT")';

    try {
        const [result] = await pool.query(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed out successfully' });
    } catch (err) {
        console.error("Sign-out error:", err);
        return res.status(500).json({ error: err.message });
    }
});

// Get Attendance Records
app.get('/history/:siteId', async (req, res) => {
    const sql = 'SELECT * FROM attendance WHERE siteId = ? ORDER BY timestamp DESC';

    try {
        const [results] = await pool.query(sql, [req.params.siteId]);
        res.json(results);
    } catch (err) {
        console.error("History retrieval error:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
