import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaBus,
  FaMotorcycle,
  FaExchangeAlt,
  FaCheckCircle,
  FaMobileAlt,
  FaSpinner,
  FaPhoneAlt,
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
  const [contactPhone, setContactPhone] = useState(""); // ✅ NEW
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState("");

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
    if (!pickup || !dropoff || pickup === dropoff) return 0;
    const hours = travelTimes[pickup]?.[dropoff] || 1;
    const rate = transportType === "Car" ? 80 : transportType === "Bus" ? 50 : 30;
    return rate * hours * passengers;
  };

  useEffect(() => {
    if (pickup && dropoff && pickup !== dropoff) {
      const hours = travelTimes[pickup]?.[dropoff];
      if (hours) {
        setEstimatedTime(`${hours} hours`);
        const now = new Date();
        const arrival = new Date(now.getTime() + hours * 3600000);
        setTime(now.toTimeString().slice(0, 5));
        setArrivalTime(arrival.toTimeString().slice(0, 5));
      }
    }
  }, [pickup, dropoff]);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    setError("");

    if (!pickup || !dropoff) return setError("Select pickup & drop-off!");
    if (pickup === dropoff) return setError("Pickup & drop-off cannot be same!");
    if (!paymentMethod) return setError("Select payment method!");
    if (!paymentNumber) return setError("Enter payment number!");
    if (!contactPhone) return setError("Enter contact phone number!");

    setLoading(true);
    setTimeout(() => {
      setBookingId(`TR-${Math.floor(100000 + Math.random() * 900000)}`);
      setBookingConfirmed(true);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setPickup("");
    setDropoff("");
    setPassengers(1);
    setPaymentMethod("");
    setPaymentNumber("");
    setContactPhone("");
    setBookingConfirmed(false);
    setEstimatedTime("");
    setError("");
  };

  const swapLocations = () => {
    if (pickup && dropoff) {
      setPickup(dropoff);
      setDropoff(pickup);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-cyan-900 to-blue-950 flex items-center justify-center p-4">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md backdrop-blur-2xl bg-white/10 border border-cyan-400/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Smart Transport Booking
        </h2>

        <AnimatePresence mode="wait">
          {!bookingConfirmed ? (
            <motion.form onSubmit={handleBooking} className="space-y-4">
              {/* Transport */}
              <div className="flex gap-2">
                {["Car", "Bus", "Bike"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTransportType(type)}
                    className={`flex-1 py-2 rounded-xl font-semibold flex items-center justify-center gap-1 ${
                      transportType === type
                        ? "bg-gradient-to-r from-cyan-500 to-sky-600 text-white"
                        : "bg-white/10 text-cyan-100"
                    }`}
                  >
                    {type === "Car" && <FaCar />}
                    {type === "Bus" && <FaBus />}
                    {type === "Bike" && <FaMotorcycle />}
                    {type}
                  </button>
                ))}
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-3 relative">
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="bg-white/10 text-white p-2 rounded-lg"
                >
                  <option value="">Pickup</option>
                  {locations.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>

                <select
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="bg-white/10 text-white p-2 rounded-lg"
                >
                  <option value="">Drop</option>
                  {locations.filter((l) => l !== pickup).map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={swapLocations}
                  className="absolute -right-4 top-2 bg-cyan-500 p-2 rounded-full text-white"
                >
                  <FaExchangeAlt />
                </button>
              </div>

              {estimatedTime && (
                <p className="text-center text-cyan-300 text-sm">
                  ⏱ {estimatedTime} • Arrival {arrivalTime}
                </p>
              )}

              <input
                type="number"
                min="1"
                value={passengers}
                onChange={(e) => setPassengers(+e.target.value)}
                className="w-full bg-white/10 text-white p-2 rounded-lg"
                placeholder="Passengers"
              />

              <p className="text-right text-cyan-300 font-semibold">
                Total: ${calculatePrice()}
              </p>

              {/* Payment */}
              <div className="flex gap-2">
                {["bKash", "Nagad", "Rocket"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`flex-1 py-2 rounded-lg ${
                      paymentMethod === m ? "bg-cyan-500 text-white" : "bg-white/10 text-white"
                    }`}
                  >
                    <FaMobileAlt className="inline mr-1" /> {m}
                  </button>
                ))}
              </div>

              {paymentMethod && (
                <>
                  <input
                    value={paymentNumber}
                    onChange={(e) => setPaymentNumber(e.target.value)}
                    placeholder={`${paymentMethod} Number`}
                    className="w-full bg-white/10 text-white p-2 rounded-lg"
                  />

                  <input
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Contact Phone Number"
                    className="w-full bg-white/10 text-white p-2 rounded-lg"
                  />
                </>
              )}

              {error && <p className="text-red-400 text-xs text-center">{error}</p>}

              <button
                disabled={loading}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold"
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Confirm Booking"}
              </button>
            </motion.form>
          ) : (
            <motion.div className="text-center space-y-2">
              <FaCheckCircle className="text-5xl text-cyan-400 mx-auto" />
              <h3 className="text-white font-bold">Booking Confirmed</h3>
              <p className="text-cyan-300">ID: {bookingId}</p>
              <button
                onClick={handleReset}
                className="mt-3 px-4 py-2 bg-cyan-500 text-white rounded-lg"
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
