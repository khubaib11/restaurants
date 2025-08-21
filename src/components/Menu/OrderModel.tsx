'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    clearCart();
    setCustomerInfo({ name: '', phone: '', address: '' });
    
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Success State */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gray-800 flex items-center justify-center z-10"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-8 h-8 text-white" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-serif font-bold text-white mb-2"
                      >
                        Order Confirmed!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-300 max-w-sm mx-auto"
                      >
                        Your order has been sent to the restaurant. A confirmation call will reach you shortly.
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-serif font-bold gold">Your Order</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto">
                {/* Cart Items */}
                <div className="p-6">
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400 text-lg">Your cart is empty</p>
                      <p className="text-gray-500 text-sm mt-2">Add some delicious items from our menu!</p>
                    </div>
                  ) : (
                    <motion.div layout className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{item.name}</h4>
                            <p className="text-sm text-gray-400 capitalize">{item.category}</p>
                            <p className="font-bold gold">${item.price}</p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-gray-600 rounded-lg p-1">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-500 rounded"
                              >
                                <Minus className="w-4 h-4 text-white" />
                              </motion.button>
                              <span className="w-8 text-center text-white font-semibold">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-500 rounded"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </motion.button>
                            </div>
                            
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-600 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Order Form */}
                {items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="border-t border-gray-700 pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-semibold text-white">Total:</span>
                        <span className="text-2xl font-bold gold">${total.toFixed(2)}</span>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-transparent peer focus:border-gold focus:outline-none transition-all duration-300"
                            placeholder="Full Name"
                          />
                          <motion.label
                            className="absolute left-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-gold top-1 text-xs"
                            animate={{ color: customerInfo.name ? '#D4AF37' : '#9CA3AF' }}
                          >
                            Full Name
                          </motion.label>
                        </div>
                        
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-transparent peer focus:border-gold focus:outline-none transition-all duration-300"
                            placeholder="Phone Number"
                          />
                          <motion.label
                            className="absolute left-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-gold top-1 text-xs"
                            animate={{ color: customerInfo.phone ? '#D4AF37' : '#9CA3AF' }}
                          >
                            Phone Number
                          </motion.label>
                        </div>
                        
                        <div className="relative">
                          <textarea
                            required
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-transparent peer focus:border-gold focus:outline-none transition-all duration-300 resize-none h-20"
                            placeholder="Delivery Address"
                          />
                          <motion.label
                            className="absolute left-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-gold top-1 text-xs"
                            animate={{ color: customerInfo.address ? '#D4AF37' : '#9CA3AF' }}
                          >
                            Delivery Address
                          </motion.label>
                        </div>
                        
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full gold-bg text-gray-900 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                              <span>Placing Order...</span>
                            </div>
                          ) : (
                            'Place Order'
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}