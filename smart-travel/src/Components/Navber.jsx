import React, { useEffect, useState } from "react";
import slide1 from "../assets/navberImages/slide1.jpg";
import slide2 from "../assets/navberImages/slide2.jpg";
import slide3 from "../assets/navberImages/slide3.jpg";
import slide4 from "../assets/navberImages/slide4.jpg";

import shopGear from "../assets/Logo/Shop Gear.png";
import planTrip from "../assets/Logo/plan trip.png";
import destinationLogo from "../assets/Logo/destination logo.png";

const Navber = () => {
  const slides = [slide1, slide2, slide3, slide4];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      {/* Background Slideshow */}
      <img
        src={slides[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-full object-cover transition duration-1000"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white font-extrabold text-5xl text-center drop-shadow-lg">
          Find Your Destination
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-5">
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-black/40 border-none text-white hover:bg-black/70 transition"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-black/40 border-none text-white hover:bg-black/70 transition"
        >
          ❯
        </button>
      </div>

      {/* 3 Horizontal Buttons Section */}
      <div className="absolute bottom-[-70px] left-1/2 -translate-x-1/2 w-full md:w-auto flex flex-col md:flex-row justify-center items-center gap-8 py-20 px-4 rounded-t-3xl shadow-lg">
        {[
          { img: shopGear, label: "Shop Gear" },
          { img: planTrip, label: "Plan Trip" },
          { img: destinationLogo, label: "Destination Guide" },
        ].map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 bg-teal-600 hover:bg-[#0f304a] transition transform hover:scale-105 rounded-2xl px-4 py-3 text-white shadow-md"
          >
            <img
              src={item.img}
              alt={item.label}
              className="h-8 w-8 object-contain"
            />
            <p className="font-semibold text-lg whitespace-nowrap">
              {item.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navber;
