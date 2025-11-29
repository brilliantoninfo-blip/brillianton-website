"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FileText, User, GraduationCap, Target, CheckCircle, ArrowRight, Search, Calendar, BookOpen, Award } from "lucide-react";

const mentoringServices = [
  {
    icon: GraduationCap,
    title: "UG/PG Guidance",
    description: "Comprehensive support for undergraduate and postgraduate applications to top universities worldwide.",
  },
  {
    icon: FileText,
    title: "SOP Writing",
    description: "Expert assistance in crafting compelling Statements of Purpose that highlight your unique story.",
  },
  {
    icon: User,
    title: "CV Structure",
    description: "Professional CV/resume development tailored to international standards and university requirements.",
  },
  {
    icon: Target,
    title: "Profile Building",
    description: "Strategic guidance to enhance your academic and extracurricular profile for competitive applications.",
  },
];

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "Understanding your goals, strengths, and aspirations through comprehensive assessment.",
  },
  {
    icon: Calendar,
    title: "Plan",
    description: "Creating a tailored roadmap with timelines and milestones for your application journey.",
  },
  {
    icon: BookOpen,
    title: "Train",
    description: "Developing skills, refining essays, and preparing for interviews and standardized tests.",
  },
  {
    icon: FileText,
    title: "Apply",
    description: "Submitting polished applications with expert review and strategic positioning.",
  },
  {
    icon: Award,
    title: "Achieve",
    description: "Celebrating acceptances and preparing for your next chapter at top universities.",
  },
];

const successMetrics = [
  { label: "Acceptance Rate", value: "95%", description: "Students accepted to top universities" },
  { label: "Top 100 QS Universities", value: "78%", description: "Admissions to world's leading institutions" },
  { label: "Scholarship Success", value: "62%", description: "Students receiving financial aid" },
  { label: "Ivy League", value: "34%", description: "Acceptances to Ivy League universities" },
];

export default function MentoringPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-white to-accent/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
                Mentoring
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Personalized guidance for students aiming at top QS universities, Ivy League pathways, and global fellowships.
                From SOP writing to profile building — we help you stand out.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Student mentoring session"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Mentoring Includes */}
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
                What Mentoring Includes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive support across all aspects of your application journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mentoringServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-accent/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
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
                Our Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A structured approach from discovery to achievement
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-text mb-3">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6 text-primary" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pathway to Top Universities */}
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
                Pathway to Top QS Universities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic guidance for admissions to the world's leading institutions
              </p>
            </motion.div>

            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-6">What We Cover</h3>
                  <ul className="space-y-4">
                    {[
                      "University selection and fit analysis",
                      "Application strategy and timeline planning",
                      "Essay and personal statement development",
                      "Recommendation letter guidance",
                      "Interview preparation and practice",
                      "Financial aid and scholarship applications",
                    ].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                        <span className="text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Top Destinations</h3>
                  <ul className="space-y-3 text-white/90">
                    {[
                      "United States (Ivy League, Top 50)",
                      "United Kingdom (Oxbridge, Russell Group)",
                      "Canada (U15, Top Universities)",
                      "Australia (Group of Eight)",
                      "Singapore (NUS, NTU)",
                      "Europe (Top Continental Universities)",
                    ].map((destination) => (
                      <li key={destination} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>{destination}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
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
                Success Metrics
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real results from our mentoring programs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-5xl font-bold text-primary mb-3">{metric.value}</div>
                  <div className="text-lg font-semibold text-text mb-2">{metric.label}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Connect with our mentors and take the first step toward your dream university
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 group"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

