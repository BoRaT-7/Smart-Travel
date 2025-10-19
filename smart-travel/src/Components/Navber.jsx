import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaMapMarkedAlt, FaRoute } from "react-icons/fa";
import { motion } from "framer-motion";

import slide1 from "../assets/navberImages/slide1.jpg";
import slide2 from "../assets/navberImages/slide2.jpg";
import slide3 from "../assets/navberImages/slide3.jpg";
import slide4 from "../assets/navberImages/slide4.jpg";

const Navber = () => {
  const slides = [slide1, slide2, slide3, slide4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const actions = [
    { icon: <FaShoppingBag size={20} />, label: "Shop Gear", aria: "Shop Gear" },
    { icon: <FaRoute size={20} />, label: "Plan Trip", aria: "Plan Trip" },
    { icon: <FaMapMarkedAlt size={20} />, label: "Destination Guide", aria: "Destination Guide" },
  ];

  return (
    <section className="relative w-full">
      {/* Hero container */}
      <div className="relative w-full h-[420px] md:h-[560px] lg:h-[620px] overflow-hidden shadow-lg">
        {/* Slide image */}
        <img
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover transition-transform duration-[1100ms] ease-in-out"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* Cinematic text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          <motion.h1
            className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg tracking-tight"
            variants={{
              hidden: { opacity: 0, x: -50, skewY: 5 },
              visible: { opacity: 1, x: 0, skewY: 0 },
            }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            Find Your{" "}
            <motion.span
              className="text-[#38bdf8] underline decoration-4"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0px 0px 0px #38bdf8",
                  "0px 0px 8px #38bdf8",
                  "0px 0px 0px #38bdf8",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Destination
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-3 text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Discover new adventures, plan your journey, and explore the world with us.
          </motion.p>
        </motion.div>

        {/* Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-3 md:px-8 pointer-events-none">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="pointer-events-auto btn btn-circle bg-black/40 border-none text-white hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="pointer-events-auto btn btn-circle bg-black/40 border-none text-white hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex justify-center">
        <div className="mt-6 md:mt-0 md:-translate-y-16 lg:-translate-y-20 z-50 w-full max-w-5xl px-4">
          <div className="mx-auto flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-6">
            {actions.map((a, idx) => (
              <motion.button
                key={idx}
                aria-label={a.aria}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#157ECE] to-[#0F3554] text-white font-semibold rounded-xl px-5 py-3 shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#157ECE]/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="text-sm sm:text-base">{a.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navber;
