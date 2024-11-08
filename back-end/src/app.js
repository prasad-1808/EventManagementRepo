const express = require("express");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001", // Add this line for your frontend on port 3001
];

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

app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);

module.exports = app;
