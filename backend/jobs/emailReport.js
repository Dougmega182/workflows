import cron from "node-cron";
import transporter from "../config/email.js";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// Run every Monday at 8 AM
cron.schedule("0 8 * * 1", async () => {
  console.log("📧 Sending Weekly Report...");

  try {
    // Fetch data from MySQL
    const [rows] = await pool.query("SELECT * FROM attendance");

    // Convert to CSV or JSON
    const csvData = rows.map(row => `${row.name},${row.company},${row.site},${row.status},${row.timestamp}`).join("\n");

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "Weekly Attendance Report",
      text: "Attached is the latest weekly attendance report.",
      attachments: [{ filename: "report.csv", content: csvData }]
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Weekly report sent!");
  } catch (error) {
    console.error("❌ Failed to send report:", error);
  }
});
