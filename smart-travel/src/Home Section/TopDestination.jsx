import React, { useEffect, useState, useMemo } from "react";
import { MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const TopDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch destinations from JSON
  useEffect(() => {
    fetch("/TopDestination/data.json")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load destinations.");
        setLoading(false);
      });
  }, []);

  // Reset visibleCount on query change
  useEffect(() => {
    setVisibleCount(6);
  }, [query]);

  const handleSeeMore = () => setVisibleCount(destinations.length);

  // Filter destinations by search query
  const filteredDestinations = useMemo(
    () =>
      destinations.filter(
        (item) =>
          item.destination.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      ),
    [destinations, query]
  );

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
    );

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 -mt-12">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-10 px-4">
        <p className="text-blue-600 font-medium text-lg md:text-xl tracking-wide uppercase">
          Travel Experience
        </p>
        <h1 className="text-[#143E5F] font-extrabold text-3xl sm:text-4xl md:text-5xl mt-3 leading-tight">
          Explore Top Destinations
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg">
          Discover breathtaking landscapes, vibrant cultures, and unforgettable travel adventures.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex max-w-xl mx-auto bg-white rounded-full shadow-md overflow-hidden border border-gray-200"
        >
          <input
            type="text"
            placeholder="Search your location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-3 rounded-r-full hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </form>

        {filteredDestinations.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No destinations match your search.
          </p>
        )}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10 lg:px-20">
        {filteredDestinations.slice(0, visibleCount).map((item) => (
          <motion.div
            key={item.id}
            className="card bg-white/90 backdrop-blur-md shadow-md hover:shadow-2xl transition duration-300 rounded-2xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Image */}
            <figure className="relative">
              <img
                src={item.image}
                alt={item.destination}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs md:text-sm px-3 py-1 rounded-full flex items-center gap-1 shadow">
                <Clock size={14} /> {item.duration}
              </div>
            </figure>

            {/* Content */}
            <div className="bg-[#0f304a] text-white p-5 rounded-b-2xl">
              <h2 className="text-xl font-bold">{item.destination}</h2>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <MapPin size={16} /> {item.location}
                </p>
                <p className="text-right text-red-400 font-semibold">
                  From {item.price} <span className="text-red-500">{item.currency}</span>
                </p>
              </div>
              <div className="mt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  onClick={() => navigate(`/destination/${item.id}`)}
                  className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white font-semibold px-4 py-2 rounded-lg transition w-full sm:w-auto"
                >
                  View Details
                </button>
                <button
                  onClick={() => alert(`Booking for ${item.destination} coming soon!`)}
                  className="btn btn-sm bg-green-600 hover:bg-green-700 border-none text-white font-semibold px-4 py-2 rounded-lg transition w-full sm:w-auto"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
 
{visibleCount < filteredDestinations.length && (
  <div className="text-center mt-4 px-4 sm:px-20">
    <motion.button
      onClick={handleSeeMore}
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 25px rgba(56,189,248,0.4)" }}
      whileTap={{ scale: 0.97 }}
      className="w-full px-6 py-3 font-medium text-black transition-all duration-300 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#157ECE] shadow-md hover:from-[#0ea5e9] hover:to-[#38bdf8]"
    >
      <span className="text-xl font-bold tracking-wide">See More</span>
    </motion.button>
  </div>
)}
    </section>
  );
};

export default TopDestination;
