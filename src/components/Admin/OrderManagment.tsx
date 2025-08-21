'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, Truck, Package, Phone, MapPin, Eye } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'placed' | 'cooking' | 'ready' | 'delivering' | 'delivered';
  timestamp: Date;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'John Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      items: [
        { name: 'Wagyu Beef Tenderloin', quantity: 1, price: 65 },
        { name: 'Truffle Arancini', quantity: 2, price: 18 }
      ],
      total: 101,
      status: 'placed',
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 'ORD002',
      customerName: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      items: [
        { name: 'Lobster Thermidor', quantity: 1, price: 52 },
        { name: 'Crème Brûlée', quantity: 2, price: 12 }
      ],
      total: 76,
      status: 'cooking',
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 'ORD003',
      customerName: 'Mike Johnson',
      phone: '+1 (555) 456-7890',
      address: '789 Pine St, Manhattan, NY 10002',
      items: [
        { name: 'Duck à l\'Orange', quantity: 1, price: 38 },
        { name: 'Chocolate Soufflé', quantity: 1, price: 14 }
      ],
      total: 52,
      status: 'ready',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusSteps = [
    { key: 'placed', label: 'Order Placed', icon: Clock, color: 'text-yellow-400' },
    { key: 'cooking', label: 'Cooking', icon: Package, color: 'text-orange-400' },
    { key: 'ready', label: 'Ready', icon: CheckCircle, color: 'text-green-400' },
    { key: 'delivering', label: 'Out for Delivery', icon: Truck, color: 'text-blue-400' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-green-500' }
  ];

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ).filter(order => !(newStatus === 'delivered' && order.id === orderId))
    );
  };

  const getStatusIndex = (status: Order['status']) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold gold mb-8"
      >
        Order Management
      </motion.h2>

      <div className="space-y-6">
        <AnimatePresence>
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-400">
                        {order.timestamp.toLocaleTimeString()} - {order.customerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold gold">${order.total}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300 hover:text-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Status Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-700"></div>
                    <div 
                      className="absolute top-4 left-0 h-0.5 bg-gold transition-all duration-500"
                      style={{ width: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%` }}
                    ></div>
                    
                    {statusSteps.map((step, stepIndex) => {
                      const isActive = getStatusIndex(order.status) >= stepIndex;
                      const StepIcon = step.icon;
                      
                      return (
                        <div key={step.key} className="flex flex-col items-center relative z-10">
                          <motion.div
                            animate={{
                              backgroundColor: isActive ? '#D4AF37' : '#374151',
                              scale: isActive ? 1.1 : 1
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                              isActive ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            <StepIcon className="w-4 h-4" />
                          </motion.div>
                          <span className={`text-xs ${isActive ? step.color : 'text-gray-500'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center">
                  {order.status !== 'delivered' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const currentIndex = getStatusIndex(order.status);
                        const nextStatus = statusSteps[currentIndex + 1]?.key as Order['status'];
                        if (nextStatus) {
                          updateOrderStatus(order.id, nextStatus);
                        }
                      }}
                      className="gold-bg text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
                    >
                      {order.status === 'placed' && 'Start Cooking'}
                      {order.status === 'cooking' && 'Mark Ready'}
                      {order.status === 'ready' && 'Start Delivery'}
                      {order.status === 'delivering' && 'Mark Delivered'}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-800 rounded-xl"
          >
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Active Orders</h3>
            <p className="text-gray-500">All orders have been completed successfully!</p>
          </motion.div>
        )}
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold gold mb-4">
                    Order Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gold" />
                      <div>
                        <p className="text-white font-semibold">{selectedOrder.customerName}</p>
                        <p className="text-gray-400 text-sm">{selectedOrder.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gold mt-1" />
                      <div>
                        <p className="text-white font-semibold">Delivery Address</p>
                        <p className="text-gray-400 text-sm">{selectedOrder.address}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-white font-semibold mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-300">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="text-gold font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-gray-700 pt-2 mt-3">
                          <div className="flex justify-between items-center text-lg">
                            <span className="text-white font-semibold">Total</span>
                            <span className="text-gold font-bold">${selectedOrder.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedOrder(null)}
                    className="w-full mt-6 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}