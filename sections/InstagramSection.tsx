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
            src="https://cdn.lightwidget.com/widgets/lightwidget.js"
            strategy="lazyOnload"
          />
          <iframe
            src="//lightwidget.com/widgets/b13aa0d05a24521881f5aa70c823583c.html"
            scrolling="no"
            allowTransparency={true}
            className="lightwidget-widget"
            style={{ width: "100%", border: 0, overflow: "hidden" }}
            title="Brillianton Instagram Feed"
          />
        </motion.div>
      </div>
    </section>
  );
}

