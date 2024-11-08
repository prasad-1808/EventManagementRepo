// server/controllers/authController.js

const oAuth2Client = require("../config/googleOAuth");

let accessToken; // Consider secure storage in production

exports.getAuthUrl = (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive"],
  });
  res.redirect(authUrl);
};

exports.handleGoogleCallback = async (req, res) => {
  const code = req.query.code;

  if (code) {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      accessToken = tokens.access_token;
      oAuth2Client.setCredentials(tokens);
      res.json(tokens);
    } catch (error) {
      console.error("Error retrieving tokens:", error);
      res.status(500).json({ error: "Failed to retrieve tokens" });
    }
  } else {
    res.status(400).send("Error: No code returned from Google");
  }
};
