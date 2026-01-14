"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {

  const scrollToNext = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex snap-start items-center justify-center overflow-hidden py-12 md:py-12 lg:h-screen lg:py-0" style={{ isolation: "isolate", zIndex: 1 }}>
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/posterImage.webp"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        >
          <source src="/backgroundvid.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#19254B]/80 to-[#000000]/40" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center mt-16 sm:mt-24">
        <motion.h1
          className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            TurboTechnik
          </span>
          <br />
          <span className="text-white">Marine Trading</span>
        </motion.h1>
        <motion.p
          className="mb-3 sm:mb-4 text-sm sm:text-base md:text-xl lg:text-2xl text-blue-100 px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your trusted partner in marine engineering,
          <br className="hidden sm:block" /> ship maintenance, and maritime services
        </motion.p>
        <motion.p
          className="text-xs sm:text-sm md:text-lg lg:text-xl text-blue-200/90 px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Delivering excellence across oceans with cutting-edge technology and unparalleled expertise.
          <br className="hidden sm:block" /> Join us in navigating the future of maritime innovation.
        </motion.p>
      </div>

      {/* Scroll Down Indicator - Clickable */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 md:bottom-6 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="h-8 w-8 text-cyan-400" />
      </motion.button>
    </section>
  );
}
