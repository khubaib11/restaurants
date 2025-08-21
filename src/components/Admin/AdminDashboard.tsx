'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Calendar,
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  ChefHat
} from 'lucide-react';
import OrderManagement from '@/components/Admin/OrderManagment';
import MenuManagement from '@/components/Admin/MenuManagment';

type TabType = 'dashboard' | 'orders' | 'menu' | 'events';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { logout } = useAuth();

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders' as TabType, label: 'Orders', icon: ShoppingBag },
    { id: 'menu' as TabType, label: 'Menu', icon: ChefHat },
    { id: 'events' as TabType, label: 'Events', icon: Calendar },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 gold" />
              <h1 className="text-2xl font-serif font-bold gold">
                Bella Vista Admin
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <motion.nav
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-64 bg-gray-800 min-h-screen border-r border-gray-700 p-6"
        >
          <div className="space-y-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'gold-bg text-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'orders' && <OrderManagement />}
            {activeTab === 'menu' && <MenuManagement />}
            {activeTab === 'events' && <EventManagement />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const stats = [
    { label: 'Total Orders', value: '156', change: '+12%', color: 'text-green-400' },
    { label: 'Revenue', value: '$12,450', change: '+8%', color: 'text-green-400' },
    { label: 'Menu Items', value: '48', change: '+2', color: 'text-blue-400' },
    { label: 'Events', value: '3', change: 'New', color: 'text-gold' },
  ];

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold gold mb-8"
      >
        Dashboard Overview
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-serif font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              'New order from John Doe - $89',
              'Menu item updated: Wagyu Beef Tenderloin',
              'Event scheduled: Wine Tasting Evening',
              'Order completed: Table 5 - $156'
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-gray-300">{activity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-serif font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Menu Item', icon: Plus },
              { label: 'View Orders', icon: Eye },
              { label: 'Edit Menu', icon: Edit },
              { label: 'Schedule Event', icon: Calendar }
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300"
              >
                <action.icon className="h-6 w-6 gold" />
                <span className="text-sm text-gray-300">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function EventManagement() {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-serif font-bold gold mb-8"
      >
        Event Management
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 p-8 rounded-xl shadow-lg text-center"
      >
        <Calendar className="h-16 w-16 gold mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Event Management</h3>
        <p className="text-gray-400 mb-6">
          Manage restaurant events, special dinners, and celebrations
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="gold-bg text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
        >
          Coming Soon
        </motion.button>
      </motion.div>
    </div>
  );
}