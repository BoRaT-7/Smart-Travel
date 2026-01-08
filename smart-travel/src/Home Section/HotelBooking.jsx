import React, { useEffect, useState, useMemo } from "react";
import { FaStar, FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HotelBooking = () => {
  const [hotels, setHotels] = useState([]);
  const [visible, setVisible] = useState(6);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/HotelBooking/data.json")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load hotels:", err);
        setError("Failed to load hotels.");
        setLoading(false);
      });
  }, []);

  useEffect(() => setVisible(6), [query]);

  const filteredHotels = useMemo(
    () =>
      hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query.toLowerCase()) ||
          hotel.location.toLowerCase().includes(query.toLowerCase())
      ),
    [hotels, query]
  );

  if (loading)
    return (
      <div className="flex justify-center items-center py-24">
        <span className="loading loading-spinner loading-lg text-cyan-400"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-24 text-red-400 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B18] via-[#08172E] to-[#020617] py-14 px-6 text-white transition-colors duration-700">
      <h2 className="font-extrabold text-4xl sm:text-5xl text-center pb-6 bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">
        Find Your Perfect Hotel
      </h2>

      {/* Search Bar */}
      <motion.form
        onSubmit={(e) => e.preventDefault()}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 flex max-w-xl mx-auto bg-white/10 backdrop-blur-xl rounded-full border border-cyan-400/30 overflow-hidden relative"
      >
        <input
          type="text"
          placeholder="Search hotels by name or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-6 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
          >
            <FaTimes />
          </button>
        )}

        <motion.button
          type="submit"
          whileHover={{
            scale: 1.05,
            background: "linear-gradient(to right, #06b6d4, #0ea5e9)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-6 py-3 rounded-r-full flex items-center gap-2 font-semibold"
        >
          <FaSearch /> Search
        </motion.button>
      </motion.form>

      {filteredHotels.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-gray-300 flex flex-col items-center gap-3"
        >
          <p>No hotels match your search.</p>
          <div className="text-3xl animate-pulse">🏨</div>
        </motion.div>
      )}

      {/* Hotels Grid */}
      <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.slice(0, visible).map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(34,211,238,0.25)",
            }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-cyan-400/20 overflow-hidden transition-all duration-300"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="p-5">
              <h3 className="text-lg font-bold text-cyan-400">
                {hotel.name}
              </h3>

              <p className="flex items-center text-gray-300 text-sm mt-1">
                <FaMapMarkerAlt className="mr-1 text-sky-400" />
                {hotel.location}
              </p>

              <p className="text-sky-400 font-semibold mt-2">
                ${hotel.price} / night
              </p>

              <div className="flex mt-2">
                {Array.from({ length: hotel.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <motion.button
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 rounded-full text-cyan-400 border border-cyan-400 font-semibold bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 transition-all duration-300"
                >
                  Hotel Details
                </motion.button>

                <motion.button
                  onClick={() => navigate(`/hotel/book/${hotel.id}`)}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 rounded-full text-cyan-400 border border-cyan-400 font-semibold bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More */}
      {visible < filteredHotels.length && (
        <div className="text-center mt-16">
          <motion.button
            onClick={() => navigate("/hotel")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(34,211,238,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 font-semibold text-cyan-400 border border-cyan-400 rounded-full bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 transition-all duration-300"
          >
            See More
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default HotelBooking;
