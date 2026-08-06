'use client';

import { useState } from 'react';

const durations = [15, 30, 45, 60];

interface Props {
  hasContacts: boolean;
  onStart: (duration: number, destination: string) => void;
}

export default function TravelSetting({ hasContacts, onStart }: Props) {
  const [selected, setSelected] = useState(30);
  const [isCustom, setIsCustom] = useState(false);
  const [customDuration, setCustomDuration] = useState('');
  const [destination, setDestination] = useState('');

  const canStart = hasContacts && destination.trim().length > 0;

  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold uppercase text-primary">Atur Perjalanan</h2>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-700">Estimasi Durasi Perjalanan</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {durations.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelected(item);
                setIsCustom(false);
              }}
              className={`rounded-lg border px-5 py-2 text-sm transition ${
                selected === item ? 'border-primary bg-primary text-white' : 'border-slate-300 hover:border-primary'
              }`}
            >
              {item} Menit
            </button>
          ))}
          <button
            onClick={() => setIsCustom(true)}
            className={`rounded-lg border px-5 py-2 text-sm transition ${
              isCustom
                ? 'border-primary bg-primary text-white'
                : 'border-slate-300 hover:border-primary'
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {isCustom && (
        <div className="mt-4">
          <input
            type="number"
            min={1}
            placeholder="Masukkan durasi (menit)"
            value={customDuration}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (e.target.value === '') {
                setCustomDuration('');
                return;
              }

              if (value >= 1) {
                setCustomDuration(e.target.value);
                setSelected(value);
              }
            }}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary"
          />
        </div>
      )}

      <div className="mt-8">
        <label className="text-sm font-medium text-slate-700">Tujuan Perjalanan</label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Contoh: Tunjungan Plaza"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary"
        />
      </div>

      <button
        onClick={() => canStart && onStart(selected, destination.trim())}
        disabled={!canStart}
        className="mt-8 w-full rounded-xl bg-primary py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        MULAI PERJALANAN
      </button>

      {!hasContacts ? (
        <p className="mt-4 text-center text-xs text-red-400">
          Tambahkan minimal 1 trusted contact sebelum memulai perjalanan.
        </p>
      ) : (
        <p className="mt-4 text-center text-xs text-slate-400">
          Anda hanya dapat memiliki satu perjalanan aktif.
        </p>
      )}
    </div>
  );
}