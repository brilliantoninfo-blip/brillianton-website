"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Plane, Globe, GraduationCap, Users, ArrowRight, CheckCircle, Calendar, MapPin, BookOpen } from "lucide-react";

const programFeatures = [
  {
    icon: Globe,
    title: "Global Exposure",
    description: "Experience diverse cultures and educational systems firsthand, broadening your worldview and understanding.",
  },
  {
    icon: GraduationCap,
    title: "Academic Immersion",
    description: "Learn in international classrooms with world-class educators and cutting-edge curricula.",
  },
  {
    icon: Users,
    title: "Cross-Cultural Learning",
    description: "Build global connections and develop international perspectives through meaningful interactions.",
  },
  {
    icon: BookOpen,
    title: "Safe & Authentic",
    description: "Carefully structured programs ensuring safety while providing genuine cultural experiences.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Application",
    description: "Submit your application with required documents and personal statement.",
  },
  {
    step: "02",
    title: "Selection",
    description: "Our team reviews applications and conducts interviews with qualified candidates.",
  },
  {
    step: "03",
    title: "Matching",
    description: "We match you with partner schools based on your interests and academic goals.",
  },
  {
    step: "04",
    title: "Preparation",
    description: "Comprehensive orientation and preparation sessions before your exchange begins.",
  },
  {
    step: "05",
    title: "Experience",
    description: "Embark on your exchange program with ongoing support from our team.",
  },
];

export default function StudentExchangePage() {
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
                Student Exchange Program
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our upcoming exchange initiative will open doors for Indian high schoolers to experience classrooms around the world — safely, authentically, academically.
              </p>
              <Link
                href="#register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors group"
              >
                <span>Register Interest</span>
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
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
                alt="International student exchange"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
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
                Program Highlights
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                What makes our exchange program unique
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
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
                    <h3 className="text-2xl font-bold text-text mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process for Schools */}
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
                Process for Schools to Partner
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                How schools can join our global exchange network
              </p>
            </motion.div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="space-y-8">
                {[
                  {
                    title: "Initial Consultation",
                    description: "Schedule a meeting with our team to discuss partnership opportunities and program details.",
                  },
                  {
                    title: "Partnership Agreement",
                    description: "Formalize the partnership with clear terms, responsibilities, and program structure.",
                  },
                  {
                    title: "School Matching",
                    description: "We facilitate connections between partner schools based on compatibility and goals.",
                  },
                  {
                    title: "Program Implementation",
                    description: "Launch exchange programs with our support for logistics, safety, and academic coordination.",
                  },
                  {
                    title: "Ongoing Support",
                    description: "Continuous assistance and monitoring to ensure successful exchange experiences.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-6"
                  >
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
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
                Application Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple steps to start your exchange journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white text-center h-full">
                    <div className="text-4xl font-bold text-white/30 mb-4">{step.step}</div>
                    <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-white/90">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="register" className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Global Education?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Register your interest and be among the first to join our student exchange program
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 group"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

