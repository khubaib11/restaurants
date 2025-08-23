'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 gold" />
              <span className="text-2xl font-serif font-bold gold">
                Bella Vista
              </span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Experience the finest traditional cuisine in an elegant atmosphere. 
              Our commitment to excellence ensures every visit is memorable.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-serif font-semibold gold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 gold flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 gold flex-shrink-0" />
                <span className="text-gray-300">khankhubaib089@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 gold flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Gourmet Street<br />
                  Culinary District, NY 10001
                </span>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-serif font-semibold gold">Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Mon - Thu</span>
                <span className="text-gray-300">5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Fri - Sat</span>
                <span className="text-gray-300">5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sunday</span>
                <span className="text-gray-300">4:00 PM - 9:00 PM</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
            <p className="text-gray-400 text-sm flex flex-col md:flex-row items-center justify-center gap-2">
            <span>
              © 2024 <span className="gold font-semibold">Bella Vista Restaurant</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span>
              Developed by <span className="gold font-semibold">Khubaib Khan</span>
            </span>
            <span className="hidden md:inline">|</span>
            <span>All rights reserved.</span>
            </p>
        </motion.div>
      </div>
    </footer>
  );
}