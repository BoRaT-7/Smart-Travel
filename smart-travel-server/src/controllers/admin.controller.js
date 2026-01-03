// src/controllers/admin.controller.js

let db;
let usersCollection;
let bookingsCollection;
let reviewsCollection;

function init(database) {
  db = database;
  usersCollection = db.collection("users");
  bookingsCollection = db.collection("bookings");
  reviewsCollection = db.collection("reviews");
  console.log("✅ Admin controller initialized");
}

// GET /api/admin/dashboard
async function getDashboardData(req, res, next) {
  try {
    const totalUsers = await usersCollection.countDocuments();
    const totalAdmins = await usersCollection.countDocuments({ role: "admin" });
    const totalBookings = await bookingsCollection.countDocuments();
    const totalReviews = await reviewsCollection.countDocuments();

    const recentUsers = await usersCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentBookings = await bookingsCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    res.send({
      stats: {
        totalUsers,
        totalAdmins,
        totalBookings,
        totalReviews,
      },
      recentUsers,
      recentBookings,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  init,
  getDashboardData,
};
