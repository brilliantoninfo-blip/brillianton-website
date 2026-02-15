"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Video } from "lucide-react";

type WebinarRecording = {
  title: string;
  url: string;
};

type WebinarAchiever = {
  name: string;
  achievement: string;
  university?: string;
};

type Webinar = {
  id?: number;
  title: string;
  subtitle?: string;
  date: string;
  time?: string;
  speaker?: string;
  description?: string;
  poster?: string;
  posters?: string[];
  achievers?: WebinarAchiever[];
  contactEmail?: string;
  registrationLink?: string;
  recordings?: WebinarRecording[];
};

const upcomingWebinars: Webinar[] = [];

const pastWebinars: Webinar[] = [
  {
    title: "Unlock Your Path to Oxford, Manchester & Chevening!",
    subtitle: "Achievers' Dialogue Session 2",
    date: "January 24, 2026",
    time: "7:30 PM - 8:30 PM IST",
    speaker: "Maknoon Wani, Amiya Sur",
    description: "Join us for a free webinar featuring Chevening Scholars from Oxford University and University of Manchester. Learn about their journey and get insights on securing prestigious scholarships and admissions to top UK universities.",
    poster: "/webinar-posters/session-2-amiya-sur.jpg",
    posters: [
      "/webinar-posters/session-2-amiya-sur.jpg",
      "/webinar-posters/session-2-maknoon-wani.jpg"
    ],
    achievers: [
      {
        name: "Maknoon Wani",
        achievement: "Chevening Scholar (2023-24)",
        university: "Oxford University, UK"
      },
      {
        name: "Amiya Sur",
        achievement: "Chevening Scholar (2022-23)",
        university: "University of Manchester, UK"
      }
    ],
    contactEmail: "brilliantoninfo@gmail.com",
    recordings: [
      {
        title: "Maknoon Wani - Part 1",
        url: "https://youtu.be/VhBIMX4VkmM?si=r0GWLX6ub8Hgz85"
      },
      {
        title: "Amiya Sur - Part 2",
        url: "https://youtu.be/hREIspOhsBI?si=BI65W11JJLdJnhwO"
      }
    ]
  },
  {
    title: "Brillianton Achievers' Dialogue",
    subtitle: "Session 1",
    date: "December 27, 2025",
    time: "7:30 PM - 8:30 PM IST",
    speaker: "Rajaneesh Rajan, Eknath Wagh, Farseen Ali P",
    description: "Dreaming of a top global Master's or fellowship? Meet those who made it happen! Featuring Chevening Scholar, Harvard MPP Candidate, and Erasmus Mundus Scholar sharing their success stories.",
    poster: "/webinar-posters/session-1-poster.jpg",
    achievers: [
      {
        name: "Rajaneesh Rajan",
        achievement: "Chevening Scholar (2021-22)",
        university: "University of Sussex, UK"
      },
      {
        name: "Eknath Wagh",
        achievement: "MPP Candidate (2025-27)",
        university: "Harvard University, USA"
      },
      {
        name: "Farseen Ali P",
        achievement: "Erasmus Mundus Joint Master Program (2022-24)"
      }
    ],
    contactEmail: "brilliantoninfo@gmail.com",
    recordings: [
      {
        title: "Part 1",
        url: "https://youtu.be/xcZ1CeV62_0?si=R55bjMdyEX7WWOrJ"
      },
      {
        title: "Part 2",
        url: "https://youtu.be/rALI_s46s9E?si=QN-mW7vx2L3AsUdM"
      },
      {
        title: "Part 3",
        url: "https://youtu.be/-eDAsFpenLI?si=x8a0kGDv8rva90yK"
      }
    ]
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
            {upcomingWebinars.length > 0 ? (
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {upcomingWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br from-accent to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 ${
                    webinar.achievers ? 'md:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  {webinar.poster && (
                    <div className="relative w-full h-64 md:h-80 overflow-hidden">
                      <Image
                        src={webinar.poster}
                        alt={webinar.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center space-x-2">
                        <Video className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary">Live Webinar</span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-text">{webinar.title}</h3>
                      {webinar.subtitle && (
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {webinar.subtitle}
                        </span>
                      )}
                    </div>
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
                    {webinar.speaker && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-primary" />
                        <span>{webinar.speaker}</span>
                      </div>
                    )}
                  </div>

                  {webinar.achievers && (
                    <div className="mb-6 space-y-3">
                      <h4 className="text-sm font-semibold text-text">Featured Speakers:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {webinar.achievers.map((achiever, idx) => (
                          <div key={idx} className="bg-white/80 rounded-lg p-3 border border-gray-200">
                            <p className="text-sm font-semibold text-text">{achiever.name}</p>
                            <p className="text-xs text-gray-700">{achiever.achievement}</p>
                            {achiever.university && (
                              <p className="text-xs text-gray-600">{achiever.university}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                    {webinar.contactEmail && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                        <span className="text-gray-500">Contact:</span>
                        <a href={`mailto:${webinar.contactEmail}`} className="text-primary hover:underline">
                          {webinar.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No upcoming webinars at the moment. Check back soon!</p>
              </div>
            )}

            {/* Mobile Slider View */}
            {upcomingWebinars.length > 0 && (
            <div className="md:hidden relative">
              <div className="overflow-hidden rounded-2xl">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {upcomingWebinars.map((webinar) => (
                    <div key={webinar.id} className="min-w-full px-4">
                      <div className="bg-gradient-to-br from-accent to-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                        {webinar.poster && (
                          <div className="relative w-full h-64 overflow-hidden">
                            <Image
                              src={webinar.poster}
                              alt={webinar.title}
                              fill
                              className="object-cover"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center space-x-2">
                              <Video className="w-4 h-4 text-primary" />
                              <span className="text-xs font-semibold text-primary">Live Webinar</span>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-text">{webinar.title}</h3>
                            {webinar.subtitle && (
                              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                {webinar.subtitle}
                              </span>
                            )}
                          </div>
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
                          {webinar.speaker && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <User className="w-4 h-4 text-primary" />
                              <span>{webinar.speaker}</span>
                            </div>
                          )}
                        </div>

                        {webinar.achievers && (
                          <div className="mb-6 space-y-3">
                            <h4 className="text-sm font-semibold text-text">Featured Speakers:</h4>
                            <div className="space-y-3">
                              {webinar.achievers.map((achiever, idx) => (
                                <div key={idx} className="bg-white/80 rounded-lg p-3 border border-gray-200">
                                  <p className="text-sm font-semibold text-text">{achiever.name}</p>
                                  <p className="text-xs text-gray-700">{achiever.achievement}</p>
                                  {achiever.university && (
                                    <p className="text-xs text-gray-600">{achiever.university}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                          {webinar.contactEmail && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                              <span className="text-gray-500">Contact:</span>
                              <a href={`mailto:${webinar.contactEmail}`} className="text-primary hover:underline">
                                {webinar.contactEmail}
                              </a>
                            </div>
                          )}
                        </div>
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
            )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastWebinars.map((webinar, index) => (
                <motion.div
                  key={webinar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
                    webinar.achievers ? 'md:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  {webinar.posters && webinar.posters.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 bg-gray-50">
                      {webinar.posters.map((poster, posterIdx) => (
                        <div key={posterIdx} className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
                          <Image
                            src={poster}
                            alt={`${webinar.title} - Poster ${posterIdx + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          {posterIdx === 0 && webinar.subtitle && (
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                              <span className="text-xs font-semibold text-primary">{webinar.subtitle}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : webinar.poster && (
                    <div className="relative w-full h-64 md:h-80 overflow-hidden">
                      <Image
                        src={webinar.poster}
                        alt={webinar.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      {webinar.subtitle && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                          <span className="text-xs font-semibold text-primary">{webinar.subtitle}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-text mb-3">{webinar.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{webinar.date}</span>
                  </div>
                  {webinar.time && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{webinar.time}</span>
                    </div>
                  )}
                  {webinar.speaker && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <User className="w-4 h-4 text-primary" />
                      <span>{webinar.speaker}</span>
                    </div>
                  )}
                  {webinar.description && (
                    <p className="text-sm text-gray-600 mb-4">{webinar.description}</p>
                  )}
                  {webinar.achievers && (
                    <div className="mb-4 space-y-3">
                      <h4 className="text-sm font-semibold text-text">Featured Achievers:</h4>
                      {webinar.achievers.map((achiever, idx) => (
                        <div key={idx} className="bg-accent/50 rounded-lg p-3">
                          <p className="text-sm font-semibold text-text">{achiever.name}</p>
                          <p className="text-xs text-gray-700">{achiever.achievement}</p>
                          {achiever.university && (
                            <p className="text-xs text-gray-600">{achiever.university}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {webinar.contactEmail && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
                      <span className="text-gray-500">Contact:</span>
                      <a href={`mailto:${webinar.contactEmail}`} className="text-primary hover:underline">
                        {webinar.contactEmail}
                      </a>
                    </div>
                  )}
                  {webinar.recordings && webinar.recordings.length > 0 ? (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-text mb-3 flex items-center space-x-2">
                        <Video className="w-4 h-4 text-primary" />
                        <span>Watch Recording:</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {webinar.recordings.map((recording, idx) => (
                          <a
                            key={idx}
                            href={recording.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-secondary transition-colors group"
                          >
                            <Video className="w-4 h-4" />
                            <span>{recording.title}</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-4 italic">Recording available soon</p>
                  )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

