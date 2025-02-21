const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./database'); // ✅ Import the database connection

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ✅ Serve the frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Health check route
app.get('/health', (req, res) => {
    res.send({ status: "Server is running" });
});

// ✅ Sign-In Tradesman (uses database.js)
app.post('/signin', async (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "IN")';

    try {
        const [rows] = await pool.query(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed in successfully', id: rows.insertId });
    } catch (err) {
        console.error("Sign-in error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Sign-Out Tradesman
app.post('/signout', async (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "OUT")';

    try {
        const [rows] = await pool.query(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed out successfully', id: rows.insertId });
    } catch (err) {
        console.error("Sign-out error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get Attendance Records
app.get('/history/:siteId', async (req, res) => {
    const sql = 'SELECT * FROM attendance WHERE siteId = ? ORDER BY timestamp DESC';

    try {
        const [results] = await pool.query(sql, [req.params.siteId]);
        res.json(results);
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
