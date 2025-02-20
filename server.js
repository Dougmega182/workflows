// Backend: Express.js server
const express = require('express');
const mysql = require('mysql2/promise'); // Using promise-based version
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MySQL Connection Configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
};

// Database connection pool instead of single connection
const pool = mysql.createPool(dbConfig);

// Middleware to validate request body
const validateAttendanceData = (req, res, next) => {
    const { firstName, lastName, company, siteId } = req.body;
    if (!firstName || !lastName || !company || !siteId) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    next();
};

// Sign-In Tradesman
app.post('/signin', validateAttendanceData, async (req, res) => {
    try {
        const { firstName, lastName, company, siteId } = req.body;
        const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "IN")';
        await pool.execute(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed in successfully' });
    } catch (err) {
        console.error('Sign-in error:', err);
        res.status(500).json({ error: 'Failed to sign in' });
    }
});

// Sign-Out Tradesman
app.post('/signout', validateAttendanceData, async (req, res) => {
    try {
        const { firstName, lastName, company, siteId } = req.body;
        const sql = 'INSERT INTO attendance (firstName, lastName, company, siteId, status) VALUES (?, ?, ?, ?, "OUT")';
        await pool.execute(sql, [firstName, lastName, company, siteId]);
        res.json({ message: 'Signed out successfully' });
    } catch (err) {
        console.error('Sign-out error:', err);
        res.status(500).json({ error: 'Failed to sign out' });
    }
});

// Get Attendance Records
app.get('/history/:siteId', async (req, res) => {
    try {
        const sql = 'SELECT * FROM attendance WHERE siteId = ? ORDER BY timestamp DESC';
        const [results] = await pool.execute(sql, [req.params.siteId]);
        res.json(results);
    } catch (err) {
        console.error('History fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch attendance history' });
    }
});

// Serve HTML Form with improved styling and validation
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
            margin: 0;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            margin: 1rem;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        input, select {
            display: block;
            width: 100%;
            padding: 0.75rem;
            margin: 0.5rem 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .button-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-top: 1rem;
        }
        button {
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.2s;
        }
        .signin-btn {
            background-color: #4CAF50;
            color: white;
        }
        .signout-btn {
            background-color: #f44336;
            color: white;
        }
        .error {
            color: #f44336;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Tradesman Sign-In</h2>
        <form id="signForm" novalidate>
            <div class="form-group">
                <input type="text" id="firstName" placeholder="First Name" required>
            </div>
            <div class="form-group">
                <input type="text" id="lastName" placeholder="Last Name" required>
            </div>
            <div class="form-group">
                <input type="text" id="company" placeholder="Company" required>
            </div>
            <div class="form-group">
                <select id="siteId" required>
                    <option value="">Select Job Site</option>
                    <option value="1">Job Site 1</option>
                    <option value="2">Job Site 2</option>
                </select>
            </div>
            <div class="button-group">
                <button type="button" class="signin-btn" onclick="submitForm('signin')">Sign In</button>
                <button type="button" class="signout-btn" onclick="submitForm('signout')">Sign Out</button>
            </div>
        </form>
    </div>

    <script>
        async function submitForm(action) {
            const form = document.getElementById('signForm');
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                company: document.getElementById('company').value.trim(),
                siteId: document.getElementById('siteId').value
            };

            // Basic validation
            for (const [key, value] of Object.entries(formData)) {
                if (!value) {
                    alert(\`Please fill in \${key.replace(/([A-Z])/g, ' $1').toLowerCase()}\`);
                    return;
                }
            }

            // Visual feedback during submission
            form.classList.add('loading');
            
            try {
                const response = await fetch(\`https://autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net/\${action}\`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(\`HTTP error! status: \${response.status}\`);
                }

                const data = await response.json();
                alert(data.message);
                form.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                form.classList.remove('loading');
            }
        }
    </script>
</body>
</html>`;

app.get('/', (req, res) => {
    res.send(formHtml);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server with error handling
app.listen(port, () => console.log(`Server running on port ${port}`))
    .on('error', (err) => {
        console.error('Server failed to start:', err);
        process.exit(1);
    });
