'use client';

import { useState } from 'react';

import LocationPermissionModal from '@/components/LocationPermissionModal';

import { SafeRouteHeader } from '@/features/SafeRoute/SafeRouteHeader';
import { RouteSearchCard } from '@/features/SafeRoute/RouteSearchCard';
import { RouteResultList } from '@/features/SafeRoute/RouteResultList';
import { RouteDetail } from '@/features/SafeRoute/RouteDetail';
import { JourneyStarted } from '@/features/SafeRoute/JourneyStarted';

import { RouteData } from '@/features/SafeRoute/data';

type Step = 'search' | 'result' | 'detail' | 'journey';

export default function SafeRoutePage() {
  // Modal Lokasi
  const [showLocationModal, setShowLocationModal] = useState(true);

  // Step halaman
  const [step, setStep] = useState<Step>('search');

  // Form
  const [origin, setOrigin] = useState('Lokasi Saat Ini');
  const [destination, setDestination] = useState('');

  // Waktu
  const [travelMode, setTravelMode] = useState<'now' | 'schedule'>('now');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Route terpilih
  const [selectedRoute, setSelectedRoute] =
    useState<RouteData | null>(null);

  // Cari Route
  const handleSearch = () => {
    if (!destination.trim()) {
      alert('Silakan masukkan tujuan.');
      return;
    }

    setStep('result');
  };

  // Pilih Route
  const handleSelectRoute = (route: RouteData) => {
    setSelectedRoute(route);
    setStep('detail');
  };

  // Mulai perjalanan
  const handleStartJourney = () => {
    setStep('journey');
  };

  // Selesai perjalanan
  const handleFinishJourney = () => {
    setSelectedRoute(null);
    setDestination('');
    setDate('');
    setTime('');
    setTravelMode('now');

    setStep('search');
  };

  return (
    <div className="min-h-screen bg-[#ffeff7]">

      <LocationPermissionModal
        isOpen={showLocationModal}
        onAllow={() => setShowLocationModal(false)}
        onSkip={() => setShowLocationModal(false)}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {(step === 'search' || step === 'result') && (
          <div className="space-y-8">

            <SafeRouteHeader />

            <RouteSearchCard
              origin={origin}
              destination={destination}
              travelMode={travelMode}
              date={date}
              time={time}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
              onTravelModeChange={setTravelMode}
              onDateChange={setDate}
              onTimeChange={setTime}
              onSearch={handleSearch}
            />

            {step === 'result' && (
              <RouteResultList
                onSelect={handleSelectRoute}
              />
            )}

          </div>
        )}

        {step === 'detail' &&
          selectedRoute && (
            <RouteDetail
              route={selectedRoute}
              onBack={() => setStep('result')}
              onStart={handleStartJourney}
            />
          )}

        {step === 'journey' &&
          selectedRoute && (
            <JourneyStarted
              route={selectedRoute}
              origin={origin}
              destination={destination}
              onFinish={handleFinishJourney}
            />
          )}

      </div>
    </div>
  );
}