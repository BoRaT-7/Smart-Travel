// src/routes/booking.routes.js
const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
} = require("../controllers/booking.controller");
// const { requireUser } = require("../middleware/auth"); // ❌ আর দরকার নেই

const router = express.Router();

// ✅ Public booking – token দরকার নেই
router.post("/", createBooking);

// Dashboard / admin side থেকেও দেখতে চাইলে সব booking:
router.get("/", getAllBookings);
router.get("/:id", getBookingById);

module.exports = router;
