"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const upcomingWebinars = [
  {
    id: 1,
    title: "Pathways to Top Universities",
    date: "December 15, 2024",
    time: "6:00 PM IST",
    speaker: "Dr. Sarah Johnson",
    description: "Learn about application strategies for Ivy League and top QS universities. Get insights on what admissions committees look for.",
    registrationLink: "https://forms.google.com/placeholder",
  },
  {
    id: 2,
    title: "International Exchange Programs",
    date: "December 22, 2024",
    time: "7:00 PM IST",
    speaker: "Prof. Michael Chen",
    description: "Discover opportunities for global student exchange programs. Learn about the application process and benefits.",
    registrationLink: "https://forms.google.com/placeholder",
  },
  {
    id: 3,
    title: "Scholarship Opportunities 2025",
    date: "January 5, 2025",
    time: "6:30 PM IST",
    speaker: "Ms. Emily Rodriguez",
    description: "Comprehensive guide to scholarships and fellowships worldwide. Tips for successful scholarship applications.",
    registrationLink: "https://forms.google.com/placeholder",
  },
  {
    id: 4,
    title: "SOP Writing Masterclass",
    date: "January 12, 2025",
    time: "7:00 PM IST",
    speaker: "Dr. James Wilson",
    description: "Master the art of writing compelling Statements of Purpose. Learn from real examples and expert feedback.",
    registrationLink: "https://forms.google.com/placeholder",
  },
];

const pastWebinars = [
  {
    title: "Global Education Trends 2024",
    date: "November 20, 2024",
    speaker: "Dr. Sarah Johnson",
  },
  {
    title: "Building Your Academic Profile",
    date: "November 10, 2024",
    speaker: "Prof. Michael Chen",
  },
  {
    title: "Navigating University Applications",
    date: "October 28, 2024",
    speaker: "Ms. Emily Rodriguez",
  },
];

export default function WebinarsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % upcomingWebinars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + upcomingWebinars.length) % upcomingWebinars.length);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-white to-accent/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
              Webinars
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Join our monthly international webinars for students, parents, and schools.
              Learn, prepare, explore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                Upcoming Webinars
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Register for our upcoming sessions and gain valuable insights
              </p>
            </motion.div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {upcomingWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-accent to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-text mb-4">{webinar.title}</h3>
                  <p className="text-gray-600 mb-6">{webinar.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{webinar.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-primary" />
                      <span>{webinar.speaker}</span>
                    </div>
                  </div>

                  <a
                    href={webinar.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 w-full justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors group"
                  >
                    <span>Register Now</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Mobile Slider View */}
            <div className="md:hidden relative">
              <div className="overflow-hidden rounded-2xl">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {upcomingWebinars.map((webinar) => (
                    <div key={webinar.id} className="min-w-full px-4">
                      <div className="bg-gradient-to-br from-accent to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-text mb-4">{webinar.title}</h3>
                        <p className="text-gray-600 mb-6">{webinar.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{webinar.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{webinar.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="w-4 h-4 text-primary" />
                            <span>{webinar.speaker}</span>
                          </div>
                        </div>

                        <a
                          href={webinar.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 w-full justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors group"
                        >
                          <span>Register Now</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Slider Controls */}
              <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Previous webinar"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex space-x-2">
                  {upcomingWebinars.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? "bg-primary w-8" : "bg-gray-300"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label="Next webinar"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Webinars */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                Past Webinars
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Recordings and resources from previous sessions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-text mb-3">{webinar.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-primary" />
                    <span>{webinar.speaker}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 italic">Recording available soon</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

