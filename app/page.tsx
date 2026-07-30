import React from 'react';
import Hero from '@/components/Hero';
import FiturUtama from '@/components/FiturUtama';
import TrustedCircleSection from '@/components/TrustedCircleSelection';
import NumbersSection from '@/components/NumbersSection';

export default function Home(): React.ReactElement {
  return (
    <main className="w-full flex flex-col items-center">
      <Hero />
      <FiturUtama />
      <TrustedCircleSection />
      <NumbersSection />
    </main>
  );
}