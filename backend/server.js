// backend/server.js - Main Express server
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

app.use("/sites", siteRoutes);
app.use("/signin", signinRoutes);
app.use("/signout", signoutRoutes);
app.use("/reports", reportRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});