// server/controllers/driveController.js

const { google } = require("googleapis");
const oAuth2Client = require("../config/googleOAuth");

exports.getFolders = async (req, res) => {
  try {
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder'",
      fields: "files(id, name)",
    });

    const folders = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
    }));
    res.json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ error: "Failed to fetch folders" });
  }
};


exports.getFolderFiles = async (req, res) => {
  try {
    const { folderId } = req.params;

    // Set credentials here if not already authenticated
    oAuth2Client.setCredentials({
      access_token: req.user.accessToken, // Retrieve from session or database
      refresh_token: req.user.refreshToken, // Retrieve from session or database
    });

    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: "files(id, name, mimeType, webContentLink)",
    });

    const files = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      url: file.webContentLink,
    }));

    res.json(files);
  } catch (error) {
    console.error("Error fetching files in folder:", error);
    res.status(500).json({ error: "Failed to fetch files in folder" });
  }
};


