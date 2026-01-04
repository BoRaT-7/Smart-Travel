// src/controllers/admin.controller.js
// সব ধরনের ড্যাশবোর্ড ডাটা এই কন্ট্রোলার থেকে যাবে

let usersCollection;
let bookingsCollection;
let hotelBookingsCollection;
let transportBookingsCollection;
let tripPlansCollection;
let gearOrdersCollection;   // ✅ gearOrders কালেকশন
let shopOrdersCollection;
let destinationsCollection;
let guidesCollection;
let reviewsCollection;

// init ফাংশন – app.js সার্ভার থেকে ডাটাবেজ ইনজেক্ট করবে
function init(db) {
  usersCollection = db.collection("users");
  bookingsCollection = db.collection("bookings");
  hotelBookingsCollection = db.collection("hotelBookings");
  transportBookingsCollection = db.collection("transportBookings");
  tripPlansCollection = db.collection("tripPlans");
  gearOrdersCollection = db.collection("gearOrders");      // ✅ তোমার order.controller এর সাথে একই নাম
  shopOrdersCollection = db.collection("shopOrders");
  destinationsCollection = db.collection("destinations");
  guidesCollection = db.collection("guides");
  reviewsCollection = db.collection("reviews");
}

// GET /api/admin/dashboard
async function getDashboard(req, res, next) {
  try {
    // একসাথে সব count + recent list আনবো (Promise.all)
    const [
      totalUsers,
      totalAdmins,
      totalBookings,
      totalHotelBookings,
      totalTransportBookings,
      totalTripPlans,
      totalGearOrders,
      totalShopOrders,
      totalDestinations,
      totalGuides,
      totalReviews,
      recentUsers,
      recentBookings,
      recentTripPlans,
      recentGearOrders,
      recentShopOrders,
    ] = await Promise.all([
      // ====== STATS ======
      usersCollection.countDocuments(),
      usersCollection.countDocuments({ role: "admin" }),
      bookingsCollection.countDocuments(),
      hotelBookingsCollection.countDocuments(),
      transportBookingsCollection.countDocuments(),
      tripPlansCollection.countDocuments(),
      gearOrdersCollection.countDocuments(),        // ✅ এখানে gearOrders
      shopOrdersCollection.countDocuments(),
      destinationsCollection.countDocuments(),
      guidesCollection.countDocuments(),
      reviewsCollection.countDocuments(),

      // ====== RECENT LISTS ======
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

      gearOrdersCollection
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

    // ফাইনাল রেসপন্স – React dashboard এখানে যে key গুলো ইউজ করবে
    res.send({
      stats: {
        totalUsers,
        totalAdmins,
        totalBookings,
        totalHotelBookings,
        totalTransportBookings,
        totalTripPlans,
        totalGearOrders,      // ✅ React এ data?.stats?.totalGearOrders
        totalShopOrders,
        totalDestinations,
        totalGuides,
        totalReviews,
      },
      recentUsers,
      recentBookings,
      recentTripPlans,
      recentGearOrders,       // ✅ React এ data?.recentGearOrders
      recentShopOrders,
    });
  } catch (err) {
    console.error("Admin dashboard error:", err);
    next(err);
  }
}

module.exports = { init, getDashboard };
