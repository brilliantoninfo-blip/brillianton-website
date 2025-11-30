"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { country: "United States", x: "20%", y: "35%" },
  { country: "United Kingdom", x: "48%", y: "25%" },
  { country: "Canada", x: "18%", y: "20%" },
  { country: "Australia", x: "75%", y: "75%" },
  { country: "Germany", x: "52%", y: "30%" },
  { country: "France", x: "50%", y: "32%" },
  { country: "Singapore", x: "68%", y: "55%" },
  { country: "Japan", x: "78%", y: "38%" },
];

export default function GlobalMentorship() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Global Mentorship Network
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting students with mentors and opportunities worldwide
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative bg-accent/50 rounded-3xl p-8 md:p-16 overflow-hidden">
            {/* World Map Background (Simplified) */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 800 400" className="w-full h-full">
                {/* Simplified world map outline */}
                <path
                  d="M100,150 Q150,100 200,120 T300,110 Q350,100 400,120 T500,110 Q550,100 600,120 T700,110 L700,200 Q600,250 500,240 Q400,250 300,240 Q200,250 100,200 Z"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>
            </div>

            {/* Animated Location Markers */}
            <div className="relative h-96">
              {locations.map((location, index) => (
                <motion.div
                  key={location.country}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="absolute"
                  style={{
                    left: location.x,
                    top: location.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                    className="relative group cursor-pointer"
                  >
                    <MapPin className="w-8 h-8 text-primary drop-shadow-lg" />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-primary text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none"
                    >
                      {location.country}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-2 h-2 bg-primary rotate-45"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">Mentors</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Partner Schools</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}