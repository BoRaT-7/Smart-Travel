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
      <div className="flex justify-center py-20 text-cyan-300">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-cyan-900 to-blue-950">
      <Header />

      <section className="max-w-5xl mx-auto py-12 px-6">
        {/* Glass Card */}
        <div className="backdrop-blur-2xl bg-white/10 border border-cyan-400/20 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.25)] overflow-hidden">
          {/* Image */}
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-96 object-cover"
          />

          {/* Content */}
          <div className="p-6">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              {hotel.name}
            </h2>

            <p className="flex items-center text-cyan-200 mt-2">
              <FaMapMarkerAlt className="mr-2 text-cyan-400" />
              {hotel.location}
            </p>

            {/* Rating */}
            <div className="flex gap-1 mt-3">
              {Array.from({ length: hotel.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>

            {/* Description */}
            <p className="mt-4 text-cyan-100 leading-relaxed">
              {hotel.description ||
                "Experience comfort with world-class service and premium amenities in a SmartTravel selected hotel."}
            </p>

            {/* Price */}
            <p className="mt-4 text-3xl font-bold text-cyan-300">
              ${hotel.price}
              <span className="text-base font-medium text-cyan-200">
                {" "}
                / night
              </span>
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/hotel/book/${hotel.id}`)}
                className="bg-gradient-to-r from-cyan-500 to-sky-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-cyan-500/30"
              >
                Book Now
              </motion.button>

              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => navigate("/hotel")}
                className="text-cyan-300 font-semibold hover:underline"
              >
                ← Back to All Hotels
              </motion.button>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default HotelDetails;
