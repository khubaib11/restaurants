'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { MenuItem } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category
    });
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {item.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-gold text-gray-900 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-4 right-4 bg-gold text-gray-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-yellow-500"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold gold">${item.price}</span>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(item)}
                    className="text-gold hover:text-yellow-500 font-medium text-sm transition-colors duration-300"
                  >
                    Add to Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}