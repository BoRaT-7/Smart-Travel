// src/Pages/TopDestination/DestinationBook.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const DestinationBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.destination;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    payment: "bkash",
  });

  if (!destination) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center text-white bg-sky-900">
          No destination selected.
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) || 1 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity) || 1,
          destinationId: destination.id,
          destinationName: destination.destination,
          destinationPrice: destination.price,
          destinationCurrency: destination.currency,
          destinationImage: destination.image,
          destinationLocation: destination.location,
          destinationDuration: destination.duration,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Booking failed");
      }

      const total = (Number(form.quantity) || 1) * destination.price;

      alert(
        `✅ Booking confirmed!\n${form.quantity} x ${
          destination.destination
        }\nTotal: ${total} ${destination.currency}`
      );

      navigate("/packages");
    } catch (err) {
      alert(err.message || "Booking failed");
    }
  };

  const total = (Number(form.quantity) || 1) * destination.price;

  return (
    <>
      <Header />

      <section className="min-h-screen pt-28 pb-20 px-4 bg-gradient-to-b from-sky-900 via-blue-900 to-cyan-900 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-cyan-300/30 
          rounded-3xl shadow-2xl flex flex-col md:flex-row 
          w-full max-w-6xl overflow-hidden"
        >
          {/* Left */}
          <div className="md:w-1/2 relative">
            <img
              src={destination.image}
              alt={destination.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h2 className="text-2xl font-bold">
                {destination.destination}
              </h2>
              <p className="flex items-center gap-2 text-sm">
                <FaMapMarkerAlt /> {destination.location}
              </p>
              <p className="text-cyan-300 font-semibold mt-1">
                {destination.price} {destination.currency}/person
              </p>
              <p className="text-sm">{destination.duration}</p>
            </div>
          </div>

          {/* Right */}
          <div className="md:w-1/2 p-8 text-white">
            <h2 className="text-2xl font-extrabold mb-6">
              Book Your Trip
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  name: "name",
                  icon: <FaUser />,
                  type: "text",
                  placeholder: "Full Name",
                },
                {
                  name: "email",
                  icon: <FaEnvelope />,
                  type: "email",
                  placeholder: "Email",
                },
                {
                  name: "phone",
                  icon: <FaPhone />,
                  type: "tel",
                  placeholder: "Phone",
                },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <span className="absolute left-3 top-3 text-cyan-300">
                    {field.icon}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-xl 
                    bg-white/10 border border-cyan-300/30 
                    focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              ))}

              <textarea
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                rows={3}
                className="w-full pl-4 pr-4 py-3 rounded-xl 
                bg-white/10 border border-cyan-300/30 
                focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <div className="flex items-center gap-4">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-20 text-center rounded-lg bg-white/10 border border-cyan-300/30"
                />
              </div>

              <p className="text-lg font-semibold text-cyan-300">
                Total: {total} {destination.currency}
              </p>

              <div className="flex gap-3">
                {["bkash", "nagad", "rocket"].map((method) => (
                  <label
                    key={method}
                    className="flex-1 flex items-center gap-2 p-2 
                    border border-cyan-300/30 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={form.payment === method}
                      onChange={handleChange}
                      className="accent-cyan-400"
                    />
                    <span className="capitalize">{method}</span>
                  </label>
                ))}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-xl 
                bg-gradient-to-r from-cyan-400 to-sky-500 
                text-sky-900 font-bold"
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
