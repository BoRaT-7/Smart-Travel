// src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("🚀 Smart Travel Server is running");
});

// API routes
app.use("/api", routes);

// Error handler
app.use(errorHandler);

module.exports = app;
