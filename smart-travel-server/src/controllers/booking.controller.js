// src/controllers/booking.controller.js
const { ObjectId } = require("mongodb");

let bookingsCollection;

function init(db) {
  bookingsCollection = db.collection("bookings");
}

async function createBooking(req, res, next) {
  try {
    console.log("📩 Incoming booking:", req.body);

    const {
      name,
      email,
      phone,
      address,
      quantity,
      payment,
      destinationId,
      destinationName,
      destinationPrice,
      destinationCurrency,
      destinationImage,
      destinationLocation,
      destinationDuration,
    } = req.body;

    if (!name || !email || !phone || !address || !destinationId) {
      return res.status(400).send({
        success: false,
        message: "Name, email, phone, address and destinationId are required",
      });
    }

    const qty = Number(quantity) || 1;
    const price = Number(destinationPrice) || 0;

    const booking = {
      name,
      email,
      phone,
      address,
      quantity: qty,
      payment: payment || "bkash",
      totalAmount: qty * price,
      destination: {
        id: destinationId,
        name: destinationName,
        price,
        currency: destinationCurrency,
        image: destinationImage,
        location: destinationLocation,
        duration: destinationDuration,
      },
      createdAt: new Date(),
      status: "pending",
    };

    const result = await bookingsCollection.insertOne(booking);

    return res.send({
      success: true,
      message: "Booking created successfully",
      bookingId: result.insertedId,
    });
  } catch (err) {
    console.error("Booking create error:", err);
    return next(err);
  }
}

async function getAllBookings(req, res, next) {
  try {
    const bookings = await bookingsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(bookings);
  } catch (err) {
    next(err);
  }
}

async function getBookingById(req, res, next) {
  try {
    const { id } = req.params;
    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }

    res.send(booking);
  } catch (err) {
    next(err);
  }
}

module.exports = { init, createBooking, getAllBookings, getBookingById };
