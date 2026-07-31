'use client';

import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Check } from 'lucide-react';
import { LocationStatusCard } from '@/features/Emergency/LocationStatusCard';
import { TrustedContactsCard } from '@/features/Emergency/TrustedContactCard';
import { SosButton } from '@/features/Emergency/SosButton';

export default function EmergencyPage() {
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState('1234');

  return (
    <div className="min-h-screen bg-[#ffeff7] text-[#17274d] font-mono p-4 md:p-8">
      {/* Navigation Header */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 border-b border-[#17274d]/10 mb-6 text-xs md:text-sm">
        <div className="flex items-center gap-6 font-bold">
          <span className="text-[#ce0088] text-base md:text-lg tracking-wider">
            SafeStep
          </span>
          <span className="hidden md:inline cursor-pointer hover:opacity-75">
            Safe Route
          </span>
          <span className="hidden md:inline cursor-pointer hover:opacity-75">
            Anonymous Reporting
          </span>
          <span className="border-b-2 border-[#ce0088] pb-1">Emergency SOS</span>
          <span className="hidden md:inline cursor-pointer hover:opacity-75">
            Trusted Circle
          </span>
        </div>
        <button className="px-4 py-1.5 bg-[#17274d] text-white rounded-lg font-semibold hover:bg-[#17274d]/90">
          Masuk
        </button>
      </nav>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between text-[11px] bg-white/60 border border-[#17274d]/10 p-3 rounded-xl gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>
              Lokasi terdeteksi • Trusted Circle aktif • Tidak ada peringatan darurat
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-[#ce0088]">
            <span>LOKASI <Check className="w-3 h-3 inline" /></span>
            <span>KONTAK <Check className="w-3 h-3 inline" /></span>
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

        {/* 4 Cards Layout (Wireframe image_67cdf0.png Top Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Cara Menggunakan */}
          <div className="bg-[#ffeff7] border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase mb-3">
                Cara Menggunakan SOS
              </h3>
              <ol className="text-xs space-y-2 text-[#17274d]/85 list-decimal pl-4">
                <li>Tekan & tahan tombol SOS selama 2 detik.</li>
                <li>
                  Sistem memberi waktu 30 detik untuk membatalkan menggunakan PIN.
                </li>
                <li>
                  Jika tidak dibatalkan, lokasi akan dikirim ke Trusted Contact dan alarm aktif.
                </li>
              </ol>
            </div>
          </div>

          {/* Card 2: Trusted Contact */}
          <TrustedContactsCard />

          {/* Card 3: Status Lokasi (Real-time GPS) */}
          <LocationStatusCard />

          {/* Card 4: PIN Darurat */}
          <div className="bg-[#ffeff7] border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[#ce0088]" />
                <h3 className="font-bold text-sm tracking-wide uppercase">
                  PIN Darurat
                </h3>
              </div>
              <p className="text-xs font-semibold mb-1">
                PIN pembatalan telah dibuat
              </p>
              <p className="text-[11px] opacity-75 mb-3">
                Gunakan PIN ini untuk membatalkan Emergency SOS selama countdown berlangsung.
              </p>

              <div className="relative mb-3">
                <input
                  type={showPin ? 'text' : 'password'}
                  readOnly
                  value={pin}
                  className="w-full bg-white border border-[#17274d]/20 px-3 py-2 rounded-xl text-center font-bold tracking-widest text-sm focus:outline-none"
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

            <button className="w-full py-2.5 bg-white hover:bg-slate-50 border border-[#17274d]/20 text-[#17274d] font-bold text-xs rounded-xl tracking-wider uppercase transition">
              UBAH PIN
            </button>
          </div>
        </div>

        {/* Lower Row: History & SOS Trigger Area (Wireframe image_67cdf0.png Bottom Row) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* SOS History */}
          <div className="lg:col-span-2 bg-[#ffeff7] border border-[#17274d]/15 p-6 rounded-2xl">
            <h3 className="font-bold text-sm uppercase mb-4">
              Riwayat Emergency SOS
            </h3>
            <p className="text-xs opacity-75 italic">
              Belum pernah mengaktifkan Emergency SOS.
            </p>
          </div>

          {/* SOS Button Area */}
          <div className="bg-[#ffeff7] border border-[#17274d]/15 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <SosButton />
            <p className="text-[11px] opacity-70 mt-4">
              Tekan dan tahan selama 2 detik untuk mengaktifkan Emergency SOS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};