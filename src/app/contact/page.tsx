'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: 'Call us for reservations'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@bellavista.com',
      description: 'Send us a message'
    },
    {
      icon: MapPin,
      title: 'Address',
      info: '123 Gourmet Street, Culinary District, NY 10001',
      description: 'Visit our location'
    },
    {
      icon: Clock,
      title: 'Hours',
      info: 'Mon-Thu: 5PM-10PM, Fri-Sat: 5PM-11PM, Sun: 4PM-9PM',
      description: 'Our operating hours'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gray-900 relative">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/contact-bg.jpeg)',
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;d love to hear from you. Reach out for reservations, 
            special events, or any inquiries
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {info.title}
                  </h3>
                  <p className="text-gray-300 mb-2 text-sm">
                    {info.info}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {info.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold mb-4 gold">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-300">
              Fill out the form below and we&apos;ll get back to you shortly
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl"
          >
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-lg mb-8 text-center"
              >
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-sm">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-transparent peer focus:border-gold focus:outline-none transition-all duration-300"
                    placeholder="Full Name"
                  />
                  <motion.label
                    className="absolute left-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-gold top-1 text-xs"
                    animate={{ color: formData.name ? '#D4AF37' : '#9CA3AF' }}
                  >
                    Full Name
                  </motion.label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-transparent peer focus:border-gold focus:outline-none transition-all duration-300"
                    placeholder="Email Address"
                  />
                  <motion.label
                    className="absolute left-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-gold top-1 text-xs"
                    animate={{ color: formData.email ? '#D4AF37' : '#9CA3AF' }}
                  >
                    Email Address
                  </motion.label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-transparent peer focus:border-gold focus:outline-none transition-all duration-300"
                  placeholder="Phone Number (Optional)"
                />
                <motion.label
                  className="absolute left-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-gold top-1 text-xs"
                  animate={{ color: formData.phone ? '#D4AF37' : '#9CA3AF' }}
                >
                  Phone Number (Optional)
                </motion.label>
              </div>

              <div className="relative">
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-4 text-white placeholder-transparent peer focus:border-gold focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Your Message"
                />
                <motion.label
                  className="absolute left-4 text-gray-400 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-gold top-1 text-xs"
                  animate={{ color: formData.message ? '#D4AF37' : '#9CA3AF' }}
                >
                  Your Message
                </motion.label>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full gold-bg text-gray-900 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}