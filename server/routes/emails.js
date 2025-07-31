const express = require("express");
const router = express.Router();
const { fetchEmails, sendEmail } = require("../controllers/emailController");

const authMiddleware = require("../middleware/authMiddleware");

// This becomes GET /api/emails/inbox
router.get("/inbox", authMiddleware, fetchEmails);

// This becomes POST /api/emails/send
router.post("/send", authMiddleware, sendEmail);

module.exports = router;
