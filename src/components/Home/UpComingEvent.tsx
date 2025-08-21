'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import { events } from '@/data/menuData';

export default function UpcomingEvents() {
  const upcomingEvents = events.filter(event => event.status === 'upcoming');

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 gold">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join us for exclusive culinary experiences and special celebrations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-2 bg-gold text-gray-900 px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full border border-gold text-gold py-2 rounded-lg font-medium hover:bg-gold hover:text-gray-900 transition-all duration-300"
                >
                  Reserve Spot
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}