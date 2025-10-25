import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaBus,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";

const TransportBooking = () => {
  const [transportType, setTransportType] = useState("Car");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // 💰 Price Calculation Function
  const calculatePrice = () => {
    const base =
      transportType === "Car" ? 50 : transportType === "Bus" ? 100 : 20;
    return base * passengers;
  };

  // ✅ Handle Form Submit
  const handleBooking = (e) => {
    e.preventDefault();

    // Validation
    if (!pickup || !dropoff || !date || !time) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingConfirmed(true);
    }, 1200);
  };

  // 🔄 Reset Booking
  const handleReset = () => {
    setPickup("");
    setDropoff("");
    setDate("");
    setTime("");
    setPassengers(1);
    setBookingConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 flex justify-center items-center p-6">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-6">
          🚗 Transport Booking
        </h2>

        <AnimatePresence>
          {!bookingConfirmed ? (
            <motion.form
              onSubmit={handleBooking}
              className="grid gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 🚘 Transport Type */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  Select Vehicle Type
                </label>
                <div className="flex gap-3">
                  {["Car", "Bus", "Bike"].map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => setTransportType(type)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        transportType === type
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-700 hover:bg-emerald-500 hover:text-white"
                      }`}
                    >
                      {type === "Car" && <FaCar />}
                      {type === "Bus" && <FaBus />}
                      {type === "Bike" && <FaMotorcycle />}
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 📍 Pickup & Dropoff */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-3 left-3 text-red-500" />
                  <input
                    type="text"
                    placeholder="Drop-off Location"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
              </div>

              {/* 📅 Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* 👥 Passengers */}
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  placeholder="Number of Passengers"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* 💰 Price */}
              <div className="text-xl font-semibold text-gray-800 text-right">
                Total Price:{" "}
                <span className="text-emerald-600">${calculatePrice()}</span>
              </div>

              {/* ✅ Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-lime-500"
                }`}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </motion.button>
            </motion.form>
          ) : (
            // ✅ Booking Confirmation Card
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <FaCheckCircle className="text-6xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-4">
                Your <span className="font-semibold text-emerald-700">{transportType}</span> ride is booked for <br />
                <b>{date}</b> at <b>{time}</b>.
              </p>
              <p className="font-semibold text-gray-700 mb-4">
                Total Cost:{" "}
                <span className="text-emerald-600">
                  ${calculatePrice()}
                </span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleReset}
                className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-lime-500"
              >
                Book Another Ride
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

export default TransportBooking;
