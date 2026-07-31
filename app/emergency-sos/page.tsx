'use client';

import React, { useState, useEffect } from 'react';
import { Check, Clock } from 'lucide-react';

// Feature Component Imports
import { LocationStatusCard } from '@/features/Emergency/LocationStatusCard';
import { TrustedContactsCard } from '@/features/Emergency/TrustedContactCard';
import { PinDaruratCard } from '@/features/Emergency/PinDaruratCard';
import { SosButton } from '@/features/Emergency/SosButton';
import { SosActiveView } from '@/features/Emergency/SosActiveView';

export interface SosHistoryItem {
  id: string;
  timestamp: string;
  status: 'Aktif' | 'Dibatalkan' | 'Selesai';
}

export default function EmergencyPage() {
  const [isSosActive, setIsSosActive] = useState(false);
  const [pin, setPin] = useState('1234');
  const [history, setHistory] = useState<SosHistoryItem[]>([]);

  // Sync PIN & History from LocalStorage on mount
  useEffect(() => {
    const savedPin = localStorage.getItem('sos_security_pin');
    if (savedPin) setPin(savedPin);

    const savedHistory = localStorage.getItem('sos_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Gagal membaca riwayat SOS:', e);
      }
    }
  }, []);

  const saveHistory = (newHistory: SosHistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('sos_history', JSON.stringify(newHistory));
  };

  // Triggered when SOS button is held & countdown finishes
  const handleSosTrigger = () => {
    setIsSosActive(true);

    const newLog: SosHistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'Aktif',
    };

    saveHistory([newLog, ...history]);
  };

  // Triggered when PIN stand-down is submitted in SosActiveView
  const handleStandDown = () => {
    setIsSosActive(false);

    if (history.length > 0) {
      const updatedHistory = history.map((item, index) =>
        index === 0 ? { ...item, status: 'Selesai' as const } : item
      );
      saveHistory(updatedHistory);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffeff7] text-[#17274d] font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Render Active View when triggered */}
        {isSosActive ? (
          <SosActiveView onStandDown={handleStandDown} correctPin={pin} />
        ) : (
          <>
            {/* Top Status Indicator Bar */}
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

            {/* Page Header */}
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
              {/* Card 1: Cara Menggunakan SOS */}
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

              {/* Card 2: Trusted Contacts */}
              <TrustedContactsCard />

              {/* Card 3: Location Status (Real-time GPS) */}
              <LocationStatusCard />

              {/* Card 4: Ubah PIN Card */}
              <PinDaruratCard />
            </div>

            {/* Lower Row: Working History & SOS Trigger Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              {/* History Section */}
              <div className="lg:col-span-2 bg-white border border-[#17274d]/15 p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm uppercase text-[#17274d] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#ce0088]" />
                    Riwayat Emergency SOS
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={() => saveHistory([])}
                      className="text-[11px] text-[#ce0088] font-bold hover:underline"
                    >
                      Hapus Riwayat
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <p className="text-xs text-[#17274d]/60 italic">
                    Belum pernah mengaktifkan Emergency SOS.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-[#ffeff7]/40 border border-[#17274d]/10 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-[#17274d]">
                            Pemicu SOS Darurat
                          </div>
                          <div className="text-[11px] text-[#17274d]/70 font-mono">
                            {item.timestamp}
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            item.status === 'Aktif'
                              ? 'bg-red-500/10 text-red-600 border border-red-500/20 animate-pulse'
                              : 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Main SOS Trigger Button Card */}
              <div className="bg-white border border-[#17274d]/15 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
                <SosButton onTrigger={handleSosTrigger} correctPin={pin} />
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