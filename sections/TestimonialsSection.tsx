"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Student, Harvard University",
    content: "Brillianton's mentoring helped me craft a compelling application that stood out. The personalized guidance was invaluable.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Student, Oxford University",
    content: "The international exposure through Brillianton opened doors I never knew existed. Truly transformative experience.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Parent",
    content: "As a parent, I appreciated the structured approach and clear communication. Brillianton made the entire process seamless.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
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
            What Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from our global community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative group border border-gray-100"
            >
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-primary/20 absolute top-4 right-4 md:top-6 md:right-6 group-hover:text-primary/30 transition-colors" />
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-text text-sm md:text-base">{testimonial.name}</div>
                <div className="text-xs md:text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

