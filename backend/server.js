import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import signinRoutes from "./routes/signin.js";
import signoutRoutes from "./routes/signout.js";
import siteRoutes from "./routes/sites.js";
import reportRoutes from "./routes/reports.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/signin", signinRoutes);
app.use("/signout", signoutRoutes);
app.use("/sites", siteRoutes);
app.use("/reports", reportRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
