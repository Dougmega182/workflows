import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [sites] = await pool.query("SELECT id, name FROM job_sites ORDER BY name ASC");
    res.json(sites);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
