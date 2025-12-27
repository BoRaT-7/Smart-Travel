// src/Pages/HotelBooking/HotelBook.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";

const HotelBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    guests: 1,
  });

  useEffect(() => {
    fetch("/HotelBooking/data.json")
      .then((res) => res.json())
      .then((data) => setHotel(data.find((h) => String(h.id) === id)));
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut && hotel) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffTime = outDate - inDate;
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (diffDays > 0) {
        setNights(diffDays);
        setTotal(diffDays * hotel.price);
      } else {
        setNights(0);
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, hotel]);

  if (!hotel)
    return (
      <div className="flex justify-center py-20 text-gray-500">Loading...</div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut || nights <= 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/hotel-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          nights,
          payment: "cash",
          hotelId: hotel.id,
          hotelName: hotel.name,
          hotelLocation: hotel.location,
          hotelPrice: hotel.price,
          hotelImage: hotel.image,
          hotelRating: hotel.rating,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Hotel booking failed");
      }

      navigate("/hotel/confirm", {
        state: {
          hotel,
          booking: {
            nights,
            total,
            checkIn,
            checkOut,
            name: form.name,
            email: form.email,
          },
        },
      });
    } catch (err) {
      console.error("Hotel booking error:", err);
      alert(err.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-10">
      <Header />

      <section className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-72 object-cover"
          />
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800">{hotel.name}</h2>
            <p className="text-gray-600 mt-2">{hotel.location}</p>
            <p className="text-2xl text-emerald-700 font-semibold mt-2">
              ${hotel.price} / night
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid sm:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={form.address}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
              />

              <input
                type="date"
                placeholder="Check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg"
              />
              <input
                type="date"
                placeholder="Check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg"
              />

              <input
                type="number"
                min="1"
                name="guests"
                placeholder="Guests"
                value={form.guests}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg"
              />

              <div className="col-span-2 mt-3 text-gray-700 text-lg font-medium">
                {nights > 0 ? (
                  <p>
                    Staying for <span className="font-bold">{nights}</span>{" "}
                    {nights === 1 ? "night" : "nights"} — Total:{" "}
                    <span className="text-emerald-700 font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </p>
                ) : (
                  <p>
                    Select valid check-in and check-out dates to calculate total
                    price.
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  background: "linear-gradient(to right, #059669, #A3E635)",
                }}
                whileTap={{ scale: 0.95 }}
                className="col-span-2 bg-gradient-to-r from-emerald-600 to-lime-500 text-white py-3 rounded-lg font-bold shadow-md mt-2"
              >
                Confirm Booking
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HotelBook;
