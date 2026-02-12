"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, Video } from "lucide-react";

type HomeWebinar = {
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  speaker: string;
  description: string;
  image: string;
};

const upcomingWebinars: HomeWebinar[] = [];

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

        {upcomingWebinars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto justify-center">
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
                {/* Poster Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={webinar.image}
                    alt={webinar.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center space-x-2">
                    <Video className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">Live Webinar</span>
                  </div>
                  {webinar.subtitle && (
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs font-semibold text-white">{webinar.subtitle}</span>
                    </div>
                  )}
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
        ) : (
          <div className="text-center text-gray-600">
            No upcoming webinars at the moment. Check back soon, or{" "}
            <Link href="/webinars" className="text-primary underline">
              view our past webinars
            </Link>.
          </div>
        )}

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

