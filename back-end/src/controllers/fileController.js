// fileController.js

const googleDriveService = require("../services/googleDriveService");

module.exports = {
  async uploadPhoto(req, res) {
    try {
      const { path: filePath, originalname: fileName } = req.file;
      const fileId = await googleDriveService.uploadFile(filePath, fileName);
      const fileUrl = await googleDriveService.getFilePublicUrl(fileId);
      res.status(200).json({ fileId, fileUrl });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to upload photo", details: error.message });
    }
  },
  async getPhotoUrl(req, res) {
    try {
      const { fileId } = req.params;
      const fileUrl = await googleDriveService.getFilePublicUrl(fileId);
      res.status(200).json({ fileUrl });
    } catch (error) {
      res.status(500).json({
        error: "Failed to retrieve photo URL",
        details: error.message,
      });
    }
  },
};
