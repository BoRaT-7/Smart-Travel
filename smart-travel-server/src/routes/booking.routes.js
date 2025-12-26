// src/routes/booking.routes.js
const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
} = require("../controllers/booking.controller");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);

module.exports = router;

