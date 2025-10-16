import React, { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react"; // icons

const TopDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6); // show 6 initially

  useEffect(() => {
    fetch("/Top Destination/data.json") // removed "public" folder; React uses "public" automatically
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const handleSeeMore = () => setVisibleCount(destinations.length);

  return (
    <div>
      {/* Header Section */}
      <div className="text-center bg-gray-100 py-12 px-4 md:px-8 lg:px-20">
        <p className="text-gray-800 font-normal text-lg md:text-2xl lg:text-3xl">
          Travel Experience
        </p>

        <h1 className="text-[#143E5F] font-bold font-['Roboto'] mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          Explore Top Destinations
        </h1>

        <p className="text-gray-600 mt-6 text-base sm:text-lg md:text-xl lg:text-lg max-w-4xl mx-auto">
          Discover breathtaking landscapes, rich cultures, and unforgettable travel moments. From
          mountain adventures to serene beach getaways, we have the perfect tour for you. Enjoy
          handpicked stays, expert guides, and seamless travel — stress-free.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5">
        {destinations.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-white transition hover:shadow-2xl relative"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.destination}
              className="w-full h-56 object-cover"
            />

            {/* Duration Badge */}
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-4 py-1 rounded-full flex items-center gap-2 shadow-md">
              <Clock size={16} />
              {item.duration}
            </div>

            {/* Content */}
            <div className="bg-[#0f304a] text-white p-5 mt-[-5px] relative">
              <h2 className="text-2xl font-bold">{item.destination}</h2>
              <p className="flex items-center gap-2 text-sm text-gray-300 mt-1 mb-3">
                <MapPin size={16} /> {item.location}
              </p>

              <div className="flex justify-between items-center">
                <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-semibold text-sm">
                  {item.buttonText}
                </button>
                <p className="text-right text-red-400 font-bold text-sm">
                  Starting From {item.price}
                  <span className="text-red-500"> {item.currency}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {visibleCount < destinations.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleSeeMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default TopDestination;
