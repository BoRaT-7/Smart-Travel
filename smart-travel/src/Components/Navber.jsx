import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaMapMarkedAlt, FaRoute, FaHotel, FaBusAlt } from "react-icons/fa";
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
    <section className="relative w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[420px] md:h-[560px] lg:h-[620px] overflow-hidden shadow-lg">
        <img
          src={slides[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover transition-transform duration-[1100ms] ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Animated Text */}
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
            transition={{ duration: 1.2, ease: "easeOut" }}
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

      {/* Action Buttons */}
      <div className="w-full flex justify-center">
        <div className="z-50 w-full max-w-6xl px-4 -translate-y-24 md:-translate-y-16 lg:-translate-y-20 mt-0">
          <div className="mx-auto flex flex-wrap justify-center md:flex-nowrap items-center gap-3 overflow-x-auto scrollbar-hide">
            {actions.map((a, idx) => (
              <motion.button
                key={idx}
                onClick={() => scrollToSection(a.id)}
                className="relative group flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30
                  text-white font-medium rounded-full px-5 py-2.5 md:px-6 md:py-3
                  hover:bg-gradient-to-r hover:from-[#38bdf8] hover:to-[#157ECE]
                  hover:border-[#38bdf8] hover:shadow-lg hover:shadow-[#38bdf8]/30
                  transition-all duration-500"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{a.icon}</span>
                <span className="text-sm md:text-base whitespace-nowrap">{a.label}</span>

                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#38bdf8]"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navber;
