'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import MenuGrid from '@/components/Menu/MenuGrid';
import OrderModal from '@/components/Menu/OrderModel';
import { menuItems } from '@/data/menuData';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOrderModal, setShowOrderModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizer', name: 'Appetizers' },
    { id: 'main', name: 'Main Courses' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'beverage', name: 'Beverages' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gray-900 relative">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6 gold"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Discover our carefully curated selection of traditional dishes, 
            each crafted with the finest ingredients and culinary expertise
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-800 sticky top-20 z-40 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'gold-bg text-gray-900'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <MenuGrid items={filteredItems} />

      {/* Order Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 text-center bg-gray-800"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowOrderModal(true)}
          className="gold-bg text-gray-900 px-12 py-4 rounded-lg font-semibold text-xl hover:bg-yellow-500 transition-all duration-300"
        >
          Place Your Order
        </motion.button>
      </motion.div>

      {/* Order Modal */}
      <OrderModal 
        isOpen={showOrderModal} 
        onClose={() => setShowOrderModal(false)} 
      />

      <Footer />
    </div>
  );
}