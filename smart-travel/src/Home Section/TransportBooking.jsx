import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaBus,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaUser,
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
  FaMobileAlt,
  FaExchangeAlt,
} from "react-icons/fa";

const TransportBooking = () => {
  const [transportType, setTransportType] = useState("Car");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🗺️ Predefined locations
  const locations = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
  ];

  const travelTimes = {
    Dhaka: { Chittagong: 6, Sylhet: 5, Rajshahi: 4, Khulna: 5, Barishal: 6, Rangpur: 7 },
    Chittagong: { Dhaka: 6, Sylhet: 8, Rajshahi: 9, Khulna: 10, Barishal: 7, Rangpur: 11 },
    Sylhet: { Dhaka: 5, Chittagong: 8, Rajshahi: 7, Khulna: 8, Barishal: 9, Rangpur: 9 },
    Rajshahi: { Dhaka: 4, Chittagong: 9, Sylhet: 7, Khulna: 5, Barishal: 8, Rangpur: 5 },
    Khulna: { Dhaka: 5, Chittagong: 10, Sylhet: 8, Rajshahi: 5, Barishal: 6, Rangpur: 9 },
    Barishal: { Dhaka: 6, Chittagong: 7, Sylhet: 9, Rajshahi: 8, Khulna: 6, Rangpur: 10 },
    Rangpur: { Dhaka: 7, Chittagong: 11, Sylhet: 9, Rajshahi: 5, Khulna: 9, Barishal: 10 },
  };

  // 🧮 Price Calculation
  const calculatePrice = () => {
    const base =
      transportType === "Car" ? 50 : transportType === "Bus" ? 100 : 20;
    return base * passengers;
  };

  // 🕐 Auto Time + Arrival Update
  useEffect(() => {
    if (pickup && dropoff && pickup !== dropoff) {
      const hours = travelTimes[pickup]?.[dropoff];
      if (hours) {
        setEstimatedTime(`${hours} hours`);
        const now = new Date();
        const arrival = new Date(now.getTime() + hours * 60 * 60 * 1000);
        setTime(now.toTimeString().slice(0, 5));
        setArrivalTime(arrival.toTimeString().slice(0, 5));
      }
    } else {
      setEstimatedTime("");
      setTime("");
      setArrivalTime("");
    }
  }, [pickup, dropoff]);

  // 🗓️ Auto-set today’s date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // ✅ Submit
  const handleBooking = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff || !date || !time || !paymentMethod) {
      alert("⚠️ Please fill all required fields and select payment method!");
      return;
    }
    if (!paymentNumber) {
      alert(`⚠️ Please enter your ${paymentMethod} number!`);
      return;
    }

    if (!window.confirm(`Confirm payment via ${paymentMethod}?`)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingConfirmed(true);
    }, 1500);
  };

  // 🔁 Reset
  const handleReset = () => {
    setPickup("");
    setDropoff("");
    setDate("");
    setTime("");
    setArrivalTime("");
    setPassengers(1);
    setEstimatedTime("");
    setPaymentMethod("");
    setPaymentNumber("");
    setBookingConfirmed(false);
  };

  // 🔄 Swap Pickup/Drop
  const swapLocations = () => {
    if (pickup && dropoff) {
      const temp = pickup;
      setPickup(dropoff);
      setDropoff(temp);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-lime-100 flex justify-center items-center p-6">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-emerald-100"
      >
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent mb-6">
          Smart Transport Booking
        </h2>

        <AnimatePresence>
          {!bookingConfirmed ? (
            <motion.form
              onSubmit={handleBooking}
              className="grid gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 🚘 Transport Type */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  Vehicle Type
                </label>
                <div className="flex gap-3">
                  {["Car", "Bus", "Bike"].map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => setTransportType(type)}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.05 }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border transition-all duration-300 ${
                        transportType === type
                          ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-lg border-transparent"
                          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-700"
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
              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-3 left-3 text-emerald-500" />
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Pickup</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-3 left-3 text-red-500" />
                  <select
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-red-500"
                    required
                  >
                    <option value="">Select Drop-off</option>
                    {locations
                      .filter((loc) => loc !== pickup)
                      .map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={swapLocations}
                  title="Swap pickup & drop"
                  className="absolute -right-5 top-8 bg-emerald-500 text-white p-2 rounded-full shadow hover:bg-emerald-600 transition"
                >
                  <FaExchangeAlt />
                </button>
              </div>

              {/* ⏱️ Estimated Time */}
              {estimatedTime && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-emerald-700 font-semibold"
                >
                  <p>Estimated Travel Time: {estimatedTime}</p>
                  <p>Arrival Time: {arrivalTime}</p>
                </motion.div>
              )}

              {/* 📅 Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div className="relative">
                  <FaClock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="time"
                    value={time}
                    readOnly
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                  />
                </div>
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

              {/* 💳 Payment */}
              <div>
                <label className="font-semibold text-gray-700 mb-2 block">
                  Select Payment Method
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "bKash", color: "from-pink-600 to-pink-500" },
                    { name: "Nagad", color: "from-orange-500 to-orange-400" },
                    { name: "Rocket", color: "from-purple-600 to-purple-500" },
                  ].map((method) => (
                    <motion.button
                      key={method.name}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPaymentMethod(method.name)}
                      className={`flex-1 py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r ${
                        paymentMethod === method.name
                          ? `${method.color} ring-4 ring-emerald-200`
                          : `${method.color} opacity-70 hover:opacity-100`
                      }`}
                    >
                      <FaMobileAlt className="inline mr-2" />
                      {method.name}
                    </motion.button>
                  ))}
                </div>

                {paymentMethod && (
                  <div className="relative mt-3">
                    <FaMobileAlt className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      value={paymentNumber}
                      onChange={(e) => setPaymentNumber(e.target.value)}
                      placeholder={`${paymentMethod} Number`}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                )}
              </div>

              {/* ✅ Submit */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-lime-600 hover:to-emerald-500"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "Confirm Booking"
                )}
              </motion.button>
            </motion.form>
          ) : (
            // ✅ Confirmation
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <FaCheckCircle className="text-6xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-3">
                Your {transportType} ride from <b>{pickup}</b> to{" "}
                <b>{dropoff}</b> is booked for <b>{date}</b>.
              </p>
              <p className="font-semibold text-gray-700 mb-1">
                Estimated Time:{" "}
                <span className="text-emerald-600">{estimatedTime}</span>
              </p>
              <p className="font-semibold text-gray-700 mb-1">
                Arrival Time: <span className="text-emerald-600">{arrivalTime}</span>
              </p>
              <p className="font-semibold text-gray-700 mb-1">
                Payment Method:{" "}
                <span className="text-emerald-600">{paymentMethod}</span>
              </p>
              <p className="font-semibold text-gray-700 mb-4">
                Total:{" "}
                <span className="text-emerald-600">${calculatePrice()}</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleReset}
                className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:from-lime-600 hover:to-emerald-500"
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
