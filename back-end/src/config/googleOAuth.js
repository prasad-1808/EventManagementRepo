// server/config/googleOAuth.js

const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

module.exports = oAuth2Client;
