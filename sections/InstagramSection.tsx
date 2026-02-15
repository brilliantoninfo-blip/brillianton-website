"use client";

import { motion } from "framer-motion";
import Script from "next/script";

export default function InstagramSection() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay connected with our latest updates, success stories, and educational insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="afterInteractive"
            onLoad={() => {
              if (window.elfsight) {
                window.elfsight.load();
              }
            }}
          />
          <div
            className="elfsight-app-083d3f42-a92a-4cbe-96f6-489ebff5f980"
            data-elfsight-app-lazy
          />
        </motion.div>
      </div>
    </section>
  );
}
