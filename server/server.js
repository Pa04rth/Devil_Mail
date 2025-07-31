const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config"); // Import our new config file

// Import route handlers
const authRoutes = require("./routes/auth");
const emailRoutes = require("./routes/emails");

const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for your front-end
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// All routes in auth.js will be prefixed with /api/auth
app.use("/api/auth", authRoutes);
// All routes in emails.js will be prefixed with /api/emails
app.use("/api/emails", emailRoutes);

// --- Database Connection ---
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    // --- Start Server ---
    // We only start the server after a successful database connection
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if we can't connect to the database
  });
