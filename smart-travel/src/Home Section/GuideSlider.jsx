import React, { useEffect, useState, useRef, useMemo } from "react";
import { FaStar, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaSearch, FaTimes } from "react-icons/fa";

const GuideSlider = () => {
  const [guides, setGuides] = useState([]);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  // Load JSON data
  useEffect(() => {
    fetch("/Guide/data.json")
      .then((res) => res.json())
      .then((data) => setGuides(data))
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  // Auto-scroll slider
  useEffect(() => {
    if (!containerRef.current || guides.length === 0) return;

    const scrollAmount = containerRef.current.offsetWidth / 4; // scroll by one card
    const interval = setInterval(() => {
      if (containerRef.current) {
        if (containerRef.current.scrollLeft + containerRef.current.offsetWidth >= containerRef.current.scrollWidth) {
          containerRef.current.scrollLeft = 0;
        } else {
          containerRef.current.scrollLeft += scrollAmount;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [guides]);

  // Filtered guides based on search query
  const filteredGuides = useMemo(
    () =>
      guides.filter(
        (guide) =>
          guide.name.toLowerCase().includes(query.toLowerCase()) ||
          guide.location.toLowerCase().includes(query.toLowerCase())
      ),
    [guides, query]
  );

  return (
    <div className="w-full bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
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
            className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            >
              <FaTimes />
            </button>
          )}
          <FaSearch className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400" />
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
              className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-2xl transition-all"
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <a href={guide.social?.whatsapp || "#"} target="_blank" rel="noreferrer">
                    <FaWhatsapp className="text-green-500 bg-white p-1 rounded-full w-7 h-7" />
                  </a>
                  <a href={guide.social?.instagram || "#"} target="_blank" rel="noreferrer">
                    <FaInstagram className="text-pink-500 bg-white p-1 rounded-full w-7 h-7" />
                  </a>
                  <a href={guide.social?.facebook || "#"} target="_blank" rel="noreferrer">
                    <FaFacebook className="text-blue-600 bg-white p-1 rounded-full w-7 h-7" />
                  </a>
                </div>
              </div>
              <div className="p-4">
                <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm mb-2 hover:bg-blue-700 transition">
                  Contact
                </button>
                <h3 className="text-lg font-semibold text-gray-800">{guide.name}</h3>
                <p className="flex items-center text-gray-600 text-sm">
                  <FaMapMarkerAlt className="mr-1 text-red-500" /> {guide.location}
                </p>
                <p className="text-gray-500 text-sm">{guide.role}</p>
                <div className="flex mt-2">
                  {Array.from({ length: Math.floor(guide.rating) }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold">
          See All
        </button>
      </div>
    </div>
  );
};

export default GuideSlider;
