import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HotelBookingConform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;
  const booking = location.state?.booking;

  if (!hotel || !booking) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        No booking data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">
        Booking Confirmed
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-56 object-cover rounded-xl mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
        <p className="text-gray-600 mt-1 flex items-center gap-2">
          <span className="text-red-500">📍</span> {hotel.location}
        </p>

        <p className="mt-3 text-gray-700">
          Guest: <span className="font-semibold">{booking.name}</span>
        </p>
        <p className="text-gray-700">
          Email: <span className="font-semibold">{booking.email}</span>
        </p>
        <p className="text-gray-700">
          Nights: <span className="font-semibold">{booking.nights}</span>
        </p>
        <p className="text-gray-700">
          Check‑in: <span className="font-semibold">{booking.checkIn}</span>
        </p>
        <p className="text-gray-700">
          Check‑out: <span className="font-semibold">{booking.checkOut}</span>
        </p>

        <p className="text-gray-800 font-semibold mt-3">
          Total:{" "}
          <span className="text-emerald-700">
            {booking.total.toFixed ? booking.total.toFixed(2) : booking.total}
          </span>
        </p>

        <button
          onClick={() => navigate("/hotel")}
          className="mt-6 w-full py-2 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold hover:brightness-110 transition"
        >
          Back to Hotels
        </button>
      </div>
    </div>
  );
};

export default HotelBookingConform;
