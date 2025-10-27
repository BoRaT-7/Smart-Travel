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

  const calculatePrice = () => {
    const base =
      transportType === "Car" ? 50 : transportType === "Bus" ? 100 : 20;
    return base * passengers;
  };

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

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff || !date || !time || !paymentMethod) {
      alert("⚠️ Please fill all required fields!");
      return;
    }
    if (!paymentNumber) {
      alert(`⚠️ Enter your ${paymentMethod} number!`);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingConfirmed(true);
    }, 1500);
  };

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

  const swapLocations = () => {
    if (pickup && dropoff) {
      const temp = pickup;
      setPickup(dropoff);
      setDropoff(temp);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-lime-100 flex justify-center items-center p-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-emerald-100"
      >
        <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent mb-4">
          Transport Booking
        </h2>

        <AnimatePresence>
          {!bookingConfirmed ? (
            <motion.form
              onSubmit={handleBooking}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Transport Type */}
              <div>
                <label className="font-semibold text-gray-700 mb-1 block text-sm">
                  Vehicle Type
                </label>
                <div className="flex gap-2">
                  {["Car", "Bus", "Bike"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTransportType(type)}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                        transportType === type
                          ? "bg-emerald-600 text-white border-transparent"
                          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-emerald-50"
                      }`}
                    >
                      {type === "Car" && <FaCar />}
                      {type === "Bus" && <FaBus />}
                      {type === "Bike" && <FaMotorcycle />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup & Drop */}
              <div className="grid grid-cols-2 gap-3 relative">
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-2.5 left-2 text-emerald-500 text-sm" />
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-7 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                  >
                    <option value="">Pickup</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-2.5 left-2 text-red-500 text-sm" />
                  <select
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full pl-7 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-sm"
                  >
                    <option value="">Drop-off</option>
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
                  title="Swap"
                  className="absolute -right-4 top-6 bg-emerald-500 text-white p-1 rounded-full shadow hover:bg-emerald-600 transition"
                >
                  <FaExchangeAlt size={12} />
                </button>
              </div>

              {/* Estimated Time */}
              {estimatedTime && (
                <p className="text-center text-sm text-emerald-700 font-medium">
                  Time: {estimatedTime} • Arrival: {arrivalTime}
                </p>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <FaCalendarAlt className="absolute top-2.5 left-2 text-gray-400 text-sm" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-7 p-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-500"
                  />
                </div>
                <div className="relative">
                  <FaClock className="absolute top-2.5 left-2 text-gray-400 text-sm" />
                  <input
                    type="time"
                    value={time}
                    readOnly
                    className="w-full pl-7 p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-700"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="relative">
                <FaUser className="absolute top-2.5 left-2 text-gray-400 text-sm" />
                <input
                  type="number"
                  min="1"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full pl-7 p-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-500"
                  placeholder="Passengers"
                />
              </div>

              {/* Price */}
              <div className="text-right text-gray-700 text-sm font-medium">
                Total:{" "}
                <span className="text-emerald-600 font-semibold">
                  ${calculatePrice()}
                </span>
              </div>

              {/* Payment */}
              <div>
                <label className="font-semibold text-gray-700 mb-1 block text-sm">
                  Payment
                </label>
                <div className="flex gap-2">
                  {["bKash", "Nagad", "Rocket"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium text-white transition ${
                        method === "bKash"
                          ? "bg-pink-600"
                          : method === "Nagad"
                          ? "bg-orange-500"
                          : "bg-purple-600"
                      } ${
                        paymentMethod === method
                          ? "ring-2 ring-emerald-400"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <FaMobileAlt className="inline mr-1" />
                      {method}
                    </button>
                  ))}
                </div>

                {paymentMethod && (
                  <div className="relative mt-2">
                    <FaMobileAlt className="absolute top-2.5 left-2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      value={paymentNumber}
                      onChange={(e) => setPaymentNumber(e.target.value)}
                      placeholder={`${paymentMethod} Number`}
                      className="w-full pl-7 p-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>

              {/* Confirm Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className={`w-full py-2.5 text-sm font-semibold text-white rounded-lg transition ${
                  loading
                    ? "bg-gray-400"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-2"
            >
              <FaCheckCircle className="text-5xl text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">
                Booking Confirmed!
              </h3>
              <p className="text-sm text-gray-600">
                {transportType} from <b>{pickup}</b> to <b>{dropoff}</b> on{" "}
                {date}
              </p>
              <p className="text-sm text-gray-600">
                Arrival: {arrivalTime} • Payment: {paymentMethod}
              </p>
              <p className="font-semibold text-emerald-600 text-sm">
                Total: ${calculatePrice()}
              </p>
              <button
                onClick={handleReset}
                className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold"
              >
                Book Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

export default TransportBooking;
