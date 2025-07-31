const express = require("express");
const app = express();
import { fetchEmails, sendEmail } from "../controllers/emailController";

app.get("/api/emails/inbox", (req, res) => {
  try {
    fetchEmails(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error -- Fetch Emails Unsuccessful",
      error: error.message,
    });
  }
});
app.post("/api/emails/send", (req, res) => {
  try {
    sendEmail(req, res);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error -- Send Email Unsuccessful",
      error: error.message,
    });
  }
});
