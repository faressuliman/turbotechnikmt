"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen when page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        // Notify other components (e.g., HeroSection) that loading has finished
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("loadingComplete"));
        }
        setIsLoading(false);
      }, 1000); // Small delay for smooth transition
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0A3251] via-[#07254B] to-[#19254B]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((circle) => (
          <motion.div
            key={circle}
            className="absolute rounded-full border border-cyan-400/20"
            style={{
              width: `${200 + circle * 150}px`,
              height: `${200 + circle * 150}px`,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + circle,
              repeat: Infinity,
              delay: circle * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Logo with Multiple Animations */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Rotating Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-cyan-400/30"
            style={{
              width: "200px",
              height: "200px",
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
            style={{
              width: "180px",
              height: "180px",
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <Image
              src="/turbotechlogo.png"
              alt="TurboTechnik Logo"
              width={150}
              height={100}
              className="h-auto w-auto"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.p
            className="text-cyan-400 text-lg font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            TurboTechnik MT
          </motion.p>
        </motion.div>

        {/* Loading Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-2 w-2 rounded-full bg-cyan-400"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
