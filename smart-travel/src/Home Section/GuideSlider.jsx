import React, { useEffect, useState, useRef } from "react";
import { FaStar, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const GuideSlider = () => {
  const [guides, setGuides] = useState([]);
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

  if (guides.length === 0) {
    return <p className="text-center py-10 text-gray-700">Loading tour guides...</p>;
  }

  return (
    <div className="w-full bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Meet Our Tour Guides
      </h2>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto px-4 scrollbar-hide scroll-smooth"
      >
        {guides.map((guide) => (
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

      <div className="text-center mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold">
          See All
        </button>
      </div>
    </div>
  );
};

export default GuideSlider;
