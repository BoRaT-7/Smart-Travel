// src/controllers/admin.controller.js

let usersCollection;
let bookingsCollection;
let hotelBookingsCollection;
let transportBookingsCollection;
let tripPlansCollection;
let ordersCollection;        // ✅ নতুন: orders
let shopOrdersCollection;
let destinationsCollection;
let guidesCollection;
let reviewsCollection;

function init(db) {
  usersCollection = db.collection("users");
  bookingsCollection = db.collection("bookings");
  hotelBookingsCollection = db.collection("hotelBookings");
  transportBookingsCollection = db.collection("transportBookings");
  tripPlansCollection = db.collection("tripPlans");
  ordersCollection = db.collection("orders");       // ✅ order.controller এর init এর মতো
  shopOrdersCollection = db.collection("shopOrders"); // চাইলে বাদ দিতে পারো যদি ব্যবহার না করো
  destinationsCollection = db.collection("destinations");
  guidesCollection = db.collection("guides");
  reviewsCollection = db.collection("reviews");
}

// GET /api/admin/dashboard
async function getDashboard(req, res, next) {
  try {
    const [
      totalUsers,
      totalAdmins,
      totalBookings,
      totalHotelBookings,
      totalTransportBookings,
      totalTripPlans,
      totalOrders,
      totalShopOrders,
      totalDestinations,
      totalGuides,
      totalReviews,
      recentUsers,
      recentBookings,
      recentTripPlans,
      recentOrders,
      recentShopOrders,
    ] = await Promise.all([
      usersCollection.countDocuments(),
      usersCollection.countDocuments({ role: "admin" }),
      bookingsCollection.countDocuments(),
      hotelBookingsCollection.countDocuments(),
      transportBookingsCollection.countDocuments(),
      tripPlansCollection.countDocuments(),
      ordersCollection.countDocuments(),          // ✅ orders
      shopOrdersCollection.countDocuments(),
      destinationsCollection.countDocuments(),
      guidesCollection.countDocuments(),
      reviewsCollection.countDocuments(),

      usersCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .project({ password: 0 })
        .toArray(),

      bookingsCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),

      tripPlansCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),

      ordersCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),

      shopOrdersCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),
    ]);

    res.send({
      stats: {
        totalUsers,
        totalAdmins,
        totalBookings,
        totalHotelBookings,
        totalTransportBookings,
        totalTripPlans,
        totalOrders,          // ✅ এখানে এখন orders
        totalShopOrders,
        totalDestinations,
        totalGuides,
        totalReviews,
      },
      recentUsers,
      recentBookings,
      recentTripPlans,
      recentOrders,          // ✅ orders এর recent list
      recentShopOrders,
    });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    next(err);
  }
}

module.exports = { init, getDashboard };
