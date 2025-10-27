import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const ShopOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dynamically calculate total price
  const totalPrice = useMemo(() => {
    const price = parseFloat(product.price?.replace(/[^0-9.]/g, "")) || 0;
    return (price * form.quantity).toFixed(2);
  }, [form.quantity, product.price]);

  const handleOrder = (e) => {
    e.preventDefault();
    alert(`✅ Order placed successfully for ${form.quantity} x ${product.name}!`);
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-black to-lime-900 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl border border-emerald-700/40 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ---------------- LEFT SIDE: Product Image + Details ---------------- */}
        <motion.div
          className="md:w-1/2 bg-white/10 border-b md:border-b-0 md:border-r border-emerald-800/30 flex flex-col justify-start p-5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Product Image */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-emerald-800/30 mb-6">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="text-center md:text-left px-3">
            <h2 className="text-2xl font-bold text-emerald-300">
              {product.name || "Product Name"}
            </h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              {product.description ||
                "Product description will appear here. This section highlights features and specifications."}
            </p>
            <p className="text-lime-400 font-extrabold text-2xl mt-4">
              {product.price || "$0.00"}
            </p>
          </div>
        </motion.div>

        {/* ---------------- RIGHT SIDE: Order Form ---------------- */}
        <motion.div
          className="md:w-1/2 p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-400">
              Complete Your Order
            </h1>
            <p className="text-gray-400 mt-2">
              Please provide your details to confirm your purchase.
            </p>
          </div>

          {/* Order Form */}
          <form onSubmit={handleOrder} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-emerald-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-emerald-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-lime-400"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-emerald-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-emerald-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-emerald-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-emerald-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-lime-400"
              />
            </div>

            {/* Address */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-emerald-400" />
              <textarea
                name="address"
                placeholder="Shipping Address"
                required
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-emerald-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-lime-400"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-300 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                className="w-24 text-center py-2 rounded-lg bg-transparent border border-emerald-600 text-gray-200 focus:outline-none focus:border-lime-400"
              />
            </div>

            {/* Order Summary */}
            <motion.div
              className="mt-6 bg-white/10 border border-emerald-700/40 rounded-xl p-5 shadow-inner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold text-emerald-300 mb-3">
                Order Summary
              </h3>
              <div className="flex justify-between text-gray-300 text-sm mb-2">
                <span>Product:</span>
                <span>{product.name || "N/A"}</span>
              </div>
              <div className="flex justify-between text-gray-300 text-sm mb-2">
                <span>Unit Price:</span>
                <span>{product.price || "$0.00"}</span>
              </div>
              <div className="flex justify-between text-gray-300 text-sm mb-2">
                <span>Quantity:</span>
                <span>{form.quantity}</span>
              </div>
              <hr className="border-emerald-800 my-2" />
              <div className="flex justify-between text-lg font-bold text-lime-400">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
              <motion.button
                type="button"
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg font-semibold text-gray-300 border border-emerald-500 hover:bg-emerald-500/20"
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  background: "linear-gradient(to right, #059669, #A3E635)",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-2.5 rounded-lg font-semibold text-emerald-400 border-2 border-emerald-500 bg-transparent transition-all duration-300"
              >
                <FaShoppingCart /> Place Order
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ShopOrder;
