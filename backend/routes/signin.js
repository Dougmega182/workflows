import express from "express";
import pool from "../config/db.js";
import { signIn, signOut, getAttendanceRecords } from "../models/attendance.js";


const router = express.Router();

router.post("/", async (req, res) => {
  const { name, company, site, swms, induction } = req.body;

  if (!name || !company || !site) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql = `INSERT INTO attendance (name, company, site, status, swms, induction) VALUES (?, ?, ?, 'IN', ?, ?)`;
    await pool.query(sql, [name, company, site, swms, induction]);

    res.json({ message: "Successfully signed in" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
