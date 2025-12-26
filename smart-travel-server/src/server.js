// src/server.js
require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");
const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const reviewController = require("./controllers/review.controller");
const bookingController = require("./controllers/booking.controller"); // ✅

const port = process.env.PORT || 5000;

async function start() {
  try {
    const db = await connectDB();

    authController.init(db);
    userController.init(db);
    reviewController.init(db);
    bookingController.init(db); // ✅

    app.listen(port, () => {
      console.log(`✅ Server running on port: ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
