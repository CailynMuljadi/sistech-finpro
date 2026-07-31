'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, ShieldCheck, X } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  onSkip: () => void;
}

export default function LocationPermissionModal({
  isOpen,
  onAllow,
  onSkip,
}: LocationPermissionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center my-auto">
        
        {/* Close Icon Top Right */}
        <button 
          onClick={onSkip}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Location Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#ffeff7] text-[#ce0088] flex items-center justify-center mb-6 shadow-sm">
          <MapPin className="w-8 h-8" />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-extrabold text-[#17274d] mb-3">
          Izinkan Akses Lokasi
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          Dibutuhkan untuk rekomendasi rute aman, pelaporan otomatis, dan fitur SOS. Lokasi kamu tidak pernah dibagikan tanpa aksi eksplisit dari kamu.
        </p>

        {/* Privacy Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-500 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#ce0088]" />
          <span>100% Enkripsi &amp; Privasi Terjaga</span>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={onAllow}
            className="w-full py-3.5 px-4 rounded-xl bg-[#17274d] text-white font-bold text-sm shadow-md hover:bg-[#17274d]/90 active:scale-95 transition-all cursor-pointer"
          >
            Izinkan Akses Lokasi
          </button>
          
          <button
            onClick={onSkip}
            className="w-full py-3 px-4 rounded-xl text-gray-500 font-semibold text-sm hover:text-[#17274d] transition-colors cursor-pointer"
          >
            Nanti Saja
          </button>
        </div>

      </div>
    </div>
  );
}