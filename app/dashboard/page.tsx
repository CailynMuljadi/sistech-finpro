'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { 
  Navigation, 
  FileText, 
  AlertTriangle, 
  MapPin, 
  Info, 
  Users, 
  PhoneCall, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  // Fallback to firstName -> username -> fallback string while loading or if missing
  const displayName = isLoaded && user 
    ? user.firstName || user.username || '[name]' 
    : '[name]';

  return (
    <div className="min-h-screen bg-[#ffeff7] text-[#17274d] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. MOBILE VIEW (Visible on screens smaller than md / 768px)*/}
        <div className="block md:hidden space-y-5">
          {/* Mobile Header Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-[#17274d]">
                Selamat Malam, {displayName}!
              </h1>
              <p className="text-xs text-[#17274d]/70 mt-0.5">
                Lokasi belum diaktifkan
              </p>
            </div>
            <button className="flex items-center gap-1.5 bg-[#ce0088] text-white text-xs font-bold px-3 py-2 rounded-full shadow-sm hover:opacity-90">
              <MapPin className="w-3.5 h-3.5" />
              Aktifkan GPS
            </button>
          </div>

          {/* Risk Banner */}
          <div className="bg-[#fffbeb] border border-[#fef3c7] p-3.5 rounded-2xl flex items-center justify-between text-xs text-[#92400e]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Kamu berada di area <strong className="font-bold">berisiko Sedang</strong></span>
            </div>
            <Info className="w-4 h-4 text-amber-600" />
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Safe Route */}
            <Link 
              href="/safe-route"
              className="bg-white border border-[#17274d]/10 p-5 rounded-2xl flex flex-col items-center text-center justify-center gap-3 shadow-sm active:scale-98 transition"
            >
              <div className="w-12 h-12 rounded-full bg-[#ce0088]/10 flex items-center justify-center text-[#ce0088]">
                <Navigation className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#17274d]">Cari Rute Aman</span>
            </Link>

            {/* Report Incident */}
            <Link 
              href="/reporting"
              className="bg-white border border-[#17274d]/10 p-5 rounded-2xl flex flex-col items-center text-center justify-center gap-3 shadow-sm active:scale-98 transition"
            >
              <div className="w-12 h-12 rounded-full bg-[#ce0088]/10 flex items-center justify-center text-[#ce0088]">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#17274d]">Lapor Insiden</span>
            </Link>
          </div>

          {/* Emergency SOS Trigger Card */}
          <div className="bg-white border border-[#17274d]/10 p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#17274d]">Emergency SOS</h3>
                <p className="text-[10px] text-[#17274d]/60">Kirim sinyal darurat 1-tap</p>
              </div>
            </div>
            <Link 
              href="/emergency-sos"
              className="bg-[#17274d] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#17274d]/90"
            >
              Mulai
            </Link>
          </div>
        </div>

        {/* ========================================================
            2. DESKTOP VIEW (Visible on screens md / 768px and larger)
            ======================================================== */}
        <div className="hidden md:block space-y-6">
          {/* Desktop Greeting with Clerk Dynamic Name */}
          <div>
            <h1 className="text-2xl font-black text-[#17274d] flex items-center gap-2">
              Halo, {displayName} 👋
            </h1>
            <p className="text-xs text-[#17274d]/70 mt-1">
              Selamat datang kembali. Semua fitur keamanan siap digunakan kapan pun Anda membutuhkannya.
            </p>
          </div>

          {/* Section: Dashboard Overview */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#17274d]/50 tracking-wider uppercase mb-3">
              <span>Dashboard Overview</span>
              <div className="h-[1px] bg-[#17274d]/15 flex-1"></div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Card 1: Safe Route */}
              <div className="bg-white border border-red-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xs text-[#17274d]">Safe Route</h3>
                    <div className="w-7 h-7 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center text-xs font-bold">
                      A
                    </div>
                  </div>
                  <p className="text-[11px] text-[#17274d]/70">Rute terakhir: Kampus UNESA → Rumah</p>
                  <p className="text-[11px] text-[#17274d]/70">Tingkat risiko: Rendah</p>
                  <p className="text-[10px] text-[#17274d]/40 italic mt-1">Belum ada laporan baru di sepanjang rute.</p>
                </div>
                <Link href="/safe-route" className="mt-4 bg-[#17274d] text-white text-xs font-bold py-2.5 rounded-xl text-center hover:opacity-90">
                  Cari Rute Aman
                </Link>
              </div>

              {/* Card 2: Anonymous Reporting */}
              <div className="bg-white border border-red-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xs text-[#17274d]">Anonymous Reporting</h3>
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#17274d]/70">Laporan terakhir: Pending Review</p>
                  <p className="text-[11px] text-[#17274d]/70">Dikirim: Hari ini, 13.20</p>
                  <p className="text-[10px] text-[#17274d]/40 italic mt-1">Status identitas: Tetap Anonim</p>
                </div>
                <Link href="/anonymous-reporting" className="mt-4 bg-[#17274d] text-white text-xs font-bold py-2.5 rounded-xl text-center hover:opacity-90">
                  Buat Laporan
                </Link>
              </div>

              {/* Card 3: Emergency SOS */}
              <div className="bg-white border border-red-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xs text-[#17274d]">Emergency SOS</h3>
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#17274d]/70">Status: Siap digunakan</p>
                  <p className="text-[11px] text-[#17274d]/70">PIN Darurat sudah dibuat</p>
                  <p className="text-[10px] text-[#17274d]/40 italic mt-1">Lokasi berhasil dideteksi</p>
                </div>
                <Link href="/emergency-sos" className="mt-4 bg-[#d05c5c] text-white text-xs font-bold py-2.5 rounded-xl text-center hover:opacity-90">
                  Buka Emergency SOS
                </Link>
              </div>

              {/* Card 4: Trusted Circle */}
              <div className="bg-white border border-red-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xs text-[#17274d]">Trusted Circle</h3>
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-[11px] text-[#17274d]/70">2 Trusted Contact aktif</p>
                  <p className="text-[11px] text-[#17274d]/70">Check-in terakhir berhasil</p>
                  <p className="text-[10px] text-[#17274d]/40 italic mt-1">Semua kontak siap menerima notifikasi</p>
                </div>
                <Link href="/trusted-circle" className="mt-4 bg-[#17274d] text-white text-xs font-bold py-2.5 rounded-xl text-center hover:opacity-90">
                  Kelola Kontak
                </Link>
              </div>
            </div>
          </div>

          {/* Main Desktop Grid Split: Left Content (2/3) vs Right Status (1/3) */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Content Column */}
            <div className="col-span-2 space-y-6">
              
              {/* Section: Aktivitas Terbaru */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#17274d]/50 tracking-wider uppercase mb-3">
                  <span>Aktivitas Terbaru</span>
                  <div className="h-[1px] bg-[#17274d]/15 flex-1"></div>
                </div>

                <div className="bg-white border border-[#17274d]/10 rounded-2xl p-4 space-y-3 shadow-sm text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-[#17274d]/5 last:border-0">
                    <div className="flex items-center gap-2 text-[#17274d]/80">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      <span>Laporan anonim berhasil dikirim dan sedang ditinjau.</span>
                    </div>
                    <span className="text-[11px] text-[#17274d]/50">Hari ini, 13.20</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-[#17274d]/5 last:border-0">
                    <div className="flex items-center gap-2 text-[#17274d]/80">
                      <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                      <span>Trusted Contact "Ayah" berhasil diperbarui.</span>
                    </div>
                    <span className="text-[11px] text-[#17274d]/50">Hari ini, 09.45</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-[#17274d]/5 last:border-0">
                    <div className="flex items-center gap-2 text-[#17274d]/80">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Lokasi berhasil diperbarui 15 menit yang lalu.</span>
                    </div>
                    <span className="text-[11px] text-[#17274d]/50">Hari ini, 08.00</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2 text-[#17274d]/80">
                      <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                      <span>Belum ada Emergency SOS yang diaktifkan minggu ini.</span>
                    </div>
                    <span className="text-[11px] text-[#17274d]/50">—</span>
                  </div>
                </div>
              </div>

              {/* Section: Riwayat Singkat Table */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#17274d]/50 tracking-wider uppercase mb-3">
                  <span>Riwayat Singkat</span>
                  <div className="h-[1px] bg-[#17274d]/15 flex-1"></div>
                </div>

                <div className="bg-white border border-[#17274d]/10 rounded-2xl overflow-hidden shadow-sm text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#ffeff7]/50 text-[10px] font-bold text-[#17274d]/60 uppercase border-b border-[#17274d]/10">
                      <tr>
                        <th className="p-3 pl-4">Waktu</th>
                        <th className="p-3">Aktivitas</th>
                        <th className="p-3 text-right pr-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#17274d]/5 text-[#17274d]/80">
                      <tr>
                        <td className="p-3 pl-4 text-[11px] text-[#17274d]/60">Hari ini</td>
                        <td className="p-3 font-medium">Anonymous Report</td>
                        <td className="p-3 text-right pr-4">
                          <span className="bg-amber-100/80 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300/50">
                            Pending Review
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 pl-4 text-[11px] text-[#17274d]/60">Kemarin</td>
                        <td className="p-3 font-medium">Check-in Perjalanan</td>
                        <td className="p-3 text-right pr-4">
                          <span className="bg-emerald-100/80 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-300/50">
                            Berhasil
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 pl-4 text-[11px] text-[#17274d]/60">2 hari lalu</td>
                        <td className="p-3 font-medium">Safe Route digunakan</td>
                        <td className="p-3 text-right pr-4">
                          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-300/50">
                            Selesai
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column: Status Keamanan Card */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#17274d]/50 tracking-wider uppercase mb-3">
                <span>Status Keamanan</span>
                <div className="h-[1px] bg-[#17274d]/15 flex-1"></div>
              </div>

              <div className="bg-white border border-[#17274d]/10 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="font-bold text-xs text-[#17274d] border-b border-[#17274d]/10 pb-3">
                  Status Keamanan Hari Ini
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#17274d]/40 uppercase tracking-wide block mb-1">
                      Lokasi
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Berhasil dideteksi</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#17274d]/40 uppercase tracking-wide block mb-1">
                      Trusted Contact
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>2 kontak aktif</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#17274d]/40 uppercase tracking-wide block mb-1">
                      Emergency SOS
                    </span>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Siap digunakan</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#17274d]/40 uppercase tracking-wide block mb-1">
                      Check-in Timer
                    </span>
                    <div className="flex items-center gap-1.5 text-[#17274d]/60 font-normal">
                      <Clock className="w-4 h-4 text-[#17274d]/40" />
                      <span>Tidak ada perjalanan aktif.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}