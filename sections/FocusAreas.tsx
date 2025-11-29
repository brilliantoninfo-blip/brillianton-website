"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserCheck, Network, Plane } from "lucide-react";

const focusAreas = [
  {
    icon: UserCheck,
    title: "Mentoring & Academic Guidance",
    description: "Personalized support for students aiming at top universities worldwide. From SOP writing to profile building, we help you stand out.",
    color: "from-primary to-secondary",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
  },
  {
    icon: Network,
    title: "International Collaboration",
    description: "Bridging students with international schools, events, and academic networks. Education is global, and so are we.",
    color: "from-secondary to-primary",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
  },
  {
    icon: Plane,
    title: "Student Exchange & Global Programs",
    description: "Opening doors for high schoolers to experience classrooms around the world—safely, authentically, academically.",
    color: "from-primary via-secondary to-primary",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
  },
];

export default function FocusAreas() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Our Areas of Focus
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three pillars that form the foundation of global education excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-text mb-3 md:mb-4 text-center group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

