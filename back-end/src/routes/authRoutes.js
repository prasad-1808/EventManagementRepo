// server/routes/authRoutes.js

const express = require("express");
const {
  getAuthUrl,
  handleGoogleCallback,
} = require("../controllers/authController");

const router = express.Router();

router.get("/google", getAuthUrl);
router.get("/google/callback", handleGoogleCallback);

module.exports = router;
