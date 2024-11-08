// googleDriveServices.js

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Load OAuth2 client credentials from the credentials.json file
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
const { client_id, client_secret, redirect_uris } =
  credentials.installed || credentials.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Set up the drive client with authentication
const drive = google.drive({ version: "v3", auth: oAuth2Client });

module.exports = {
  async authenticateWithCode(code) {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    return tokens;
  },
  async uploadFile(filePath, fileName) {
    const fileMetadata = { name: fileName };
    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream(filePath),
    };
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    return file.data.id;
  },
  async getFilePublicUrl(fileId) {
    await drive.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" },
    });
    const file = await drive.files.get({
      fileId,
      fields: "webViewLink, webContentLink",
    });
    return file.data.webContentLink;
  },
};
