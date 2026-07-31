'use client';

import React, { useState, useEffect } from 'react';
import { Navigation, MapPin } from 'lucide-react';

export const StaticMiniMap: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => null,
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="w-full h-36 bg-white/80 rounded-2xl border border-[#17274d]/15 relative overflow-hidden flex flex-col items-center justify-between p-3 font-mono">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ce0088_1px,transparent_1px)] [background-size:12px_12px]"></div>

      <div className="relative z-10 flex items-center gap-1.5 bg-[#17274d] text-[#ffeff7] px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
        <Navigation className="w-3 h-3 text-[#ce0088] animate-spin" />
        Posisi GPS Aktif
      </div>

      <div className="relative z-10 flex justify-around w-full my-auto">
        <div className="flex flex-col items-center animate-pulse">
          <MapPin className="w-5 h-5 text-[#ce0088] fill-[#ce0088]/20" />
          <span className="text-[9px] bg-[#17274d] px-1.5 py-0.5 rounded text-[#ffeff7] font-medium mt-0.5">
            Pos Polisi (500m)
          </span>
        </div>
        <div className="flex flex-col items-center">
          <MapPin className="w-5 h-5 text-[#17274d] fill-[#17274d]/20" />
          <span className="text-[9px] bg-[#17274d] px-1.5 py-0.5 rounded text-[#ffeff7] font-medium mt-0.5">
            IGD Rumah Sakit (800m)
          </span>
        </div>
      </div>

      <div className="relative z-10 text-[10px] text-[#17274d] font-bold bg-[#ffeff7] px-2 py-0.5 rounded border border-[#17274d]/20">
        {coords ? `${coords.lat.toFixed(4)}° N, ${coords.lng.toFixed(4)}° E` : 'Mendeteksi koordinat...'}
      </div>
    </div>
  );
};