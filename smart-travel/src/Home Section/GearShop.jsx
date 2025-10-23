import React, { useEffect, useState, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const GearShop = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(8);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/Gear Shop/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  useEffect(() => setVisible(9), [query]);

  const handleSeeMore = () => setVisible(products.length);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fff9] to-[#eaf9ef]">
      {/* 🌿 Header Section */}
      <div className="text-center bg-gradient-to-r from-[#0B8146] via-[#13A05F] to-[#17B169] text-white py-10 rounded-b-3xl shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-bold text-3xl sm:text-4xl md:text-5xl"
        >
          Premium Travel Gear
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-green-50 mt-3 text-base sm:text-lg max-w-2xl mx-auto"
        >
          Explore quality gear designed for explorers — durable, stylish, and made for adventures.
        </motion.p>

        {/* 🔍 Search Bar */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-6 flex max-w-xl mx-auto bg-white rounded-full shadow-lg overflow-hidden border border-green-100 relative"
        >
          <input
            type="text"
            placeholder="Search your gear..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-l-full"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes />
            </button>
          )}
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded-r-full hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </motion.form>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-6 text-green-100 flex flex-col items-center gap-3">
            <p>No matching gear found.</p>
            <div className="text-3xl animate-pulse">🎒</div>
          </div>
        )}
      </div>

      {/* 🛒 Products Grid */}
      <div className="grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
        {filteredProducts.slice(0, visible).map((item, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <figure className="overflow-hidden">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-52 object-cover transition-transform duration-700 hover:scale-105"
              />
            </figure>
            <div className="p-5 text-center">
              <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>

              {/* 💰 Price & Rating */}
              <div className="flex justify-between items-center mt-3 px-2">
                <p className="text-lg font-semibold text-green-700">
                  {item.price} {item.currency}
                </p>
                <div className="flex items-center">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* 🛍 Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 mt-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#0B8146] via-[#13A05F] to-[#17B169] hover:from-[#13A05F] hover:to-[#0B8146] transition"
              >
                {item.button_text || "Book Now"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🌿 See More Button */}
      {visible < filteredProducts.length && (
        <div className="text-center mt-12 px-6">
          <motion.button
            onClick={handleSeeMore}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 30px rgba(16,185,129,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            className="w-full max-w-md px-6 py-3 font-medium text-white rounded-full bg-gradient-to-r from-[#13A05F] via-[#0B8146] to-[#17B169] shadow-lg hover:from-[#17B169] hover:to-[#0B8146] transition-all"
          >
            <span className="text-lg font-semibold tracking-wide">
              See More
            </span>
          </motion.button>
        </div>
      )}
    </div> 
  );
};

export default GearShop;
