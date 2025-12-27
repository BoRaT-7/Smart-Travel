// src/routes/hotelBooking.routes.js
const express = require("express");
const {
  createHotelBooking,
  getAllHotelBookings,
  getHotelBookingById,
} = require("../controllers/hotelBooking.controller");

const router = express.Router();

router.post("/", createHotelBooking);
router.get("/", getAllHotelBookings);
router.get("/:id", getHotelBookingById);

module.exports = router;
