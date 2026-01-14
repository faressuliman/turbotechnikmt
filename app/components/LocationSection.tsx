"use client";

import { motion } from "framer-motion";

export default function LocationSection() {
  return (
    <section className="relative flex snap-start items-center justify-center bg-gradient-to-b from-[#EEF6FB] to-[#E0F2FE] py-12 md:py-12 lg:min-h-screen" style={{ isolation: "isolate", zIndex: 1 }}>
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-3 sm:mb-8 text-center">
            <h2 className="text-lg font-bold text-[#07254B] sm:text-xl md:text-2xl lg:text-3xl">Where You Can Find Us</h2>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#CEF3FF] shadow-2xl shadow-[#0A3251]/20 bg-white"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ isolation: "isolate", position: "relative", zIndex: 0 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9630579!3d-37.840935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0x6896048ed441801e!2sPort%20of%20Melbourne!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, position: "relative", zIndex: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full sm:h-[500px] md:h-[600px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
