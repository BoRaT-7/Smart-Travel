import React, { useEffect, useState, useMemo } from "react";
import { FaStar, FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const HotelBooking = () => {
  const [hotels, setHotels] = useState([]);
  const [visible, setVisible] = useState(6);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load JSON data
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

  // Reset visible when searching
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

  const handleSeeMore = () => setVisible(filteredHotels.length);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-green-800"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-300 py-12 px-6 transition-colors duration-700">
      <h2 className="font-extrabold text-4xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-400">
        Find Your Perfect Hotel
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search hotels by name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 text-gray-800 placeholder-gray-300 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-200 hover:text-white transition"
            >
              <FaTimes />
            </button>
          )}
          <FaSearch className="absolute right-10 top-1/2 -translate-y-1/2 text-white" />
        </div>
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center text-gray-200 py-10">
          No hotels match your search. 😔
        </div>
      )}

      {/* Hotels Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredHotels.slice(0, visible).map((hotel, index) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800">{hotel.name}</h3>
              <p className="flex items-center text-gray-600 text-sm mt-1">
                <FaMapMarkerAlt className="mr-1 text-red-500" /> {hotel.location}
              </p>
              <p className="text-gray-700 font-semibold mt-2">
                ${hotel.price} / night
              </p>
              <div className="flex mt-2">
                {Array.from({ length: hotel.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Motion Book Now Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full py-2 rounded-full text-green-700 border-2 border-green-600 text-lg font-semibold shadow-md bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 transition-all duration-300"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motion See More Button */}
      {visible < filteredHotels.length && (
        <div className="text-center mt-12">
          <motion.button
            onClick={handleSeeMore}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16,185,129,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 font-semibold text-green-700 border-2 border-green-600 text-lg rounded-full bg-transparent shadow-md hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 transition-all duration-300"
          >
            See More
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default HotelBooking;
