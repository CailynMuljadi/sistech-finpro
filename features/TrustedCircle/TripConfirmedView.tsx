'use client';

import { CheckCircle2 } from 'lucide-react';
import { Trip, formatWIB } from '@/hooks/useTripTimer';

interface Props {
  trip: Trip;
  trustedContactCount: number;
  onBackHome: () => void;
  onNewTrip: () => void;
}

export default function TripConfirmedView({ trip, trustedContactCount, onBackHome, onNewTrip }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="rounded-2xl border border-pink-100 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="mt-4 text-2xl font-bold text-slate-800">Perjalanan Berhasil Diselesaikan</h1>
        <span className="mt-3 inline-block rounded-full border border-green-200 bg-green-50 px-4 py-1 text-xs font-medium text-green-600">
          Confirmed
        </span>

        <p className="mt-6 text-sm font-semibold text-slate-700">
          Terima kasih telah mengonfirmasi bahwa Anda telah tiba dengan aman
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Check-in timer telah dihentikan dan perjalanan telah selesai
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-5">
          <Stat label="Durasi Perjalanan" value={`${trip.duration} Menit`} />
          <Stat label="Tujuan" value={trip.destination} />
          <Stat label="Waktu Konfirmasi" value={trip.confirmedAt ? formatWIB(trip.confirmedAt) : '-'} />
          <Stat label="Trusted Contact" value={`${trustedContactCount} Kontak Terdaftar`} />
          <Stat label="Status Notifikasi" value="Email telah dikirim ke Trusted Contact" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={onBackHome}
            className="rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Kembali ke Beranda
          </button>
          <button
            onClick={onNewTrip}
            className="rounded-xl border border-primary py-3 text-sm font-semibold text-primary hover:bg-pink-50"
          >
            Mulai Perjalanan Baru
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase text-slate-500">Apa yang Terjadi Selanjutnya?</h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="flex gap-3">
            <span className="font-bold text-primary">01</span>
            Check-in timer telah dihentikan.
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">02</span>
            Trusted Contact tidak menerima email notifikasi karena Anda telah mengonfirmasi
            perjalanan tepat waktu.
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-primary">03</span>
            Terima kasih telah menggunakan Trusted Circle, semoga perjalanan Anda selalu aman.
          </li>
        </ol>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-orange-50 px-4 py-3">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}