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

// ✅ Serve the frontend files from the correct directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Health check route
app.get('/health', (req, res) => {
    res.send({ status: "Server is running" });
});

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
});

// Sign-Out Tradesman
app.post('/signout', (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "OUT")';
    db.query(sql, [firstName, lastName, company, siteId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Signed out successfully' });
    });
});

// Get Attendance Records
app.get('/history/:siteId', (req, res) => {
    const sql = 'SELECT * FROM attendance WHERE siteId = ? ORDER BY timestamp DESC';
    db.query(sql, [req.params.siteId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Start the server
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
