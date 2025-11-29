import React, { useEffect, useState, useMemo, useRef } from "react";
import { MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const TopDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

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

  const filteredDestinations = useMemo(
    () =>
      destinations.filter(
        (item) =>
          item.destination.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      ),
    [destinations, query]
  );

  useEffect(() => {
    if (!containerRef.current || filteredDestinations.length === 0) return;

    const scrollAmount = containerRef.current.offsetWidth / 2;

    const interval = setInterval(() => {
      if (!isHovered && containerRef.current) {
        if (
          containerRef.current.scrollLeft + containerRef.current.offsetWidth >=
          containerRef.current.scrollWidth
        ) {
          containerRef.current.scrollLeft = 0;
        } else {
          containerRef.current.scrollLeft += scrollAmount;
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [filteredDestinations, isHovered]);

  const handleSeeMore = () => {
    navigate("/packages");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
    );

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 px-4 relative z-10">
        <p className="text-emerald-600 font-semibold text-xs md:text-sm uppercase tracking-widest">
          LiteTravel Picks
        </p>

        <h2 className="text-[#1a1a1a] font-extrabold text-3xl sm:text-4xl mt-1">
          Popular Destinations
        </h2>

        <p className="text-gray-600 mt-1 text-sm md:text-base max-w-lg mx-auto">
          Travel light, simple, and smarter with LiteTravel.
        </p>

        {/* Search Bar */}
        <div className="mt-5 flex max-w-md mx-auto bg-white border border-emerald-300 rounded-full shadow-sm focus-within:ring-1 focus-within:ring-emerald-600 transition">
          <input
            type="text"
            placeholder="Search destinations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none rounded-l-full bg-transparent text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-5 py-2 rounded-r-full hover:bg-emerald-700 transition flex items-center gap-2 text-sm sm:text-base font-medium"
          >
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={containerRef}
        className="relative z-10 flex gap-6 overflow-x-auto px-6 md:px-10 lg:px-20 scrollbar-hide scroll-smooth"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {filteredDestinations.slice(0, visibleCount).map((item) => (
          <motion.div
            key={item.id}
            whileHover={{
              y: -4,
              scale: 1.03,
              boxShadow: "0 20px 30px rgba(16,185,129,0.15)",
            }}
            className="flex-shrink-0 w-80 rounded-2xl overflow-hidden bg-white shadow-sm border border-emerald-200 transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={item.image}
                alt={item.destination}
                className="w-full h-full object-cover transition-transform duration-700"
              />

              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full flex items-center gap-1 font-medium shadow">
                <Clock size={14} /> {item.duration}
              </div>
            </div>

            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-gray-800">
                  {item.destination}
                </h2>
                <p className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <MapPin size={15} /> {item.location}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <p className="text-emerald-600 font-semibold text-lg">
                  {item.price}
                  <span className="text-sm text-gray-400 ml-1">
                    {item.currency}/person
                  </span>
                </p>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/destination/${item.id}`)}
                    className="px-4 py-2 rounded-lg border border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-600 hover:text-white transition"
                  >
                    View
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      navigate("/destination/book", {
                        state: { destination: item },
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                  >
                    Book
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More */}
      {visibleCount < filteredDestinations.length && (
        <div className="text-center mt-12 relative z-10">
          <motion.button
            onClick={handleSeeMore}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 font-semibold text-emerald-600 border-2 border-emerald-600 text-lg rounded-full bg-transparent hover:bg-emerald-600 hover:text-white transition-all duration-300"
          >
            Show More →
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default TopDestination;
