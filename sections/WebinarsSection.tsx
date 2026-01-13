"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, Video } from "lucide-react";

const upcomingWebinars = [
  {
    title: "Unlock Your Path to Oxford, Manchester & Chevening!",
    subtitle: "Achievers' Dialogue Session 2",
    date: "January 24, 2026",
    time: "7:30 PM - 8:30 PM IST",
    speaker: "Maknnoon Wani, Amiya Sur",
    description: "Join us for a free webinar featuring Chevening Scholars from Oxford University and University of Manchester.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
  },
  {
    title: "Pathways to Top Universities",
    date: "December 15, 2024",
    time: "6:00 PM IST",
    speaker: "Dr. Sarah Johnson",
    description: "Learn about application strategies for Ivy League and top QS universities.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
  },
  {
    title: "International Exchange Programs",
    date: "December 22, 2024",
    time: "7:00 PM IST",
    speaker: "Prof. Michael Chen",
    description: "Discover opportunities for global student exchange programs.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
  },
  {
    title: "Scholarship Opportunities 2025",
    date: "January 5, 2025",
    time: "6:30 PM IST",
    speaker: "Ms. Emily Rodriguez",
    description: "Comprehensive guide to scholarships and fellowships worldwide.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
  },
];

export default function WebinarsSection() {
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
            Upcoming Webinars
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our monthly international webinars for students, parents, and schools
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {upcomingWebinars.map((webinar, index) => (
            <motion.div
              key={webinar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={webinar.image}
                  alt={webinar.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center space-x-2">
                  <Video className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">Live Webinar</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-text group-hover:text-primary transition-colors">{webinar.title}</h3>
                  {webinar.subtitle && (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {webinar.subtitle}
                    </span>
                  )}
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-5 line-clamp-2">{webinar.description}</p>
                
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{webinar.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    <User className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="truncate">{webinar.speaker}</span>
                  </div>
                </div>

                <Link
                  href="/webinars"
                  className="inline-flex items-center space-x-2 w-full justify-center px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-all duration-300 group-hover:shadow-lg"
                >
                  <span className="text-sm md:text-base">Register Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/webinars"
            className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-all duration-300 hover:shadow-xl hover:scale-105 group"
          >
            <span className="text-sm md:text-base">View All Webinars</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

