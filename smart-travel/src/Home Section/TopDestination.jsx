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
  const [visibleCount] = useState(6);
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

  const filteredDestinations = useMemo(() => {
    return destinations.filter(
      (item) =>
        item.destination.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );
  }, [destinations, query]);

  // Auto scroll (safe)
  useEffect(() => {
    if (!containerRef.current || isHovered) return;

    const el = containerRef.current;
    const scrollAmount = el.offsetWidth * 0.6;

    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [filteredDestinations, isHovered]);

  /* ---------- STATES ---------- */
  if (loading)
    return (
      <div className="flex justify-center items-center py-28">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-28 text-red-400 font-semibold">
        {error}
      </div>
    );

  return (
    <section
      id="top-destination"
      className="
        relative overflow-hidden
        pt-28 pb-24
        bg-gradient-to-b from-sky-900 via-blue-900 to-cyan-900
      "
    >
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_60%)]" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-14 px-4">
        <p className="text-cyan-300 font-semibold text-xs uppercase tracking-widest">
          SmartTravel Picks
        </p>

        <h2 className="text-white font-extrabold text-3xl sm:text-4xl mt-3">
          Popular Destinations
        </h2>

        <p className="text-sky-100 mt-4 text-sm md:text-base max-w-lg mx-auto">
          Handpicked destinations crafted for smart travelers.
        </p>

        {/* Search */}
        <div className="mt-8 flex max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-cyan-300/30 rounded-full shadow-lg focus-within:ring-2 focus-within:ring-cyan-400 transition">
          <input
            type="text"
            placeholder="Search destinations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 text-white placeholder-sky-200 bg-transparent focus:outline-none rounded-l-full text-sm"
          />
          <button className="px-6 bg-gradient-to-r from-cyan-400 to-sky-500 text-sky-900 font-semibold rounded-r-full flex items-center gap-2 hover:brightness-110 transition">
            <FaSearch />
            Search
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          relative z-10 flex gap-10
          overflow-x-auto scroll-smooth
          px-6 sm:px-10 lg:px-20
        "
      >
        {filteredDestinations.slice(0, visibleCount).map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -10 }}
            className="
              flex-shrink-0 w-[320px]
              rounded-3xl overflow-hidden
              bg-white/10 backdrop-blur-xl
              border border-cyan-300/30
              shadow-xl hover:shadow-cyan-400/30
              transition-all duration-500
            "
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <motion.img
                src={item.image}
                alt={item.destination}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 bg-cyan-400/90 text-sky-900 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold shadow">
                <Clock size={13} /> {item.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col h-[210px]">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {item.destination}
                </h3>
                <p className="flex items-center gap-2 text-sky-200 text-sm mt-2">
                  <MapPin size={14} /> {item.location}
                </p>
              </div>

              <div className="mt-auto">
                <p className="text-cyan-300 font-bold text-lg mb-5">
                  {item.price}
                  <span className="text-xs text-sky-200 ml-1">
                    {item.currency}/person
                  </span>
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/destination/${item.id}`)}
                    className="flex-1 py-2 rounded-xl border border-cyan-300 text-cyan-300 font-semibold hover:bg-cyan-400 hover:text-sky-900 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate("/destination/book", {
                        state: { destination: item },
                      })
                    }
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-sky-900 font-semibold hover:brightness-110 transition"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      {filteredDestinations.length > visibleCount && (
        <div className="text-center mt-20 relative z-10">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/packages")}
            className="px-12 py-3 font-semibold text-cyan-300 border-2 border-cyan-300 rounded-full hover:bg-cyan-400 hover:text-sky-900 transition"
          >
            Show More →
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default TopDestination;
