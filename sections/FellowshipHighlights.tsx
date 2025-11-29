"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";

const fellowships = [
  { name: "Chevening", description: "UK Government's global scholarship program" },
  { name: "Erasmus Mundus", description: "European Union's joint master's programs" },
  { name: "ImmersEducation", description: "International education experiences" },
  { name: "John Locke Essay", description: "Prestigious essay competition" },
  { name: "Wharton Global", description: "High school business competition" },
];

export default function FellowshipHighlights() {
  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Fellowship Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated global opportunities for ambitious students
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {fellowships.map((fellowship, index) => (
              <motion.div
                key={fellowship.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-2">{fellowship.name}</h3>
                    <p className="text-sm text-gray-600">{fellowship.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link
              href="/opportunities"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors group"
            >
              <span>Explore All Opportunities</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

