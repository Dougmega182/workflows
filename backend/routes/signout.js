import express from "express";
import pool from "../config/db.js";
import { signIn, signOut, getAttendanceRecords } from "../models/attendance.js";


const router = express.Router();

router.post("/", async (req, res) => {
  const { name, company, site } = req.body;

  if (!name || !company || !site) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql = `UPDATE attendance SET status='OUT' WHERE name=? AND company=? AND site=? AND status='IN' ORDER BY timestamp DESC LIMIT 1`;
    const [result] = await pool.query(sql, [name, company, site]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No active sign-in record found" });
    }

    res.json({ message: "Successfully signed out" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
