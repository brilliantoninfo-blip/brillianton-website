"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plane, Globe, GraduationCap, ArrowRight } from "lucide-react";

export default function ExchangeFeature() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Student Exchange Program
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our upcoming exchange initiative will open doors for Indian high schoolers to experience classrooms around the world — safely, authentically, academically.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Globe,
                title: "Global Exposure",
                description: "Experience diverse cultures and educational systems firsthand",
              },
              {
                icon: GraduationCap,
                title: "Academic Immersion",
                description: "Learn in international classrooms with world-class educators",
              },
              {
                icon: Plane,
                title: "Cross-Cultural Learning",
                description: "Build global connections and develop international perspectives",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Link
              href="/student-exchange"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 group"
            >
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

