import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import signinRoutes from "./routes/signin.js";
import signoutRoutes from "./routes/signout.js";
import siteRoutes from "./routes/sites.js";
import reportRoutes from "./routes/reports.js";
import "./jobs/emailReport.js"; // Weekly email job

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/signin", signinRoutes);
app.use("/signout", signoutRoutes);
app.use("/sites", siteRoutes);
app.use("/reports", reportRoutes);

// Database Connection Test
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "Server is running, Database connected" });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
