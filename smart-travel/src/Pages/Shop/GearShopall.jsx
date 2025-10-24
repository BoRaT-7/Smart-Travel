import React, { useEffect, useState, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const GearShopall = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch products
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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["All", ...new Set(cats)];
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  // Loading or error states
  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-emerald-400">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-400 font-semibold">
        {error}
      </div>
    );

  return (
    <div>
      <Header />

      <section className="mt-10">
        <motion.div className="min-h-screen text-gray-100 px-6 py-12 bg-[#0a0a0a]">
          <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-400">
            All Travel Gear
          </h1>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-6 relative">
            <input
              type="text"
              placeholder="Search gear..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-emerald-600 text-gray-200 placeholder-gray-400 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                <FaTimes />
              </button>
            )}
            <FaSearch className="absolute right-12 top-1/2 -translate-y-1/2 text-emerald-400" />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  category === cat
                    ? "bg-gradient-to-r from-emerald-500 to-lime-400 text-black border-transparent"
                    : "border-emerald-500 text-emerald-300 hover:bg-emerald-500/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {filteredProducts.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 10px 25px rgba(16,185,129,0.4)",
                  }}
                  className="bg-white/10 backdrop-blur-md shadow-lg border border-emerald-800/40 rounded-2xl overflow-hidden transition-all duration-500"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5 text-center">
                    <h2 className="text-lg font-semibold text-emerald-300">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center mt-3 px-2">
                      <p className="text-lg font-semibold text-lime-400">
                        {item.price}
                      </p>
                      <div className="flex items-center">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ✅ Fixed Order Now Button */}
                    <motion.button
                      onClick={() =>
                        navigate("/shoporder", { state: { product: item } })
                      }
                      whileHover={{
                        background:
                          "linear-gradient(to right, #059669, #A3E635)",
                        color: "#fff",
                        scale: 1.03,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2.5 mt-5 rounded-lg font-semibold text-emerald-400 border-2 border-emerald-500 bg-transparent transition-all duration-300"
                    >
                      {item.button_text || "Order Now"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No products found for this category or search.
            </p>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default GearShopall;
