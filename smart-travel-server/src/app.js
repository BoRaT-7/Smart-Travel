// src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Smart Travel Server is running");
});

// all APIs under /api
app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
