const express = require("express");
const app = express();
import login from "../controllers/authController";
import register from "../controllers/authController";

app.post("/api/auth/register", (req, res) => {
  try {
    register(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error -- Register Unsuccesfull",
      error: error.message,
    });
  }
});
app.post("/api/auth/login", (req, res) => {
  try {
    login(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error -- Login Unsuccesfull",
      error: error.message,
    });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
