const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const qaRoutes = require("./routes/qa.routes");
const { requireAuth } = require("./middleware/auth.middleware");

const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/code_mentor";

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error", err);
    process.exit(1);
  }

  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/qa", requireAuth, qaRoutes);

  app.use((err, _req, res, _next) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  });

  app.listen(PORT, () => {
    console.log(`🚀 API listening on http://localhost:${PORT}`);
  });
}

start();
