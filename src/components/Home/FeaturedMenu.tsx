'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { menuItems } from '@/data/menuData';

export default function FeaturedMenu() {
  const featuredItems = menuItems.filter(item => item.featured);

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 gold">
            Signature Dishes
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience our chef&apos;s most celebrated creations, crafted with passion and the finest ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-gray-700 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-gold text-gray-900 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-2xl font-bold gold">${item.price}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center space-x-2 gold-bg text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300"
            >
              <span>View Full Menu</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}