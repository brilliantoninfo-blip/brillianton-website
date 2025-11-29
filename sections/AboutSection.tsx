"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Users, Target } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
              alt="International students collaborating"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
              About Brillianton
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Brillianton is an international education initiative built for ambitious students.
              We connect mentoring, global opportunities, and international collaborations into one seamless system.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Globe,
              title: "Global Reach",
              description: "Connecting students with opportunities worldwide",
            },
            {
              icon: Users,
              title: "Expert Mentoring",
              description: "Personalized guidance from experienced educators",
            },
            {
              icon: Target,
              title: "Clear Pathways",
              description: "Structured approach to achieving academic goals",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-accent/50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

