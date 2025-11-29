"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Target, Users, Globe, ArrowRight, Calendar } from "lucide-react";

const teamMembers = [
  { name: "Dr. Sarah Johnson", role: "Director of International Programs", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face" },
  { name: "Prof. Michael Chen", role: "Head of Mentoring", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
  { name: "Ms. Emily Rodriguez", role: "Global Partnerships Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" },
  { name: "Dr. James Wilson", role: "Academic Advisor", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
];

const timeline = [
  { year: "2020", event: "Brillianton Founded" },
  { year: "2021", event: "First 100 Students Mentored" },
  { year: "2022", event: "International Partnerships Established" },
  { year: "2023", event: "Student Exchange Program Launched" },
  { year: "2024", event: "1000+ Students Served Globally" },
];

export default function AboutPage() {
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
              About Brillianton
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Brillianton is an international education initiative built for ambitious students.
              We connect mentoring, global opportunities, and international collaborations into one seamless system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
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
                Our Philosophy
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe that education transcends borders. Every student deserves access to world-class opportunities,
                personalized guidance, and the tools to succeed on a global stage.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  description: "To empower ambitious students with global exposure and mentorship, creating pathways to top universities and international opportunities worldwide.",
                },
                {
                  icon: Globe,
                  title: "Global Approach",
                  description: "We bridge cultures, connect students with international networks, and foster cross-cultural understanding through education.",
                },
                {
                  icon: Users,
                  title: "Our Vision",
                  description: "A world where every student has access to quality mentorship and global opportunities, regardless of their background.",
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
                    className="bg-accent/50 rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
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
                Our Approach
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine personalized mentoring, strategic planning, and global connections to create
                comprehensive pathways for student success.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Personalized Assessment",
                  description: "Understanding each student's unique goals, strengths, and aspirations through comprehensive evaluation.",
                },
                {
                  step: "02",
                  title: "Strategic Planning",
                  description: "Creating tailored roadmaps that align with student objectives and global opportunities.",
                },
                {
                  step: "03",
                  title: "Expert Mentoring",
                  description: "One-on-one guidance from experienced educators and industry professionals worldwide.",
                },
                {
                  step: "04",
                  title: "Global Connections",
                  description: "Leveraging our international network to open doors to universities, programs, and opportunities.",
                },
                {
                  step: "05",
                  title: "Continuous Support",
                  description: "Ongoing assistance throughout the application process and beyond, ensuring long-term success.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                  <div className="text-6xl font-bold text-primary/20 flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-text mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                Our Journey
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-24"
                  >
                    <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                    <div className="bg-accent/50 rounded-xl p-6">
                      <div className="flex items-center space-x-4 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-bold text-primary">{item.year}</span>
                      </div>
                      <p className="text-lg text-gray-700">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
                Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced educators and professionals dedicated to student success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-primary/20">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </motion.div>
              ))}
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
              Become Part of Our Vision
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who are unlocking their global potential with Brillianton
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

