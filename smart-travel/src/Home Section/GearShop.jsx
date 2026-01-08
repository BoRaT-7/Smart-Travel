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
    navigate("/shop");
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
      <div className="flex justify-center items-center py-24">
        <span className="loading loading-spinner loading-lg text-cyan-400"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-24 text-red-400 font-semibold">
        {error}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#050B18] via-[#08172E] to-[#020617] text-white"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center py-16 px-4 backdrop-blur-xl bg-white/5 border-b border-cyan-400/20"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="font-extrabold text-4xl sm:text-5xl bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent"
        >
          SmartTravel Gear Store
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-300 mt-4 max-w-2xl mx-auto"
        >
          Premium travel gear designed for modern explorers.
        </motion.p>

        {/* Search */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 flex max-w-xl mx-auto bg-white/10 backdrop-blur-xl rounded-full border border-cyan-400/30 overflow-hidden relative"
        >
          <input
            type="text"
            placeholder="Search travel gear..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-6 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              <FaTimes />
            </button>
          )}
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              background:
                "linear-gradient(to right, #06b6d4, #0ea5e9)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold flex items-center gap-2"
          >
            <FaSearch /> Search
          </motion.button>
        </motion.form>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-gray-400"
          >
            No matching gear found 🎒
          </motion.div>
        )}
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="grid gap-8 px-6 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 35px rgba(34,211,238,0.25)",
              }}
              className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-cyan-400/20"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5 text-center">
                <h2 className="text-lg font-semibold text-cyan-400">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-semibold text-sky-400">
                    {item.price} {item.currency}
                  </p>
                  <div>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={() =>
                    navigate("/shoporder", { state: { product: item } })
                  }
                  whileHover={{
                    background:
                      "linear-gradient(to right, #06b6d4, #0ea5e9)",
                    color: "#fff",
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-5 py-2.5 rounded-lg font-semibold border border-cyan-400 text-cyan-400 bg-transparent"
                >
                  {item.button_text || "Order Now"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More */}
      {visible < filteredProducts.length && (
        <div className="text-center mt-20 pb-20 px-6">
          <motion.button
            onClick={handleSeeMore}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(34,211,238,0.4)",
            }}
            className="px-10 py-3 rounded-full font-semibold text-cyan-400 border border-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-500 hover:text-white transition"
          >
            Show More →
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default GearShop;
