const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const { pool, testConnection } = require('./database');

app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', async (req, res) => {
    try {
        await testConnection();
        res.send({ status: "Server is running and DB is healthy" });
    } catch (error) {
        console.error("Health check failed:", error);
        res.status(500).send({ status: "Server is running, but DB is unhealthy" });
    }
});

// Sign-In Tradesman
app.post('/signin', async (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "IN")';
    try {
        const [rows, fields] = await pool.query(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed in successfully' });
    } catch (err) {
        console.error("Sign-in error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Sign-Out Tradesman
app.post('/signout', async (req, res) => {
    const { firstName, lastName, company, siteId } = req.body;
    const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "OUT")';
    try {
        const [rows, fields] = await pool.query(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed out successfully' });
    } catch (err) {
        console.error("Sign-out error:", err);
        res.status(500).json({ error: err.message });
    }
});

// Get Attendance Records
app.get('/history/:siteId', async (req, res) => {
    const sql = 'SELECT * FROM attendance WHERE siteId = ? ORDER BY timestamp DESC';
    try {
        const [rows, fields] = await pool.query(sql, [req.params.siteId]);
        res.json(rows);
    } catch (err) {
        console.error("History retrieval error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
