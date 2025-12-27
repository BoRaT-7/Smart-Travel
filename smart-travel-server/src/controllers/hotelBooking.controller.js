const { ObjectId } = require("mongodb");

let hotelBookingsCollection;

function init(db) {
  hotelBookingsCollection = db.collection("hotelBookings");
}

async function createHotelBooking(req, res, next) {
  try {
    console.log("🏨 Incoming hotel booking:", req.body);

    const {
      name,
      email,
      phone,
      address,
      nights,
      payment,
      hotelId,
      hotelName,
      hotelLocation,
      hotelPrice,
      hotelImage,
      hotelRating,
    } = req.body;

    if (!name || !email || !phone || !address || !hotelId || !hotelName) {
      return res.status(400).send({
        success: false,
        message:
          "Name, email, phone, address, hotelId and hotelName are required",
      });
    }

    const nightCount = Number(nights) || 1;
    const pricePerNight = Number(hotelPrice) || 0;
    const totalAmount = nightCount * pricePerNight;

    const booking = {
      customer: { name, email, phone, address },
      hotel: {
        id: hotelId,
        name: hotelName,
        location: hotelLocation,
        pricePerNight,
        image: hotelImage,
        rating: hotelRating,
      },
      nights: nightCount,
      payment: payment || "cash",
      totalAmount,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await hotelBookingsCollection.insertOne(booking);

    return res.send({
      success: true,
      message: "Hotel booking created successfully",
      bookingId: result.insertedId,
    });
  } catch (err) {
    console.error("Hotel booking error:", err);
    next(err);
  }
}

async function getAllHotelBookings(req, res, next) {
  try {
    const bookings = await hotelBookingsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.send(bookings);
  } catch (err) {
    next(err);
  }
}

async function getHotelBookingById(req, res, next) {
  try {
    const { id } = req.params;
    const booking = await hotelBookingsCollection.findOne({
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

module.exports = {
  init,
  createHotelBooking,
  getAllHotelBookings,
  getHotelBookingById,
};
