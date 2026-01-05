// src/routes/user.routes.js
const express = require("express");
const { getAllUsers } = require("../controllers/user.controller");
const { requireUser } = require("../middleware/auth");

const router = express.Router();

// শুধু logged in user লিস্ট দেখতে পারবে
router.get("/", requireUser, getAllUsers);

module.exports = router;
