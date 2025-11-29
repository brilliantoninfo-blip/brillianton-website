"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const typewriterTexts = [
  "Mentoring.",
  "International Exposure.",
  "Student Exchange Programs.",
  "Future-Ready Students.",
];

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, 100);
    } else if (!isDeleting && displayText.length === currentText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting]);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent via-white to-accent/50 pt-16 md:pt-0">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-10">
            {/* Text Content */}
            <div className="text-center w-full flex flex-col items-center">
              <div className="w-32 sm:w-40 md:w-48 mb-4 md:mb-6">
                <Image
                  src="/brillianton-logo.svg"
                  alt="Brillianton Global Education logo"
                  width={192}
                  height={192}
                  className="mx-auto"
                  priority
                />
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-4 md:mb-6 leading-tight"
              >
                Brillionton
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4 min-h-[32px] md:min-h-[60px]"
              >
                <span className="inline-block">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1 h-8 bg-primary ml-2"
                  />
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                An imagined city of Brilliance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start items-center"
              >
            <Link
              href="/webinars"
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/40 text-sm md:text-base text-center"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Join Our Webinar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-secondary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            <Link
              href="/opportunities"
              className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white text-primary border-2 border-primary rounded-lg font-semibold transition-all duration-300 hover:bg-primary hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/40 text-sm md:text-base text-center"
            >
              <span className="flex items-center justify-center space-x-2 text-primary group-hover:text-white group-active:text-white transition-colors duration-300">
                <span className="group-hover:text-white group-active:text-white transition-colors duration-300">Explore Opportunities</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-primary group-hover:text-white group-active:text-white" />
              </span>
            </Link>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full md:w-4/5 lg:w-3/4"
            >
              <div className="relative w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
                  alt="Students learning together"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

