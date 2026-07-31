'use client';

import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FiturUtama from '@/components/FiturUtama';
import TrustedCircleSection from '@/components/TrustedCircleSelection';
import NumbersSection from '@/components/NumbersSection';
import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';

export default function Home(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show the loading screen for 1.5 seconds on initial load
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen message="Memuat SafeStep" />;
  }

  return (
    <main className="w-full flex flex-col items-center">
      <Hero />
      <FiturUtama />
      <TrustedCircleSection />
      <NumbersSection />
      <Footer />
    </main>
  );
}