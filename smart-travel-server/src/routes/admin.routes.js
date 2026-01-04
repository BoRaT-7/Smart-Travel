// src/routes/admin.routes.js
const express = require("express");
const { getDashboard } = require("../controllers/admin.controller");
// এখানে চাইলে admin-auth middleware ব্যবহার করতে পারো

const router = express.Router();

// /api/admin/dashboard
router.get("/dashboard", getDashboard);

module.exports = router;
