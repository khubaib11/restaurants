'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Star, DollarSign, Tag, FileText } from 'lucide-react';
import { menuItems as initialMenuItems, MenuItem } from '@/data/menuData';

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'appetizer' as MenuItem['category'],
    image: '',
    featured: false
  });

  const categories = [
    { id: 'appetizer', name: 'Appetizers' },
    { id: 'main', name: 'Main Courses' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'beverage', name: 'Beverages' }
  ];

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'appetizer',
      image: '',
      featured: false
    });
    setShowModal(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      featured: item.featured || false
    });
    setShowModal(true);
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? {
              ...item,
              name: formData.name,
              description: formData.description,
              price: parseFloat(formData.price),
              category: formData.category,
              image: formData.image,
              featured: formData.featured
            }
          : item
      ));
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: `item${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        featured: formData.featured
      };
      setMenuItems(prev => [...prev, newItem]);
    }
    
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif font-bold gold"
        >
          Menu Management
        </motion.h2>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddItem}
          className="gold-bg text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Menu Item</span>
        </motion.button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {item.featured && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center space-x-1 bg-gold text-gray-900 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-semibold">Featured</span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditItem(item)}
                    className="p-2 bg-gray-800/80 hover:bg-gold text-white hover:text-gray-900 rounded-full transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 bg-gray-800/80 hover:bg-red-500 text-white rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-white text-lg">
                    {item.name}
                  </h3>
                  <span className="text-gold font-bold text-lg">${item.price}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-serif font-bold gold">
                      {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300"
                        placeholder="Item Name"
                      />
                    </div>

                    <div>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300 resize-none h-20"
                        placeholder="Description"
                      />
                    </div>

                    <div className="relative">
                      <DollarSign className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300"
                        placeholder="Price"
                      />
                    </div>

                    <div className="relative">
                      <Tag className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as MenuItem['category']})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white focus:border-gold focus:outline-none transition-all duration-300 appearance-none"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300"
                        placeholder="Image URL (optional)"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="w-4 h-4 text-gold bg-gray-700 border-gray-600 rounded focus:ring-gold focus:ring-2"
                      />
                      <label htmlFor="featured" className="text-white">
                        Featured Item
                      </label>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 gold-bg text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
                      >
                        {editingItem ? 'Update' : 'Add'} Item
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}