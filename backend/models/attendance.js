import pool from "../config/db.js";

// Insert a new attendance record (Sign-in)
export const signIn = async (name, company, site, swms, induction) => {
  const sql = `INSERT INTO attendance (name, company, site, status, swms, induction) VALUES (?, ?, ?, 'IN', ?, ?)`;
  const [result] = await pool.query(sql, [name, company, site, swms, induction]);
  return result;
};

// Update an attendance record (Sign-out)
export const signOut = async (name, company, site) => {
  const sql = `UPDATE attendance SET status='OUT' WHERE name=? AND company=? AND site=? AND status='IN' ORDER BY timestamp DESC LIMIT 1`;
  const [result] = await pool.query(sql, [name, company, site]);
  return result.affectedRows;
};

// Fetch all attendance records
export const getAttendanceRecords = async () => {
  const sql = `SELECT * FROM attendance ORDER BY timestamp DESC`;
  const [rows] = await pool.query(sql);
  return rows;
};

// Fetch attendance records for a specific site
export const getSiteAttendance = async (site) => {
  const sql = `SELECT * FROM attendance WHERE site=? ORDER BY timestamp DESC`;
  const [rows] = await pool.query(sql, [site]);
  return rows;
};

// Fetch attendance records from the past 7 days
export const getWeeklyAttendance = async () => {
  const sql = `SELECT * FROM attendance WHERE timestamp >= NOW() - INTERVAL 7 DAY ORDER BY timestamp DESC`;
  const [rows] = await pool.query(sql);
  return rows;
};
