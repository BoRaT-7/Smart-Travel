// src/app.js
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const reviewRoutes = require("./routes/review.routes");
const bookingRoutes = require("./routes/booking.routes");
const orderRoutes = require("./routes/order.routes");
const hotelBookingRoutes = require("./routes/hotelBooking.routes");
const contactRoutes = require("./routes/contact.routes");
const transportBookingRoutes = require("./routes/transportBooking.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/hotel-bookings", hotelBookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/transport", transportBookingRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Smart Travel Server is running");
});

module.exports = app;
