'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Shield, FileText, Info, Navigation, AlertTriangle, MapPin } from 'lucide-react';
import LocationPermissionModal from '@/components/LocationPermissionModal';

export default function DashboardPage() {
  const { user } = useUser();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  const fetchLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowLocationModal(false);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          setShowLocationModal(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setShowLocationModal(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className="min-h-screen bg-[#ffeff7] pb-12 px-4 sm:px-6 pt-6">
      <div className="max-w-md sm:max-w-xl mx-auto space-y-6">
        
        {/* Header Greeting */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17274d]">
              {getGreeting()}, {user?.firstName || '[name]'}!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {userCoords 
                ? `Lokasi terdeteksi (${userCoords.lat.toFixed(3)}, ${userCoords.lng.toFixed(3)})` 
                : 'Lokasi belum diaktifkan'}
            </p>
          </div>

          {!userCoords && (
            <button
            onClick={() => setShowLocationModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#ce0088] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#ce0088]/90 transition-all animate-pulse cursor-pointer"
            >
            <MapPin className="w-4 h-4 text-white" />
            <span>Aktifkan GPS</span>
            </button>
        )}
        </header>

        {/* Risk Status Card */}
        <div className="w-full p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-amber-900 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">
              Kamu berada di area <strong className="font-bold">berisiko Sedang</strong>
            </span>
          </div>
          <Info className="w-4 h-4 text-amber-700" />
        </div>

        {/* Primary Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/safe-route"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-[#ffeff7] text-[#ce0088] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Navigation className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-[#17274d] text-center">
              Cari Rute Aman
            </span>
          </Link>

          <Link
            href="/anonymous-reporting"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-[#ffeff7] text-[#ce0088] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-[#17274d] text-center">
              Lapor Insiden
            </span>
          </Link>
        </div>

        {/* Emergency SOS Banner */}
        <div className="w-full p-5 bg-white rounded-2xl border border-pink-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#17274d]">Emergency SOS</h3>
              <p className="text-xs text-gray-500">Kirim sinyal darurat 1-tap</p>
            </div>
          </div>
          
          <Link
            href="/emergency-sos"
            className="px-5 py-2.5 rounded-xl bg-[#17274d] text-white font-bold text-xs shadow-sm hover:bg-[#17274d]/90 transition-all"
          >
            Mulai
          </Link>
        </div>

      </div>

      {/* Location Access Modal */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onAllow={fetchLocation}
        onSkip={() => setShowLocationModal(false)}
      />
    </div>
  );
}