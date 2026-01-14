"use client";

import { motion } from "framer-motion";
import { Info, Wrench, MessageSquare, Briefcase } from "lucide-react";

interface SectionIndicatorProps {
  activeSection: number;
  onSectionChange: (index: number) => void;
}

const sections = [
  { name: "About Us", icon: Info },
  { name: "Services", icon: Wrench },
  { name: "Consultation", icon: MessageSquare },
  { name: "Careers", icon: Briefcase },
];

export default function SectionIndicator({ activeSection, onSectionChange }: SectionIndicatorProps) {
  return (
    <>
      {/* Desktop - Right Side (Show on lg and above) */}
      <div className="absolute right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block lg:right-6">
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === index;
          return (
            <motion.button
              key={index}
              onClick={() => onSectionChange(index)}
              className="group relative cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all ${
                  isActive
                    ? "border-[#07254B] bg-[#07254B]/20 shadow-lg shadow-[#07254B]/50"
                    : "border-[#CEF3FF] bg-white/80 backdrop-blur-sm hover:border-[#07254B]/70"
                }`}
              >
                <Icon
                  className={`transition-colors ${
                    isActive ? "text-[#07254B]" : "text-[#4B6F9B]"
                  }`}
                  size={24}
                />
              </div>
              {/* Tooltip */}
              <div className="pointer-events-none absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#07254B]/90 px-3 py-2 text-sm text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                {section.name}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#07254B]/90" />
              </div>
            </motion.button>
          );
        })}
      </div>
      </div>
    </>
  );
}
