// src/routes/transportBooking.routes.js
const express = require("express");
const { requireUser } = require("../middleware/auth");
const {
  createBooking,
  getMyBookings,
} = require("../controllers/transportBooking.controller");

const router = express.Router();

// নতুন ট্রান্সপোর্ট বুকিং
router.post("/bookings", requireUser, createBooking);

// লগইন করা user নিজের বুকিং দেখতে পারবে
router.get("/bookings/me", requireUser, getMyBookings);

module.exports = router;
