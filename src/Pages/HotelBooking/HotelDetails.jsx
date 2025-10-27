import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    fetch("/HotelBooking/data.json")
      .then((res) => res.json())
      .then((data) => setHotel(data.find((h) => String(h.id) === id)));
  }, [id]);

  if (!hotel)
    return (
      <div className="flex justify-center py-20 text-gray-500">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 mt-10">
      <Header />
      <section className="max-w-5xl mx-auto py-10 px-6">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-96 object-cover rounded-2xl shadow-lg"
        />
        <h2 className="text-4xl font-bold mt-6 text-gray-800">{hotel.name}</h2>
        <p className="flex items-center text-gray-600 mt-2">
          <FaMapMarkerAlt className="mr-2 text-red-500" /> {hotel.location}
        </p>
        <div className="flex gap-1 mt-3">
          {Array.from({ length: hotel.rating }).map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        </div>
        <p className="mt-4 text-gray-700 leading-relaxed">
          {hotel.description ||
            "Experience comfort with world-class service and amenities. Perfect for your vacation or business trip."}
        </p>
        <p className="mt-3 text-2xl text-emerald-700 font-bold">
          ${hotel.price} / night
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/hotel/book/${hotel.id}`)}
          className="mt-6 bg-gradient-to-r from-emerald-600 to-lime-500 text-white px-6 py-3 rounded-full font-semibold shadow-md"
        >
          Book Now
        </motion.button>

        <motion.button
          onClick={() => navigate("/hotel")}
          className="ml-4 text-emerald-700 font-semibold hover:underline"
        >
          ← Back to All Hotels
        </motion.button>
      </section>
      <Footer />
    </div>
  );
};

export default HotelDetails;
