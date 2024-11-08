// server/app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const driveRoutes = require("./routes/driveRoutes");

dotenv.config();

const app = express();

// CORS configuration with multiple allowed origins
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware to parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route handlers
app.use("/api/users", userRoutes); // User-related routes
app.use("/auth", authRoutes); // Authentication routes
app.use("/api/drive", driveRoutes); // Google Drive-related routes

module.exports = app;
