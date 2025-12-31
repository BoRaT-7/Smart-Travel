// src/controllers/transportBooking.controller.js
const { ObjectId } = require("mongodb");

let bookingsCollection;

function init(db) {
  bookingsCollection = db.collection("transportBookings");
}

// POST /api/bookings
async function createBooking(req, res, next) {
  try {
    const {
      transportType,
      pickup,
      dropoff,
      date,
      time,
      arrivalTime,
      passengers,
      paymentMethod,
      paymentNumber,
      price,
    } = req.body;

    if (!pickup || !dropoff || !paymentMethod || !paymentNumber) {
      return res.status(400).json({
        success: false,
        message: "pickup, dropoff, paymentMethod, paymentNumber required",
      });
    }

    const booking = {
      userId: req.user ? new ObjectId(req.user.id) : null, // optional
      transportType,
      pickup,
      dropoff,
      date,
      time,
      arrivalTime,
      passengers,
      paymentMethod,
      paymentNumber,
      price,
      status: "confirmed",
      createdAt: new Date(),
    };

    const result = await bookingsCollection.insertOne(booking);

    res.status(201).json({
      success: true,
      id: result.insertedId,
      booking,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/bookings/me (optional)
async function getMyBookings(req, res, next) {
  try {
    const query = req.user ? { userId: new ObjectId(req.user.id) } : {};
    const bookings = await bookingsCollection.find(query).toArray();
    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
}

module.exports = { init, createBooking, getMyBookings };
