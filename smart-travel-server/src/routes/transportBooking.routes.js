// src/routes/transportBooking.routes.js
const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
} = require("../controllers/transportBooking.controller");

router.post("/bookings", createBooking);
router.get("/bookings/me", getMyBookings);

module.exports = router;
