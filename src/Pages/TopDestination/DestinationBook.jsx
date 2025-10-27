import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const DestinationBook = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const destination = state?.destination;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    payment: "bkash",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Booking confirmed for ${form.quantity} x ${destination.destination} via ${form.payment.toUpperCase()}! Total: ${form.quantity * destination.price} ${destination.currency}`
    );
    navigate("/packages"); // Go back after booking
  };

  if (!destination) return <p className="text-center py-20">No destination selected.</p>;

  return (
    <>
      <Header />
      <section className="min-h-screen py-20 px-4 bg-gradient-to-b from-[#f7faf6] to-[#e5e7eb] flex justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-6xl overflow-hidden"
        >
          {/* Left: Destination Details */}
          <div className="md:w-1/2 relative">
            <img
              src={destination.image}
              alt={destination.destination}
              className="w-full h-full object-cover md:h-full"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-5 text-white">
              <h2 className="text-2xl font-bold">{destination.destination}</h2>
              <p className="flex items-center gap-2 text-sm mb-1">
                <FaMapMarkerAlt /> {destination.location}
              </p>
              <p className="text-lg font-semibold text-lime-400">
                {destination.price} {destination.currency}/person
              </p>
              <p className="text-sm mt-1">{destination.duration}</p>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold text-emerald-700 mb-6">
              Book Your Trip
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-emerald-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-emerald-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-emerald-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-emerald-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-emerald-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-emerald-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-emerald-400" />
                <textarea
                  name="address"
                  placeholder="Address"
                  rows={3}
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-emerald-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-20 text-center py-2 rounded-lg border border-emerald-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              {/* Total Amount */}
              <p className="text-lg font-semibold text-emerald-700">
                Total: {form.quantity * destination.price} {destination.currency}
              </p>

              {/* Payment Option */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Payment Method:</label>
                <div className="flex gap-3">
                  {["bkash", "nagad", "rocket"].map((method) => (
                    <label
                      key={method}
                      className="flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-emerald-50 transition"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={form.payment === method}
                        onChange={handleChange}
                        className="accent-emerald-500"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-bold shadow-lg hover:brightness-110 transition"
              >
                Confirm Booking
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default DestinationBook;
