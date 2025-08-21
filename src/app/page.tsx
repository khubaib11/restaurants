'use client';

import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import HeroSection from '@/components/Home/HeroSection';
import FeaturedMenu from '@/components/Home/FeaturedMenu';
import UpcomingEvents from '@/components/Home/UpComingEvent';
import PreviousEvents from '@/components/Home/PreviousEvent';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedMenu />
      <UpcomingEvents />
      <PreviousEvents />
      <Footer />
    </div>
  );
}