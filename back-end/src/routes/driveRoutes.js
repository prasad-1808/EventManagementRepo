// server/routes/driveRoutes.js

const express = require("express");
const {
  getFolders,
  getFolderFiles,
} = require("../controllers/driveController");

const router = express.Router();

router.get("/folders", getFolders);
router.get("/folders/:folderId/files", getFolderFiles);

module.exports = router;
