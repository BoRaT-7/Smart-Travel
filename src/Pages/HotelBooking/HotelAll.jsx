import React, { useEffect, useState, useMemo } from "react";
import { FaStar, FaMapMarkerAlt, FaTimes, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const HotelAll = () => {
  const [hotels, setHotels] = useState([]);
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
      .catch(() => {
        setError("Failed to load hotels.");
        setLoading(false);
      });
  }, []);

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
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-green-800"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-300 mt-10">
  

      <section className="py-12 px-6">
        <h2 className="font-extrabold text-4xl text-center pb-5 text-emerald-600">
          All Hotels
        </h2>

        {/* Search Bar */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 flex max-w-xl mx-auto bg-white rounded-full shadow-md overflow-hidden border border-emerald-300 relative"
        >
          <input
            type="text"
            placeholder="Search hotels by name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 text-gray-800 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <FaTimes />
            </button>
          )}
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(to right, #059669, #A3E635)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white px-6 py-3 rounded-r-full flex items-center gap-2"
          >
            <FaSearch /> Search
          </motion.button>
        </motion.form>

        {/* Hotels */}
        <div className="grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
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

                <div className="flex gap-2 mt-4">
                  {/* Hotel Details Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    className="flex-1 py-2 rounded-full text-white bg-emerald-600 hover:bg-lime-500 font-semibold"
                  >
                    Hotel Details
                  </motion.button>

                  {/* ✅ Book Now Button Added */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/hotel/book/${hotel.id}`)}
                    className="flex-1 py-2 rounded-full text-green-700 border-2 border-green-600 font-semibold hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 transition-all"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default HotelAll;
