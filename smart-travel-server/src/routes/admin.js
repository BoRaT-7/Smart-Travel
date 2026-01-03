// src/routes/admin.js
const express = require("express");
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

// Ready model থাকলে direct use করো
const User = require("../models/User");

// নিচের দুইটা dynamic model, strict schema দরকার না হলে:
const Review =
  mongoose.models.Review ||
  mongoose.model("Review", new mongoose.Schema({}, { strict: false }));

const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", new mongoose.Schema({}, { strict: false }));

// GET /api/admin/dashboard
router.get("/dashboard", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalReviews = await Review.estimatedDocumentCount();
    const totalBookings = await Booking.estimatedDocumentCount();

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: {
        totalUsers,
        totalAdmins,
        totalReviews,
        totalBookings,
      },
      recentUsers,
      recentBookings,
    });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
