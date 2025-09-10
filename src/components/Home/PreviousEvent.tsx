'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { events } from '@/data/menuData';

export default function PreviousEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Use useMemo to avoid re-filtering on each render
  const pastEvents = React.useMemo(() => 
    events.filter(event => event.status === 'past'),
    [] // Empty dependency array means this only runs once
  );

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % pastEvents.length);
  }, [pastEvents.length]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + pastEvents.length) % pastEvents.length);
  }, [pastEvents.length]);

  if (pastEvents.length === 0) return null;

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 gold">
            Previous Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Relive the memorable moments from our past culinary celebrations
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="relative will-change-transform"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-80">
                    <Image
                      src={pastEvents[currentIndex].image}
                      alt={pastEvents[currentIndex].title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50 lg:to-gray-900" />
                  </div>
                  
                  <div className="bg-gray-700 p-8 lg:p-12 flex flex-col justify-center">
                    <div>
                      <div className="inline-block bg-gold text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        {new Date(pastEvents[currentIndex].date).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-white mb-4">
                        {pastEvents[currentIndex].title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {pastEvents[currentIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {pastEvents.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gold text-white hover:text-gray-900 p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gold text-white hover:text-gray-900 p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Indicators */}
          {pastEvents.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {pastEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 transform-gpu ${
                    index === currentIndex ? 'gold-bg' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
