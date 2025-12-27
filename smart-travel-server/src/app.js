// src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Simple: allow all origins (local dev)
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Smart Travel Server is running");
});

app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
