// src/routes/index.js
const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const reviewRoutes = require("./review.routes");
const bookingRoutes = require("./booking.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/bookings", bookingRoutes);   // ✅ new

module.exports = router;
