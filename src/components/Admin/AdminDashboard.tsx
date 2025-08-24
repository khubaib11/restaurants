'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ChefHat, 
  Calendar, 
  Plus, 
  LogOut,
  Utensils,
  CalendarPlus
} from 'lucide-react';
import OrderManagement from './OrderManagement';
import MenuManagement from './MenuManagement';
import EventManagementComponent from './EventManagement';
import { useRouter } from 'next/navigation';

type TabType = 'dashboard' | 'orders' | 'menu' | 'events' | 'settings';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  action: () => void;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, change }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${trend === 'up' ? 'bg-green-500/20 text-green-400' : trend === 'down' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
    {change && (
      <div className="mt-4">
        <span className={`inline-flex items-center text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
          <span className="text-gray-400 ml-1">vs last month</span>
        </span>
      </div>
    )}
  </div>
);

type StatItem = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  description?: string;
};



type QuickActionItem = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  action: () => void;
};

interface DashboardOverviewProps {
  stats: StatItem[];
  quickActions: QuickActionItem[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats, quickActions }) => {


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to your restaurant management system. Here&apos;s how to get started:</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ y: -2 }}
            onClick={action.action}
            className={`${action.color} p-4 rounded-xl text-white flex flex-col items-center justify-center transition-all shadow-lg`}
          >
            <action.icon className="h-8 w-8 mb-2" />
            <span className="font-medium">{action.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Stats Grid - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Getting Started Guide */}
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">Getting Started</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2 flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-amber-400" />
              Managing Orders
            </h3>
            <p className="text-gray-300 text-sm">
              View and manage all incoming orders. Update order status, view order details, and handle customer requests.
              Click on the &quot;Orders&quot; tab in the sidebar to get started.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2 flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-amber-400" />
              Menu Management
            </h3>
            <p className="text-gray-300 text-sm">
              Add, edit, or remove menu items. Update prices, descriptions, and images. Organize items into categories 
              for better customer experience.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2 flex items-center">
              <CalendarPlus className="h-5 w-5 mr-2 text-amber-400" />
              Events & Promotions
            </h3>
            <p className="text-gray-300 text-sm">
              Create and manage special events, promotions, and offers. Add images, set dates, and track event status.
              Great for seasonal menus or special occasions.
            </p>
          </div>
          
        </div>
      </div>


      {/* Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Items */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Items</h3>
          <div className="space-y-4">
            {['Margherita Pizza', 'Pasta Carbonara', 'Caesar Salad', 'Tiramisu', 'Garlic Bread']
              .map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-md bg-gray-700 flex items-center justify-center">
                      <Utensils className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </div>
                  <span className="text-sm text-gray-400">{Math.floor(Math.random() * 50) + 20} orders</span>
                </div>
              ))
            }
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New order #1234 received', time: '2 min ago' },
              { action: 'Menu item "Spicy Pasta" updated', time: '1 hour ago' },
              { action: 'New table reservation for 4 people', time: '3 hours ago' },
              { action: 'Special offer created', time: '5 hours ago' },
              { action: 'New staff member added', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="text-gray-200">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { user, logout } = useAuth();
  const router = useRouter();

  const tabs: TabProps[] = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders' as TabType, label: 'Orders', icon: ShoppingBag },
    { id: 'menu' as TabType, label: 'Menu', icon: ChefHat },
    { id: 'events' as TabType, label: 'Events', icon: Calendar }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'new-order',
      title: 'New Order',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => setActiveTab('orders' as TabType)
    },
    {
      id: 'add-menu',
      title: 'Add Menu Item',
      icon: Utensils,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => setActiveTab('menu' as TabType)
    },
    {
      id: 'schedule-event',
      title: 'Schedule Event',
      icon: CalendarPlus,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => setActiveTab('events' as TabType)
    }
  ];

  const stats: StatItem[] = [
    { 
      title: 'Active Orders', 
      value: '24', 
      trend: 'up' as const, 
      change: '12%', 
      icon: ShoppingBag,
      description: 'Orders being prepared or in delivery'
    },
    { 
      title: 'Menu Items', 
      value: '58', 
      trend: 'up', 
      change: '5', 
      icon: Utensils,
      description: 'Total items in your menu'
    },
    { 
      title: 'Upcoming Events', 
      value: '3', 
      trend: 'neutral', 
      change: '0', 
      icon: Calendar,
      description: 'Scheduled events this week'
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-amber-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Bella Vista Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full">
                <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                  {user?.name?.[0]?.toUpperCase() || 'A'}
                </div>
                <span className="text-sm text-gray-200">{user?.name || 'Admin'}</span>
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
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 h-[calc(100vh-4rem)] sticky top-16 p-4 overflow-y-auto">
          <div className="p-2 mb-4">
            <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
              Navigation
            </h2>
            <ul className="space-y-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-amber-500/20 text-amber-400 shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute right-4 w-1.5 h-6 bg-amber-500 rounded-full"
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30
                        }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'dashboard' && <DashboardOverview stats={stats} quickActions={quickActions} />}
              {activeTab === 'orders' && <OrderManagement />}
              {activeTab === 'menu' && <MenuManagement />}
              {activeTab === 'events' && (
                <EventManagementComponent />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
