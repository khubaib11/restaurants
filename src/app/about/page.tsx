"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { teamMembers } from "@/data/menuData";
import { Award, Clock, Users, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const features = [
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized by culinary experts worldwide for our exceptional cuisine and service.",
    },
    {
      icon: Clock,
      title: "20+ Years",
      description:
        "Two decades of culinary excellence and memorable dining experiences.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Michelin-trained chefs and professional service staff dedicated to perfection.",
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description:
        "Every dish is crafted with love and attention to the finest details.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gray-900 relative">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/about-hero-bg.jpeg')",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6 gold"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A legacy of culinary excellence, where tradition meets innovation in
            every dish we serve
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6 gold">
                A Culinary Journey
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2004 by renowned chef Marco Rossini, Bella Vista
                  began as a vision to create an extraordinary dining
                  destination that honors traditional Italian cuisine while
                  embracing contemporary culinary artistry.
                </p>
                <p>
                  Our commitment to excellence extends beyond the kitchen. We
                  source the finest ingredients from local farms and trusted
                  suppliers, ensuring every dish reflects our passion for
                  quality and authenticity.
                </p>
                <p>
                  Over the years, Bella Vista has become more than a
                  restaurant—it&apos;s a place where memories are made,
                  celebrations unfold, and the art of fine dining is elevated to
                  new heights.
                </p>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/about-journey.jpeg"
                alt="Restaurant Interior"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold mb-4 gold">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our dedication to excellence is reflected in every aspect of the
              dining experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold mb-4 gold">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The passionate professionals who bring our culinary vision to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group text-center"
              >
                <div className="bg-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative mb-6">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gold/30 group-hover:border-gold transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-gold font-medium mb-4">
                    {member.position}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
