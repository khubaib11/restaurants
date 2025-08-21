'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ChefHat, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (login(credentials.username, credentials.password)) {
      router.push('/admin');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-4"
            >
              <ChefHat className="w-8 h-8 text-gray-900" />
            </motion.div>
            <h1 className="text-3xl font-serif font-bold gold mb-2">
              Admin Access
            </h1>
            <p className="text-gray-400">
              Secure login to restaurant dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300"
                  placeholder="Username"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 pr-12 text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-all duration-300"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gold-bg text-gray-900 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Access Dashboard'
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-gray-700 rounded-lg"
          >
            <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
            <p className="text-sm text-gray-300 text-center">
              Username: <span className="font-mono gold">user1</span><br />
              Password: <span className="font-mono gold">123</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}