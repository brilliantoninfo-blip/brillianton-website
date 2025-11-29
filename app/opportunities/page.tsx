"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, Globe, BookOpen, Users, ArrowRight, ExternalLink, Calendar, DollarSign } from "lucide-react";

const opportunities = [
  {
    name: "Chevening",
    type: "Scholarship",
    description: "UK Government's global scholarship program for outstanding leaders to study in the UK.",
    deadline: "November 2025",
    link: "https://www.chevening.org",
    icon: Award,
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Erasmus Mundus",
    type: "Scholarship",
    description: "European Union's joint master's and doctoral programs across multiple countries.",
    deadline: "February 2025",
    link: "https://www.em-a.eu",
    icon: Globe,
    color: "from-green-600 to-green-800",
  },
  {
    name: "ImmersEducation",
    type: "Program",
    description: "International education experiences and immersive learning programs worldwide.",
    deadline: "Rolling",
    link: "#",
    icon: BookOpen,
    color: "from-purple-600 to-purple-800",
  },
  {
    name: "John Locke Essay Competition",
    type: "Competition",
    description: "Prestigious essay competition for high school students in philosophy, politics, and economics.",
    deadline: "June 2025",
    link: "https://www.johnlockeinstitute.org",
    icon: BookOpen,
    color: "from-orange-600 to-orange-800",
  },
  {
    name: "Wharton Global High School",
    type: "Competition",
    description: "International business competition for high school students organized by Wharton School.",
    deadline: "May 2025",
    link: "https://globalyouth.wharton.upenn.edu",
    icon: Users,
    color: "from-red-600 to-red-800",
  },
  {
    name: "Fulbright Program",
    type: "Scholarship",
    description: "International educational exchange program sponsored by the U.S. government.",
    deadline: "October 2025",
    link: "https://fulbright.state.gov",
    icon: Award,
    color: "from-indigo-600 to-indigo-800",
  },
];

export default function OpportunitiesPage() {
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
              Opportunities
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We highlight curated global opportunities for students — competitions, scholarships, essay contests, international programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                Fellowships & Contests
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore prestigious opportunities to advance your academic and professional journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {opportunities.map((opportunity, index) => {
                const Icon = opportunity.icon;
                return (
                  <motion.div
                    key={opportunity.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    <div className={`h-2 bg-gradient-to-r ${opportunity.color}`}></div>
                    <div className="p-5 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${opportunity.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <span className="px-2.5 md:px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
                          {opportunity.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">{opportunity.name}</h3>
                      <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6 leading-relaxed">{opportunity.description}</p>
                      
                      <div className="space-y-2 mb-5 md:mb-6">
                        <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Deadline: {opportunity.deadline}</span>
                        </div>
                      </div>

                      <a
                        href={opportunity.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 w-full justify-center px-4 md:px-6 py-2.5 md:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-all duration-300 group-hover:shadow-lg"
                      >
                        <span className="text-sm md:text-base">Learn More</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                Need Guidance?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our mentors can help you identify the best opportunities and craft winning applications
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-text mb-4">Application Support</h3>
                <p className="text-gray-600 mb-6">
                  Get expert help with essays, personal statements, and application materials for these prestigious programs.
                </p>
                <Link
                  href="/mentoring"
                  className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-secondary transition-colors"
                >
                  <span>Learn About Mentoring</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-text mb-4">Stay Updated</h3>
                <p className="text-gray-600 mb-6">
                  Join our webinars to learn about new opportunities and get tips from successful applicants.
                </p>
                <Link
                  href="/webinars"
                  className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-secondary transition-colors"
                >
                  <span>View Webinars</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Apply?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Connect with our team to get personalized guidance on these opportunities
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 group"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

