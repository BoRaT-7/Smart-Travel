// src/routes/auth.routes.js
const express = require("express");
const { register, login, adminLogin } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// NEW: admin login
router.post("/admin/login", adminLogin);

module.exports = router;
