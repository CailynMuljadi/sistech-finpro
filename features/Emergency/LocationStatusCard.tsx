'use client';

import React, { useState, useEffect } from 'react';
import { Navigation, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const LocationStatusCard: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolokasi tidak didukung oleh peramban ini.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setErrorMsg('Gagal mengambil lokasi GPS. Pastikan izin lokasi aktif.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <div className="bg-[#ffeff7] border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between font-mono text-[#17274d]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm tracking-wide uppercase text-[#17274d]">
            Status Lokasi
          </h3>
          <span className="flex items-center gap-1 text-[10px] bg-[#ce0088]/10 text-[#ce0088] font-bold px-2 py-0.5 rounded-full">
            <Navigation className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Mendeteksi...' : 'GPS Aktif'}
          </span>
        </div>

        <p className="text-xs font-semibold mb-2">
          {coords ? 'Lokasi berhasil dideteksi.' : 'Menghubungkan ke GPS...'}
        </p>

        <ul className="text-xs space-y-1.5 opacity-80 mb-4">
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ce0088] shrink-0" />
            3 kontak terpercaya telah terhubung.
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ce0088] shrink-0" />
            Notifikasi darurat dikirim via email & SMS.
          </li>
          <li className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ce0088] shrink-0" />
            Status: {loading ? 'Memperbarui...' : 'Aktif'}
          </li>
        </ul>

        {coords && (
          <div className="bg-white/80 p-2 rounded-xl text-[11px] font-mono border border-[#17274d]/10 mb-3 text-center">
            {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
          </div>
        )}

        {errorMsg && (
          <p className="text-[11px] text-red-600 mb-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errorMsg}
          </p>
        )}
      </div>

      <button
        onClick={fetchLocation}
        disabled={loading}
        className="w-full py-2.5 bg-white hover:bg-slate-50 border border-[#17274d]/20 text-[#17274d] font-bold text-xs rounded-xl tracking-wider uppercase transition flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        PERBARUI LOKASI
      </button>
    </div>
  );
};