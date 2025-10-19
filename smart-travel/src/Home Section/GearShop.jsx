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
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-semibold">{error}</div>
    );

  return (
    <div className="min-h-screen -mt-10">
      {/* Header */}
      <div className="text-center bg-gray-100 py-6 px-4 md:px-8 lg:px-20">
        <p className="text-gray-800 font-normal text-lg md:text-2xl lg:text-3xl">
          Read The Top
        </p>
        <h1 className="text-[#143E5F] font-bold mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          Shop Gear
        </h1>
        <p className="text-gray-600 mt-6 text-base sm:text-lg md:text-xl lg:text-lg max-w-4xl mx-auto">
          Discover breathtaking landscapes, rich cultures, and unforgettable travel moments. Find the perfect gear for your adventures with ease.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex max-w-xl mx-auto bg-white rounded-full shadow-md overflow-hidden border border-gray-200 relative"
        >
          <input
            type="text"
            placeholder="Search your product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full"
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
            className="bg-blue-600 text-white px-5 py-3 rounded-r-full hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </form>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-6 text-gray-500 flex flex-col items-center gap-3">
            <p>No products match your search.</p>
            <div className="text-3xl animate-pulse">🛒</div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
        {filteredProducts.slice(0, visible).map((item, index) => (
          <motion.div
            key={index}
            className="card bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
          >
            <figure className="overflow-hidden">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
              />
            </figure>
            <div className="card-body text-center p-5">
              <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>

              {/* Price and Rating on same line */}
         {/* Price on left, Rating on right */}
<div className="flex justify-between items-center mt-3 px-4">
  <p className="text-lg font-semibold text-blue-700">
    Price: {item.price} {item.currency}
  </p>
  <div className="flex items-center">
    {Array.from({ length: item.rating }).map((_, i) => (
      <span key={i} className="text-yellow-400 text-lg">
        ★
      </span>
    ))}
  </div>
</div>


              {/* Add to Cart / Book Now Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 mt-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-500 transition"
              >
                {item.button_text || "Book Now"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
      {visible < filteredProducts.length && (
        <div className="text-center mt-10 px-4 sm:px-20">
          <motion.button
            onClick={handleSeeMore}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 30px rgba(56,189,248,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            className="w-full px-6 py-3 font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#157ECE] shadow-md hover:from-[#0ea5e9] hover:to-[#38bdf8]"
          >
            <span className="text-lg font-semibold tracking-wide">See More</span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default GearShop;
