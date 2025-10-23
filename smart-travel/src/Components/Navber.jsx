import React, { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaMapMarkedAlt,
  FaRoute,
  FaHotel,
  FaBusAlt,
} from "react-icons/fa";
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

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const actions = [
    { icon: <FaHotel size={20} />, label: "Hotel Booking", id: "hotel-booking" },
    { icon: <FaShoppingBag size={20} />, label: "Shop Gear", id: "gear-shop" },
    { icon: <FaRoute size={20} />, label: "Plan Trip", id: "top-destination" },
    { icon: <FaMapMarkedAlt size={20} />, label: "Destination Guide", id: "guide-slider" },
    { icon: <FaBusAlt size={20} />, label: "Transport Booking", id: "transport-booking" },
  ];

  return (
    <section className="relative w-full font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-[520px] sm:h-[560px] md:h-[600px] lg:h-[640px] overflow-hidden rounded-b-3xl shadow-2xl">
        {/* Background Slide */}
        <motion.img
          key={current}
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D1D]/70 via-[#3E5C2D]/50 to-[#C6A664]/20 backdrop-blur-sm rounded-b-3xl" />

        {/* Text & Actions */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.25 } } }}
        >
          <motion.h1
            className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-2xl leading-snug"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            Discover Your Next{" "}
            <motion.span
              className="text-amber-400 underline decoration-amber-300 decoration-4"
              animate={{
                scale: [1, 1.08, 1],
                textShadow: [
                  "0px 0px 0px #FFB800",
                  "0px 0px 8px #FFB800",
                  "0px 0px 0px #FFB800",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Adventure
            </motion.span>
          </motion.h1>

          <motion.p
            className="mt-3 text-gray-100 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Explore beautiful destinations, plan unforgettable trips, and start your journey with confidence.
          </motion.p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 px-4 w-full max-w-3xl">
            {actions.map((a, idx) => (
              <motion.button
                key={idx}
                onClick={() => scrollToSection(a.id)}
                className="group flex items-center gap-2 bg-emerald-700/25 backdrop-blur-md border border-emerald-500/40
                  text-white font-medium rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
                  hover:bg-gradient-to-r hover:from-emerald-600 hover:to-amber-400
                  hover:text-[#0B3D1D] hover:shadow-lg hover:shadow-amber-400/40
                  transition-all duration-500 ease-out"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">{a.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-3 md:px-8 pointer-events-none">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="pointer-events-auto w-9 h-9 md:w-11 md:h-11 flex items-center justify-center 
                       bg-white/20 rounded-full text-white hover:bg-amber-400 transition duration-300 focus:outline-none"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="pointer-events-auto w-9 h-9 md:w-11 md:h-11 flex items-center justify-center 
                       bg-white/20 rounded-full text-white hover:bg-amber-400 transition duration-300 focus:outline-none"
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navber;
