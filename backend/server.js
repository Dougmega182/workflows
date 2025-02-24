const express = require("express");
const cors = require("cors");
const db = require("./db");
const siteRoutes = require("./routes/sites");
const signinRoutes = require("./routes/signin");
const signoutRoutes = require("./routes/signout");
const reportRoutes = require("./routes/reports");

const app = express();
app.use(cors());
app.use(express.json());
const express = require('express');
const path = require('path');


// Serve static React files from frontend/build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use("/sites", siteRoutes);
app.use("/signin", signinRoutes);
app.use("/signout", signoutRoutes);
app.use("/reports", reportRoutes);

const port = process.env.PORT || 8080;
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});


process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});

const express = require('express');
const path = require('path');

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
