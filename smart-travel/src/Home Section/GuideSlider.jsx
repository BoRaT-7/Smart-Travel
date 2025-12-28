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
    <div className="w-full bg-[#F8F8F5] py-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-emerald-600">
        Meet Our Tour Guides
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search guides by name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-5 py-3 pr-12 rounded-full border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 placeholder-gray-400 bg-white transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes />
            </button>
          )}
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-lg" />
        </div>
      </div>

      {/* Guides Slider */}
      {filteredGuides.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No guides found.</p>
      ) : (
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto px-4 scrollbar-hide scroll-smooth"
        >
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md overflow-hidden border border-emerald-200 hover:shadow-lg transition-all"
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <a
                    href={guide.social?.whatsapp || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaWhatsapp className="text-emerald-600 bg-white p-1 rounded-full w-7 h-7" />
                  </a>
                  <a
                    href={guide.social?.instagram || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="text-pink-500 bg-white p-1 rounded-full w-7 h-7" />
                  </a>
                  <a
                    href={guide.social?.facebook || "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook className="text-blue-600 bg-white p-1 rounded-full w-7 h-7" />
                  </a>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => handleContactClick(guide)}
                  className="w-full border-2 border-emerald-600 bg-transparent text-emerald-600 px-5 py-2 rounded-full font-medium hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 hover:text-white hover:brightness-110 transition"
                >
                  Contact
                </button>
                <h3 className="text-lg font-semibold text-gray-800">
                  {guide.name}
                </h3>
                <p className="flex items-center text-gray-600 text-sm">
                  <FaMapMarkerAlt className="mr-1 text-red-500" />{" "}
                  {guide.location}
                </p>
                <p className="text-gray-500 text-sm">{guide.role}</p>
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

      {/* See More button -> /guides */}
      <div className="text-center mt-8">
        <button
          onClick={handleSeeMore}
          className="border-2 border-emerald-600 bg-transparent text-emerald-600 px-5 py-2 rounded-full font-medium hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 hover:text-white hover:brightness-110 transition"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default GuideSlider;
