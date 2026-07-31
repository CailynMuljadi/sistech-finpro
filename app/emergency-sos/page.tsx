'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Check } from 'lucide-react';
import { LocationStatusCard } from '@/features/Emergency/LocationStatusCard';
import { TrustedContactsCard } from '@/features/Emergency/TrustedContactCard';
import { SosButton } from '@/features/Emergency/SosButton';
import { SosActiveView } from '@/features/Emergency/SosActiveView';

export default function EmergencyPage() {
  const [isSosActive, setIsSosActive] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [pin] = useState('1234');

  return (
    <div className="min-h-screen bg-[#ffeff7] text-[#17274d] font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Render Active View when triggered */}
        {isSosActive ? (
          <SosActiveView onStandDown={() => setIsSosActive(false)} />
        ) : (
          <>
            {/* Status Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between text-xs bg-white border border-[#17274d]/15 p-3 rounded-xl gap-2 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>
                  Lokasi terdeteksi • Trusted Circle aktif • Tidak ada peringatan darurat
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-bold text-[#ce0088]">
                <span>LOKASI <Check className="w-3.5 h-3.5 inline" /></span>
                <span>KONTAK <Check className="w-3.5 h-3.5 inline" /></span>
                <span>STATUS AMAN</span>
              </div>
            </div>

            {/* Title Section */}
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#17274d]">
                Emergency SOS
              </h1>
              <p className="text-xs md:text-sm text-[#17274d]/75 mt-1">
                Aktifkan bantuan darurat dengan cepat ketika berada dalam situasi yang mengancam.
              </p>
            </div>

            {/* Top 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="font-bold text-sm tracking-wide uppercase mb-3 text-[#17274d]">
                    Cara Menggunakan SOS
                  </h3>
                  <ol className="text-xs space-y-2 text-[#17274d]/85 list-decimal pl-4">
                    <li>Tekan & tahan tombol SOS selama 2 detik.</li>
                    <li>Sistem memberi waktu 3 detik untuk membatalkan menggunakan PIN.</li>
                    <li>Jika tidak dibatalkan, lokasi akan dikirim ke Trusted Contact dan alarm aktif.</li>
                  </ol>
                </div>
              </div>

              <TrustedContactsCard />
              <LocationStatusCard />

              <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-[#ce0088]" />
                    <h3 className="font-bold text-sm tracking-wide uppercase text-[#17274d]">
                      PIN Darurat
                    </h3>
                  </div>
                  <p className="text-xs font-semibold mb-1 text-[#17274d]">
                    PIN pembatalan telah dibuat
                  </p>
                  <p className="text-[11px] text-[#17274d]/75 mb-3">
                    Gunakan PIN ini untuk membatalkan Emergency SOS selama countdown berlangsung.
                  </p>

                  <div className="relative mb-3">
                    <input
                      type={showPin ? 'text' : 'password'}
                      readOnly
                      value={pin}
                      className="w-full bg-[#ffeff7]/50 border border-[#17274d]/20 px-3 py-2 rounded-xl text-center font-bold tracking-widest text-sm text-[#17274d] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-2.5 text-[#17274d]/60 hover:text-[#17274d]"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-white hover:bg-[#ffeff7]/60 border border-[#17274d]/20 text-[#17274d] font-bold text-xs rounded-xl tracking-wider uppercase transition shadow-sm active:scale-98">
                  UBAH PIN
                </button>
              </div>
            </div>

            {/* Lower Row: History & SOS Trigger Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              <div className="lg:col-span-2 bg-white border border-[#17274d]/15 p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-sm uppercase mb-4 text-[#17274d]">
                  Riwayat Emergency SOS
                </h3>
                <p className="text-xs text-[#17274d]/60 italic">
                  Belum pernah mengaktifkan Emergency SOS.
                </p>
              </div>

              <div className="bg-white border border-[#17274d]/15 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                {/* Trigger callback activates the full success view */}
                <SosButton onTrigger={() => setIsSosActive(true)} />
                <p className="text-[11px] text-[#17274d]/70 mt-4">
                  Tekan dan tahan selama 2 detik untuk mengaktifkan Emergency SOS.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}