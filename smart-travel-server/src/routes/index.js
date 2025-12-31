// src/routes/index.js
const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const reviewRoutes = require("./review.routes");
const bookingRoutes = require("./booking.routes");
const orderRoutes = require("./order.routes");
const hotelBookingRoutes = require("./hotelBooking.routes");
const contactRoutes = require("./contact.routes");
const transportBookingRoutes = require("./transportBooking.routes"); // NEW

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/bookings", bookingRoutes);
router.use("/orders", orderRoutes);
router.use("/hotel-bookings", hotelBookingRoutes);
router.use("/contacts", contactRoutes);
router.use("/transport", transportBookingRoutes); // NEW

module.exports = router;
