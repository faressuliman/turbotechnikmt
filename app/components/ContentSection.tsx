"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Ship, Clock, Award, MessageSquare, Wrench, Briefcase, Target, Eye, Users, Zap, FileText, Anchor } from "lucide-react";
import Image from "next/image";
import SectionIndicator from "./SectionIndicator";
import ServiceSlider from "./ServiceSlider";
import ConsultationForm from "./ConsultationForm";
import CareersForm from "./CareersForm";

export default function ContentSection() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleShowConsultation = () => {
      setActiveSection(2);
    };
    const handleShowAbout = () => {
      setActiveSection(0);
    };

    window.addEventListener("showConsultation" as any, handleShowConsultation);
    window.addEventListener("showAbout" as any, handleShowAbout);

    return () => {
      window.removeEventListener("showConsultation" as any, handleShowConsultation);
      window.removeEventListener("showAbout" as any, handleShowAbout);
    };
  }, []);

  return (
    <section className="relative flex snap-start items-start justify-center bg-white pt-2 pb-12 md:pt-[72px] md:pb-12 lg:min-h-screen lg:py-12" style={{ isolation: "isolate", zIndex: 1 }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80)",
        }}
      />

      {/* Section Indicator - Desktop */}
      <SectionIndicator activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Mobile & Tablet Navigation - Top (Full Width, hide on desktop) */}
      <div className="absolute -top-0.5 left-0 right-0 z-50 px-0 block lg:hidden">
        <div className="flex w-full bg-white/90 backdrop-blur-md shadow-lg overflow-hidden">
          {[
            { name: "About", icon: Users },
            { name: "Services", icon: Zap },
            { name: "Consult", icon: FileText },
            { name: "Careers", icon: Briefcase },
          ].map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === index;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveSection(index)}
                aria-label={`Navigate to ${section.name} section`}
                aria-pressed={isActive}
                className={`flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm transition-all cursor-pointer border-r border-[#CEF3FF] last:border-r-0 ${
                  isActive
                    ? "bg-gradient-to-r from-[#0A3251] to-[#07254B] text-white"
                    : "text-[#07254B] hover:bg-[#CEF3FF]"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <div className="flex items-center justify-center gap-1">
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden min-[375px]:inline">{section.name}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-16 sm:pt-8 md:pt-0">
        {/* About Us Section */}
        {activeSection === 0 && (
          <motion.div
            key="about"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex justify-center"
            >
              <Image
                src="/turbotechlogo.png"
                alt="TurboTechnik Marine Trading Logo"
                width={120}
                height={80}
                className="h-auto w-auto max-w-[100px] sm:max-w-[120px]"
              />
            </motion.div>
            <h2 className="mb-3 sm:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#07254B] text-center">About TurboTechnik MT</h2>
            <p className="mb-6 sm:mb-12 text-sm sm:text-base md:text-lg lg:text-xl text-[#4B6F9B] px-2">
              TurboTechnik Marine Trading is a leading provider of marine engineering solutions,
              specializing in ship maintenance, marine equipment, and comprehensive maritime services.
              With years of expertise, we ensure the highest standards of quality and reliability for
              all your maritime needs.
            </p>
            <motion.div
              className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-3"
              variants={{
                hidden: { opacity: 1 },
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                { icon: Anchor, value: "500+", label: "Vessels Serviced", color: "text-[#07254B]" },
                { icon: Zap, value: "24/7", label: "Support Available", color: "text-[#07254B]" },
                { icon: Award, value: "98%", label: "Satisfaction Rate", color: "text-[#07254B]" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      },
                    }}
                    className="rounded-xl bg-white border border-[#CEF3FF] p-4 sm:p-6 shadow-lg transition-all duration-300 transform hover:scale-101 hover:-translate-y-2 hover:shadow-indigo-300 hover:shadow-xl hover:cursor-default"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="mb-3 sm:mb-4 inline-flex rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 p-2 sm:p-3">
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                    <div className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-[#07254B]">{stat.value}</div>
                    <div className="text-xs sm:text-sm md:text-base text-[#4B6F9B]">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {/* Services Section */}
        {activeSection === 1 && (
          <motion.div
            key="services"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-2 sm:mb-4 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#07254B]">
              Our Services
            </h2>
            <p className="mb-6 sm:mb-10 text-center text-xs sm:text-sm md:text-base text-[#4B6F9B] max-w-2xl mx-auto">
              Propulsion, power generation and centralized marine HVAC engineered and delivered for your vessel.
            </p>
            <div className="mb-6 sm:mb-12">
              <ServiceSlider />
            </div>
            <motion.div
              className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto"
              variants={{
                hidden: { opacity: 1 },
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
                className="bg-gradient-to-br from-[#EEF6FB] to-white border border-[#CEF3FF] rounded-lg shadow-lg py-6 px-6 transition-all duration-300 transform hover:scale-101 hover:-translate-y-2 hover:shadow-indigo-300 hover:shadow-xl hover:cursor-default"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#34CD97]/20 to-[#0A3251]/20">
                    <Target className="h-6 w-6 text-[#07254B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-[#07254B]">Mission</h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#4B6F9B] leading-relaxed">
                      To deliver exceptional marine engineering solutions that ensure safety, efficiency,
                      and reliability for all maritime operations worldwide.
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
                className="bg-gradient-to-br from-[#EEF6FB] to-white border border-[#CEF3FF] rounded-lg shadow-lg py-6 px-6 transition-all duration-300 transform hover:scale-101 hover:-translate-y-2 hover:shadow-indigo-300 hover:shadow-xl hover:cursor-default"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#34CD97]/20 to-[#0A3251]/20">
                    <Eye className="h-6 w-6 text-[#07254B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-[#07254B]">Vision</h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#4B6F9B] leading-relaxed">
                      To be the global leader in marine engineering services, setting new standards for
                      excellence and innovation in the maritime industry.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Consultation Section */}
        {activeSection === 2 && (
          <motion.div
            key="consultation"
            initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-2xl"
          >
            <ConsultationForm />
          </motion.div>
        )}

        {/* Careers Section */}
        {activeSection === 3 && (
          <motion.div
            key="careers"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-2xl"
          >
            <CareersForm />
          </motion.div>
        )}
      </div>
    </section>
  );
}
