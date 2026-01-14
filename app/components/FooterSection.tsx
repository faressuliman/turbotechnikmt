"use client";

import { motion } from "framer-motion";
import { Anchor, Compass, Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, ArrowUp, Ship } from "lucide-react";
import { useEffect, useState } from "react";

export default function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative flex snap-start items-center justify-center bg-gradient-to-b from-slate-50 to-[#EEF6FB] pt-8 pb-12 md:pt-8 md:pb-12 border-t border-[#CEF3FF]/50" style={{ isolation: "isolate", zIndex: 1 }}>
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Background Icons */}
      <motion.div
        className="absolute left-10 top-20 text-cyan-500/10"
        animate={{
          rotate: [0, 360],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Anchor size={200} />
      </motion.div>
      <motion.div
        className="absolute right-10 bottom-20 text-cyan-500/10"
        animate={{
          rotate: [360, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <Compass size={180} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-4 sm:pt-4 md:pt-6 pb-6 sm:pb-8 md:pb-12">
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-3">
          {/* Column 1 - Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-3 sm:mb-3 md:mb-4 flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-r from-[#0A3251] to-[#07254B] p-2">
                <Ship className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-xl font-bold text-[#07254B]">TurboTechnik MT</h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[#4B6F9B] leading-relaxed">
              Leading marine engineering solutions for vessels worldwide. Your trusted partner in
              maritime excellence.
            </p>
          </motion.div>

          {/* Column 2 - Services (Centered on desktop, left on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sm:flex sm:justify-center"
          >
            <div>
              <h4 className="mb-3 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-lg font-semibold text-[#07254B]">Services</h4>
              <ul className="space-y-1.5 sm:space-y-1.5 md:space-y-2">
                {[
                  "Ship Maintenance",
                  "Marine Equipment",
                  "Navigation Systems",
                  "Hull Engineering",
                  "Consultation",
                ].map((service) => (
                  <li key={service}>
                    <span className="text-xs sm:text-sm md:text-base text-[#4B6F9B]">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 3 - Contact (Aligned to end on desktop, left on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:flex sm:justify-end"
          >
            <div>
              <h4 className="mb-3 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-lg font-semibold text-[#07254B]">Contact</h4>
              <ul className="space-y-2 sm:space-y-2 md:space-y-3">
                <li className="flex items-center gap-3 text-xs sm:text-sm md:text-base text-[#4B6F9B]">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#07254B]" />
                  <span>+971 4 123 4567</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm md:text-base text-[#4B6F9B]">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#07254B]" />
                  <span className="break-all">info@turbotechnik.com</span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm md:text-base text-[#4B6F9B]">
                  <MapPin className="mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#07254B]" />
                  <span>Dubai, United Arab Emirates</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Business Hours & Social Media */}
        <motion.div
          className="mt-6 sm:mt-8 md:mt-12 border-t border-blue-800/50 pt-4 sm:pt-6 md:pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col items-start sm:items-start md:items-center justify-between gap-4 sm:gap-4 md:gap-6 sm:flex-row">
            <div className="flex flex-row items-center gap-2 sm:gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-[#4B6F9B]">
              <Clock className="h-4 w-4 sm:h-4 md:h-5 sm:w-4 md:w-5 flex-shrink-0 text-[#07254B]" />
              <span className="text-left">Business Hours: Mon-Fri 8:00 AM - 6:00 PM | 24/7 Emergency Support</span>
            </div>
            <div className="flex gap-4 self-start">
              {[
                { icon: Facebook, href: "#", name: "Facebook" },
                { icon: Twitter, href: "#", name: "Twitter" },
                { icon: Linkedin, href: "#", name: "LinkedIn" },
                { icon: Instagram, href: "#", name: "Instagram" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={`Visit our ${social.name} page`}
                    className="rounded-full bg-white border border-[#CEF3FF] p-3 text-[#07254B] transition-colors hover:bg-[#CEF3FF] hover:text-[#0A3251] cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Copyright & Back to Top */}
            <motion.div
              className="mt-4 sm:mt-6 md:mt-8 flex flex-col items-start sm:items-start md:items-center justify-between gap-3 sm:gap-3 md:gap-4 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-xs sm:text-sm md:text-base text-[#4B6F9B] text-left">
            © {new Date().getFullYear()} TurboTechnik Marine Trading. All rights reserved.
          </p>
          {isVisible && (
            <motion.button
              onClick={scrollToTop}
              aria-label="Scroll to top of page"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0A3251] to-[#07254B] px-6 py-3 text-white transition-all hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={20} aria-hidden="true" />
              <span>Back to Top</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}