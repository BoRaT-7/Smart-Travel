import React, { useEffect, useState, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GearShop = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(8);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    fetch("/Gear Shop/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  useEffect(() => setVisible(8), [query]);

  const handleSeeMore = () => {
    navigate("/shop"); // Go to GearShopall page
  };

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
        <span className="loading loading-spinner loading-lg text-emerald-400"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-400 font-semibold">{error}</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#F8F8F5] text-gray-800"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 rounded-b-3xl shadow-lg"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
          className="font-extrabold text-4xl sm:text-5xl text-emerald-600"
        >
          Premium Travel Gear
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto"
        >
          Discover durable, stylish, and high-quality travel gear made for explorers.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 flex max-w-xl mx-auto bg-white rounded-full shadow-md overflow-hidden border border-emerald-300 relative"
        >
          <input
            type="text"
            placeholder="Search your gear..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-5 py-3 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
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
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(to right, #059669, #A3E635)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white px-6 py-3 rounded-r-full flex items-center gap-2 font-semibold"
          >
            <FaSearch /> Search
          </motion.button>
        </motion.form>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-gray-600 flex flex-col items-center gap-3"
          >
            <p>No matching gear found.</p>
            <div className="text-3xl animate-pulse">🎒</div>
          </motion.div>
        )}
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-14"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <AnimatePresence>
          {filteredProducts.slice(0, visible).map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.03,
                rotateY: 2,
                boxShadow: "0px 10px 25px rgba(16,185,129,0.2)",
              }}
              className="bg-white shadow-md hover:shadow-lg border border-emerald-200 rounded-2xl overflow-hidden transition-all duration-500"
            >
              <motion.figure whileHover={{ scale: 1.05 }}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />
              </motion.figure>
              <div className="p-5 text-center">
                <h2 className="text-lg font-semibold text-emerald-600">{item.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>

                <div className="flex justify-between items-center mt-3 px-2">
                  <p className="text-lg font-semibold text-lime-600">
                    {item.price} {item.currency}
                  </p>
                  <div className="flex items-center">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                </div>

                {/* ✅ Order Now button fixed */}
                <motion.button
                  onClick={() => navigate("/shoporder", { state: { product: item } })} // ✅ এই লাইনটাই মূল পরিবর্তন
                  whileHover={{
                    background: "linear-gradient(to right, #059669, #A3E635)",
                    color: "#fff",
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full py-2.5 mt-5 rounded-lg font-semibold text-emerald-600 border-2 border-emerald-300 bg-transparent transition-all duration-300"
                >
                  {item.button_text || "Order Now"}
                </motion.button>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* See More Button */}
      {visible < filteredProducts.length && (
        <div className="text-center mt-16 px-6 pb-16">
          <motion.button
            onClick={handleSeeMore}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 25px rgba(16,185,129,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="w-full max-w-md px-8 py-3 font-semibold text-emerald-600 border-2 border-emerald-300 rounded-full bg-transparent hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 transition-all duration-300"
          >
            <span className="text-lg font-semibold tracking-wide">Show More →</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default GearShop;
