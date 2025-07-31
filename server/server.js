const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");

// Import route handlers
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/emails");

const app = express();

// --------------------

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/emails", emailRoutes);

// --- Database Connection ---
mongoose
  .connect(config.MONGODB_URI) // The error happens here if MONGODB_URI is undefined
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
