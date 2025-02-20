const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express(); // ✅ Define app before using it
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ✅ Serve the frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check route
app.get('/health', (req, res) => {
    res.send({ status: "Server is running" });
});

// ✅ Serve index.html when accessing `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
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
app.post('/signin', (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "IN")';
    db.query(sql, [firstName, lastName, company, siteId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Signed in successfully' });
    });
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
