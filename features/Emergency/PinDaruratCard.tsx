'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Eye, EyeOff, Edit2 } from 'lucide-react';

export const PinDaruratCard: React.FC = () => {
  const [pin, setPin] = useState('1234');
  const [showPin, setShowPin] = useState(false);

  // Sync PIN from localStorage if present
  useEffect(() => {
    const savedPin = localStorage.getItem('sos_security_pin');
    if (savedPin) setPin(savedPin);
  }, []);

  return (
    <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between font-sans text-[#17274d] shadow-sm">
      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#ce0088]" />
            <h3 className="font-bold text-sm tracking-wide uppercase text-[#17274d]">
              PIN DARURAT
            </h3>
          </div>
          <Link
            href="/ubah-pin"
            className="text-[11px] font-bold text-[#ce0088] hover:underline flex items-center gap-0.5"
          >
            Halaman Penuh →
          </Link>
        </div>

        {/* Subtitles */}
        <p className="text-xs font-bold text-[#17274d] mb-1">
          PIN pembatalan telah dibuat
        </p>
        <p className="text-[11px] text-[#17274d]/75 mb-4 leading-relaxed">
          Gunakan PIN ini untuk membatalkan Emergency SOS selama countdown berlangsung.
        </p>

        {/* Masked PIN Display Box */}
        <div className="relative mb-4">
          <input
            type={showPin ? 'text' : 'password'}
            readOnly
            value={pin}
            className="w-full bg-[#ffeff7]/30 border border-[#17274d]/20 px-3 py-2.5 rounded-xl text-center font-bold tracking-widest text-sm text-[#17274d] font-mono focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-3 text-[#17274d]/60 hover:text-[#17274d] transition"
          >
            {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Action Button routing to /ubah-pin */}
      <Link
        href="/ubah-pin"
        className="w-full py-2.5 bg-white hover:bg-[#ffeff7]/60 border border-[#17274d]/20 text-[#17274d] font-bold text-xs rounded-xl tracking-wider uppercase transition shadow-sm active:scale-98 flex items-center justify-center gap-2 text-center"
      >
        <Edit2 className="w-3.5 h-3.5 text-[#ce0088]" />
        UBAH PIN
      </Link>
    </div>
  );
};