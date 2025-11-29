"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { School, Users, Globe, Handshake, ArrowRight, Calendar, Award, BookOpen } from "lucide-react";

const collaborations = [
  {
    icon: School,
    title: "School-to-School Partnerships",
    description: "Establishing direct connections between Indian and international schools for collaborative learning experiences.",
    examples: ["Joint curriculum development", "Teacher exchange programs", "Shared educational resources"],
  },
  {
    icon: Users,
    title: "Global Events",
    description: "Organizing and participating in international educational conferences, competitions, and cultural exchanges.",
    examples: ["International STEM camps", "Model UN conferences", "Global leadership summits"],
  },
  {
    icon: Handshake,
    title: "Educational Alliances",
    description: "Building strategic partnerships with universities, organizations, and institutions worldwide.",
    examples: ["University partnerships", "Research collaborations", "Scholarship programs"],
  },
];

const examples = [
  {
    title: "International STEM Camps",
    description: "Hands-on science and technology programs bringing together students from multiple countries.",
    icon: BookOpen,
  },
  {
    title: "Intercultural Exchange",
    description: "Programs fostering understanding and collaboration across different cultures and backgrounds.",
    icon: Globe,
  },
  {
    title: "Joint Learning Programs",
    description: "Collaborative educational initiatives where students work together on global challenges.",
    icon: Users,
  },
];

export default function InternationalCollaborationPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent via-white to-accent/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text mb-4 md:mb-6">
                International Collaboration
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
                We bridge students with international schools, events, and academic networks.
                Brillianton believes education is global.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-all duration-300 hover:shadow-xl hover:scale-105 group"
              >
                <span className="text-sm md:text-base">Partner With Us</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                alt="International collaboration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collaboration Types */}
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
                Our Collaboration Framework
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Building bridges between educational institutions worldwide
              </p>
            </motion.div>

            <div className="space-y-12">
              {collaborations.map((collab, index) => {
                const Icon = collab.icon;
                return (
                  <motion.div
                    key={collab.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-accent/50 rounded-2xl p-8 md:p-12 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-text mb-4">{collab.title}</h3>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">{collab.description}</p>
                        <div className="space-y-2">
                          {collab.examples.map((example, i) => (
                            <div key={i} className="flex items-center space-x-2 text-gray-700">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span>{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
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
                Examples of Our Work
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real programs making a global impact
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {examples.map((example, index) => {
                const Icon = example.icon;
                return (
                  <motion.div
                    key={example.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-text mb-3 md:mb-4 group-hover:text-primary transition-colors">{example.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{example.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Process */}
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
                How It Works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Connect", description: "Reach out to explore partnership opportunities" },
                { step: "02", title: "Plan", description: "Design collaborative programs tailored to your needs" },
                { step: "03", title: "Implement", description: "Launch programs with ongoing support and guidance" },
                { step: "04", title: "Grow", description: "Expand and evolve partnerships for long-term impact" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white text-center h-full">
                    <div className="text-5xl font-bold text-white/30 mb-4">{item.step}</div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-white/90">{item.description}</p>
                  </div>
                  {index < 3 && (
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
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our global network of educational institutions and create meaningful impact together
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

