// src/controllers/booking.controller.js
let bookingsCollection;
const { ObjectId } = require("mongodb");

function init(db) {
  bookingsCollection = db.collection("bookings");
}

async function createBooking(req, res, next) { /* ... */ }
async function getAllBookings(req, res, next) { /* ... */ }
async function getBookingById(req, res, next) { /* ... */ }

module.exports = { init, createBooking, getAllBookings, getBookingById };
