'use client';

import React, { useState } from 'react';
import { Phone, MapPin, ShieldAlert, Lock } from 'lucide-react';

interface SosActiveViewProps {
  onStandDown: () => void;
  correctPin?: string;
}

export const SosActiveView: React.FC<SosActiveViewProps> = ({
  onStandDown,
  correctPin = '1234',
}) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [pinError, setPinError] = useState(false);

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setPinError(false);

    // Auto focus next input
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`active-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`active-pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verifyPinAndStandDown = () => {
    const enteredPin = pin.join('');
    if (enteredPin === correctPin) {
      onStandDown();
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#17274d]">
      {/* 1. Header Active Banner */}
      <div className="bg-white border-2 border-[#17274d] p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#ce0088] animate-ping" />
            <h2 className="text-xl font-bold tracking-tight">Emergency SOS Aktif</h2>
          </div>
          <p className="text-xs text-[#17274d]/70 mt-1">
            Lokasi Anda telah dibagikan kepada Trusted Contact dan bantuan darurat sedang diproses.
          </p>
        </div>
        <div className="border border-[#17274d] px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-center bg-[#ffeff7]/50 self-start md:self-auto">
          O STATUS: AKTIF
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (3 Spans): Status Row + Map + Quick Call */}
        <div className="lg:col-span-3 space-y-6">
          {/* 4 Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1 */}
            <div className="bg-white border border-[#17274d]/20 p-4 rounded-xl shadow-sm text-xs">
              <span className="text-[10px] uppercase font-bold text-[#17274d]/60 block mb-2">
                Status Emergency
              </span>
              <ul className="space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5 text-[#ce0088] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ce0088]" />
                  Emergency SOS aktif
                </li>
                <li>Alarm darurat sedang berjalan</li>
                <li className="opacity-60">Menunggu bantuan</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#17274d]/20 p-4 rounded-xl shadow-sm text-xs">
              <span className="text-[10px] uppercase font-bold text-[#17274d]/60 block mb-2">
                Trusted Contact
              </span>
              <ul className="space-y-1.5 font-medium">
                <li>3 kontak telah menerima notifikasi</li>
                <li className="text-emerald-600 font-bold">Status pengiriman: Berhasil</li>
                <li className="opacity-60">Waktu terkirim: Baru saja</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#17274d]/20 p-4 rounded-xl shadow-sm text-xs">
              <span className="text-[10px] uppercase font-bold text-[#17274d]/60 block mb-2">
                Lokasi Saat Ini
              </span>
              <ul className="space-y-1.5 font-medium">
                <li>Lokasi berhasil dibagikan</li>
                <li>Akurasi lokasi: Tinggi</li>
                <li className="opacity-60">Update terakhir: Baru saja</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#17274d]/20 p-4 rounded-xl shadow-sm text-xs">
              <span className="text-[10px] uppercase font-bold text-[#17274d]/60 block mb-2">
                Safe Point Terdekat
              </span>
              <ul className="space-y-1.5 font-medium">
                <li className="font-bold">Pos Polisi Wonokromo</li>
                <li className="text-[#ce0088]">±200 meter</li>
                <li className="opacity-60">Perkiraan waktu: 3 menit</li>
              </ul>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white border border-[#17274d]/20 rounded-xl p-4 shadow-sm relative">
            <div className="flex justify-between items-center text-xs mb-3 font-bold uppercase text-[#17274d]">
              <span>PETA LOKASI</span>
              <span className="text-[10px] font-mono text-[#17274d]/40 font-normal">
                Placeholder statis - tidak interaktif
              </span>
            </div>

            {/* Simulated Grid Map */}
            <div className="w-full h-64 bg-[#f8f9fa] rounded-lg border border-[#17274d]/10 relative overflow-hidden flex items-center justify-center">
              {/* Map Grid Lines Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'linear-gradient(#17274d 1px, transparent 1px), linear-gradient(90deg, #17274d 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />

              {/* Dotted Route Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="35%"
                  y1="55%"
                  x2="52%"
                  y2="48%"
                  stroke="#ce0088"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>

              {/* Current User Marker */}
              <div className="absolute left-[35%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#ce0088] bg-[#ce0088]/20 flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 rounded-full bg-[#ce0088]" />
                </div>
              </div>

              {/* Safe Point Marker Box */}
              <div className="absolute left-[52%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-white border border-[#17274d] px-3 py-1 rounded shadow text-[11px] font-bold text-[#17274d] mb-1 whitespace-nowrap">
                  Safe Point : 200 m
                </div>
                <MapPin className="w-5 h-5 text-[#17274d] fill-[#17274d]/20" />
              </div>

              {/* Zoom Controls Overlay */}
              <div className="absolute right-3 top-3 bg-white border border-[#17274d]/20 rounded flex flex-col text-xs font-mono font-bold shadow-sm">
                <button className="px-2 py-1 border-b border-[#17274d]/20 hover:bg-[#ffeff7]">
                  +
                </button>
                <button className="px-2 py-1 hover:bg-[#ffeff7]">-</button>
              </div>
            </div>
          </div>

          {/* Quick Call Section */}
          <div className="bg-white border border-[#17274d]/20 rounded-xl p-4 shadow-sm space-y-3">
            <span className="text-xs uppercase font-bold text-[#17274d] block">
              QUICK CALL
            </span>

            {/* Primary Dark Call Button */}
            <a
              href="tel:112"
              className="w-full py-3.5 bg-[#17274d] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-[#17274d]/90 transition shadow"
            >
              <Phone className="w-4 h-4 text-[#ce0088]" /> HUBUNGI NOMOR DARURAT
            </a>

            {/* Call Shortcuts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="tel:110"
                className="p-3 bg-[#f8f9fa] border border-[#17274d]/15 rounded-xl flex justify-between items-center hover:bg-white transition"
              >
                <span className="font-extrabold text-base text-[#17274d]">110</span>
                <span className="text-xs text-[#17274d]/60 font-medium">Polisi</span>
              </a>

              <a
                href="tel:119"
                className="p-3 bg-[#f8f9fa] border border-[#17274d]/15 rounded-xl flex justify-between items-center hover:bg-white transition"
              >
                <span className="font-extrabold text-base text-[#17274d]">119</span>
                <span className="text-xs text-[#17274d]/60 font-medium">Ambulans</span>
              </a>

              <a
                href="tel:112"
                className="p-3 bg-[#f8f9fa] border border-[#17274d]/15 rounded-xl flex justify-between items-center hover:bg-white transition"
              >
                <span className="font-extrabold text-base text-[#17274d]">112</span>
                <span className="text-xs text-[#17274d]/60 font-medium">
                  Layanan Darurat Nasional
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (1 Span): Alarm & Stand Down PIN */}
        <div className="space-y-6">
          {/* Alarm Status Box */}
          <div className="bg-white border border-[#17274d]/20 p-5 rounded-xl shadow-sm text-xs space-y-4">
            <span className="uppercase font-bold text-[#17274d] block border-b border-[#17274d]/10 pb-2">
              ALARM DARURAT
            </span>

            {/* Pulsing Concentric Circles */}
            <div className="py-4 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#ce0088]/30 flex items-center justify-center animate-ping">
                <div className="w-12 h-12 rounded-full border-2 border-[#ce0088]/60 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#ce0088]" />
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-[#17274d]/10 pt-3 text-[11px]">
              <div className="flex justify-between">
                <span className="opacity-60">STATUS</span>
                <span className="font-bold text-[#ce0088]">Aktif</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">SUARA ALARM</span>
                <span className="font-bold">Sedang diputar</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">LOKASI</span>
                <span className="font-bold">Sedang dibagikan</span>
              </div>
            </div>
          </div>

          {/* Hentikan Emergency SOS Box */}
          <div className="bg-white border-2 border-dashed border-[#17274d]/30 p-5 rounded-xl shadow-sm space-y-4">
            <span className="uppercase font-bold text-xs text-[#17274d] block border-b border-[#17274d]/10 pb-2">
              HENTIKAN EMERGENCY SOS
            </span>

            <div>
              <label className="text-[10px] font-bold uppercase text-[#17274d]/70 block mb-2">
                MASUKKAN PIN
              </label>
              <div className="grid grid-cols-4 gap-2">
                {pin.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`active-pin-${idx}`}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-full h-12 text-center text-lg font-bold border border-[#17274d]/30 rounded-lg focus:outline-none focus:border-[#ce0088] bg-[#f8f9fa]"
                  />
                ))}
              </div>
              {pinError && (
                <p className="text-[10px] text-red-600 font-bold mt-1.5 text-center">
                  PIN Salah. Default: 1234
                </p>
              )}
            </div>

            <button
              onClick={verifyPinAndStandDown}
              className="w-full py-3 bg-[#17274d] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#17274d]/90 transition"
            >
              HENTIKAN ALARM
            </button>

            <p className="text-[10px] text-[#17274d]/50 text-center leading-tight">
              Masukkan PIN untuk menghentikan Emergency SOS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};