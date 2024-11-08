// fileRoutes.js

const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Multer setup for handling file uploads

router.post("/upload", upload.single("photo"), fileController.uploadPhoto);
router.get("/:fileId", fileController.getPhotoUrl);

module.exports = router;
