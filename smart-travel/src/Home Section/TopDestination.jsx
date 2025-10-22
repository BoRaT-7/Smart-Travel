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

  // Fetch destinations
  useEffect(() => {
    fetch("/TopDestination/data.json")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load destinations.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [query]);

  const handleSeeMore = () => setVisibleCount(destinations.length);

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
    <section className="bg-gradient-to-b from-sky-50 via-white to-blue-50 py-16">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12 px-4">
        <p className="text-sky-600 font-semibold text-lg md:text-xl uppercase tracking-wider">
          Unforgettable Journeys
        </p>
        <h1 className="text-[#0B2E59] font-extrabold text-3xl sm:text-4xl md:text-5xl mt-3 leading-tight">
          Explore Top Destinations
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg">
          Where every destination becomes a beautiful story to remember.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex max-w-xl mx-auto bg-white rounded-full shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-sky-400 transition">
          <input
            type="text"
            placeholder="Search your destination..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none rounded-l-full"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-3 rounded-r-full hover:brightness-105 transition flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </div>

        {filteredDestinations.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No destinations match your search.
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10 lg:px-20">
        {filteredDestinations.slice(0, visibleCount).map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-72 overflow-hidden rounded-t-3xl">
              <img
                src={item.image}
                alt={item.destination}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Duration tag */}
              <div className="absolute top-4 left-4 bg-blue-600/80 text-white text-xs sm:text-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md font-medium">
                <Clock size={14} /> {item.duration}
              </div>
            </div>

            {/* Info & Buttons */}
            <div className="p-5 bg-[#0B2E59] rounded-b-3xl text-white flex flex-col justify-between h-52">
              <h2 className="text-2xl font-bold mb-2">{item.destination}</h2>

              {/* Price + Location Row */}
              <div className="flex justify-between items-center mt-1 text-sm">
                <p className="text-amber-300 font-semibold">
                  From <span className="text-white">{item.price}</span>{" "}
                  <span className="text-amber-400">{item.currency}</span>{" "}
                  <span className="text-gray-200 text-xs">(per person)</span>
                </p>
                <p className="flex items-center gap-1 text-gray-200 font-medium">
                  <MapPin size={14} /> {item.location}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => navigate(`/destination/${item.id}`)}
                  className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  View
                </button>
                <button
                  onClick={() =>
                    alert(`Booking for ${item.destination} coming soon!`)
                  }
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See All Button */}
      {visibleCount < filteredDestinations.length && (
        <div className="text-center mt-12">
          <motion.button
            onClick={handleSeeMore}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 30px rgba(56,189,248,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 font-semibold text-white text-lg rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 shadow-lg hover:brightness-110 transition-all duration-300"
          >
            See All Destinations →
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default TopDestination;
