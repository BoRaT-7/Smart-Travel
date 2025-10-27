import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HotelBookingConform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel; // Hotel ডেটা নেওয়া

  if (!hotel) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        No hotel data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">
        Confirm Your Booking
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
        <p className="text-gray-800 font-semibold mt-2">
          ${hotel.price} / night
        </p>
        <div className="flex mt-2">
          {Array.from({ length: hotel.rating }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">★</span>
          ))}
        </div>

        <button
          onClick={() => alert("Booking Confirmed! 🎉")}
          className="mt-6 w-full py-2 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold hover:brightness-110 transition"
        >
          Confirm Booking
        </button>

        <button
          onClick={() => navigate(-1)} // back button
          className="mt-3 w-full py-2 rounded-full border-2 border-green-600 text-green-700 font-semibold hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default HotelBookingConform;
