// Backend: Express.js server
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'DB_HOST',
    user: 'DB_USER',
    password: 'DB_PASS',
    database: 'DB_NAME',
    ssl: { rejectUnauthorized: false }  // Required for Azure MySQL
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

app.listen(port, () => console.log(`Server running on port ${port}`));


// Serve Simple HTML Form
const formHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tradesman Sign-In</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }
        input, select, button {
            display: block;
            width: 100%;
            margin: 10px 0;
            padding: 10px;
        }
        button {
            background: blue;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Tradesman Sign-In</h2>
        <form id="signForm">
            <input type="text" id="firstName" placeholder="First Name" required>
            <input type="text" id="lastName" placeholder="Last Name" required>
            <input type="text" id="company" placeholder="Company" required>
            <select id="siteId" required>
                <option value="1">Job Site 1</option>
                <option value="2">Job Site 2</option>
            </select>
            <button type="button" onclick="submitForm('signin')">Sign In</button>
            <button type="button" onclick="submitForm('signout')">Sign Out</button>
        </form>
    </div>

    <script>
        function submitForm(action) {
        const data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            company: document.getElementById('company').value,
            siteId: document.getElementById('siteId').value
    };
        fetch(`https://autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net/${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}
    </script>
</body>
    </html>`;

app.get('/', (req, res) => {
    res.send(formHtml);
})