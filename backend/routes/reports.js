import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [records] = await pool.query("SELECT * FROM attendance WHERE timestamp >= NOW() - INTERVAL 7 DAY ORDER BY timestamp DESC");
    
    if (records.length === 0) {
      return res.status(404).json({ message: "No attendance records found for the past week" });
    }

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
