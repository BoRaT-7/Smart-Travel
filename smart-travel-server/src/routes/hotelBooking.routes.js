// src/routes/hotelBooking.routes.js
const express = require("express");
const {
  createHotelBooking,
  getAllHotelBookings,
  getHotelBookingById,
} = require("../controllers/hotelBooking.controller");
// const { requireUser } = require("../middleware/auth"); // ❌ ব্যবহার কোরো না

const router = express.Router();

// ✅ Public: token ছাড়াই booking
router.post("/", createHotelBooking);

router.get("/", getAllHotelBookings);
router.get("/:id", getHotelBookingById);

module.exports = router;
