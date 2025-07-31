const { google } = require("googleapis");
const config = require("../config");

// ... (OAuth2 setup remains the same)
const oauth2Client = new google.auth.OAuth2(/* ... */);
oauth2Client.setCredentials({
  /* ... */
});
const gmail = google.gmail({ version: "v1", auth: oauth2Client });

const fetchEmails = async (req, res) => {
  const targetEmail = req.user.email;

  try {
    const searchResponse = await gmail.users.messages.list({
      userId: "me",
      q: `to:${targetEmail}`, // Use the secure email address
      maxResults: 25,
    });

    // ... rest of the function remains exactly the same
    const messages = searchResponse.data.messages;

    if (!messages || messages.length === 0) {
      return res.json([]);
    }
  } catch (error) {
    console.error("Error fetching from Gmail API:", error);
    res.status(500).json({ error: "Failed to fetch emails from Gmail." });
  }
};

const sendEmail = async (req, res) => {
  const fromEmail = req.user.email;
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const email = [
      `From: ${fromEmail}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-Type: text/html; charset=UTF-8",
      "",
      body,
    ].join("\n");

    const base64EncodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: base64EncodedEmail,
      },
    });

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = {
  fetchEmails,
  sendEmail,
};
