'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  // Use a throttled scroll handler to reduce calculations
  const { scrollY } = useScroll();
  // Optimize transform with a smaller motion range
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="w-full h-full bg-cover bg-center parallax-bg"
          style={{
            backgroundImage: 'url(/images/home-hero-bg.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-serif font-bold mb-6 gold"
        >
          Bella Vista
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
        >
          Experience the finest traditional cuisine in an atmosphere of timeless elegance
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center"
        >
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-bg text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 block w-full sm:w-auto relative overflow-hidden"
           
            >
              Order Now
            </motion.button>
          </Link>
          
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold hover:text-gray-900 transition-all duration-300 block w-full sm:w-auto"
            >
              Our Story
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Optimized Scroll Indicator - using CSS animation */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fadeIn"
        style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}
      >
        <div
          className="w-6 h-10 border-2 border-gold rounded-full flex justify-center"
        >
          <div
            className="w-1 h-3 gold-bg rounded-full mt-2 animate-bounce"
            style={{ animationDuration: '1.5s' }}
          />
        </div>
      </div>
    </section>
  );
}