const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// The path is now relative to the path defined in server.js
// So this becomes POST /api/auth/register
router.post("/register", register);

// This becomes POST /api/auth/login
router.post("/login", login);

module.exports = router;
