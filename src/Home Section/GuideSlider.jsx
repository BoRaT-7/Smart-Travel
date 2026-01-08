// src/components/GuideSlider.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GuideSlider = () => {
  const [guides, setGuides] = useState([]);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Guide/data.json")
      .then((res) => res.json())
      .then((data) => setGuides(data))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  useEffect(() => {
    if (!containerRef.current || guides.length === 0) return;

    const scrollAmount = containerRef.current.offsetWidth / 4;
    const interval = setInterval(() => {
      if (containerRef.current) {
        if (
          containerRef.current.scrollLeft +
            containerRef.current.offsetWidth >=
          containerRef.current.scrollWidth
        ) {
          containerRef.current.scrollLeft = 0;
        } else {
          containerRef.current.scrollLeft += scrollAmount;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [guides]);

  const filteredGuides = useMemo(
    () =>
      guides.filter(
        (guide) =>
          guide.name.toLowerCase().includes(query.toLowerCase()) ||
          guide.location.toLowerCase().includes(query.toLowerCase())
      ),
    [guides, query]
  );

  const handleContactClick = (guide) => {
    navigate("/contact");
  };

  const handleSeeMore = () => {
    navigate("/guides");
  };

  return (
    <div className="w-full py-16 bg-gradient-to-br from-[#050B18] via-[#08172E] to-[#020617] text-white">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">
        Meet Our Tour Guides
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-10 px-4">
        <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-full border border-cyan-400/30">
          <input
            type="text"
            placeholder="Search guides by name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-3 pr-14 rounded-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
            >
              <FaTimes />
            </button>
          )}
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
        </div>
      </div>

      {/* Guides Slider */}
      {filteredGuides.length === 0 ? (
        <p className="text-center text-gray-400 py-12">
          No guides found.
        </p>
      ) : (
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto px-6 scrollbar-hide scroll-smooth"
        >
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="flex-shrink-0 w-64 bg-white/10 backdrop-blur-xl rounded-2xl border border-cyan-400/20 overflow-hidden hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <a
                    href={guide.social?.whatsapp || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp className="text-cyan-500 bg-white/90 p-1.5 rounded-full w-7 h-7" />
                  </a>
                  <a
                    href={guide.social?.instagram || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="text-pink-500 bg-white/90 p-1.5 rounded-full w-7 h-7" />
                  </a>
                  <a
                    href={guide.social?.facebook || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook className="text-blue-500 bg-white/90 p-1.5 rounded-full w-7 h-7" />
                  </a>
                </div>
              </div>

              <div className="p-4">
                <button
                  onClick={() => handleContactClick(guide)}
                  className="w-full mb-3 border border-cyan-400 text-cyan-400 px-5 py-2 rounded-full font-medium bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 transition-all duration-300"
                >
                  Contact
                </button>

                <h3 className="text-lg font-semibold text-cyan-400">
                  {guide.name}
                </h3>

                <p className="flex items-center text-gray-300 text-sm">
                  <FaMapMarkerAlt className="mr-1 text-sky-400" />
                  {guide.location}
                </p>

                <p className="text-gray-400 text-sm">{guide.role}</p>

                <div className="flex mt-2">
                  {Array.from({ length: Math.floor(guide.rating) }).map(
                    (_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* See More */}
      <div className="text-center mt-10">
        <button
          onClick={handleSeeMore}
          className="border border-cyan-400 text-cyan-400 px-6 py-2 rounded-full font-medium bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 transition-all duration-300"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default GuideSlider;
