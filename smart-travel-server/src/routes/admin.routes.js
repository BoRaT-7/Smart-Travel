// src/routes/admin.routes.js
const express = require("express");
// ভবিষ্যতে JWT দিলে এগুলো আনকমেন্ট করবে
// const verifyToken = require("../middleware/verifyToken");
// const verifyAdmin = require("../middleware/verifyAdmin");

const { getDashboardData } = require("../controllers/admin.controller");

const router = express.Router();

// test route (optional)
router.get("/test", (req, res) => {
  res.json({ message: "Admin routes working" });
});

// main dashboard route
// পরে চাইলে এখানে verifyToken, verifyAdmin বসাবে, যেমন:
// router.get("/dashboard", verifyToken, verifyAdmin, getDashboardData);
router.get("/dashboard", getDashboardData);

module.exports = router;
