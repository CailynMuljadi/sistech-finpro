"use client";

import { useState } from "react";

const durations = [15, 30, 45, 60];

export default function TravelSetting() {
  const [selected, setSelected] = useState(30);
  const [destination, setDestination] = useState("");

  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-primary uppercase">
        Atur Perjalanan
      </h2>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-700">
          Estimasi Durasi Perjalanan
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {durations.map((item) => (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`rounded-lg border px-5 py-2 text-sm transition
                ${
                  selected === item
                    ? "bg-primary text-white border-primary"
                    : "border-slate-300 hover:border-primary"
                }`}
            >
              {item} Menit
            </button>
          ))}

          <button className="rounded-lg border border-slate-300 px-5 py-2 text-sm hover:border-primary">
            Custom
          </button>
        </div>
      </div>

      <div className="mt-8">
        <label className="text-sm font-medium text-slate-700">
          Tujuan Perjalanan
        </label>

        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Contoh: Tunjungan Plaza"
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-primary"
        />
      </div>

      <button className="mt-8 w-full rounded-xl bg-primary py-3 font-semibold text-white hover:opacity-90">
        MULAI PERJALANAN
      </button>

      <p className="mt-4 text-center text-xs text-slate-400">
        Anda hanya dapat memiliki satu perjalanan aktif.
      </p>
    </div>
  );
}