'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

export const SafePointsList: React.FC = () => {
  const points = [
    { id: 1, name: "Kantor Polisi Pusat", type: "Polisi", distance: "500 m", address: "Jl. Utama No. 45" },
    { id: 2, name: "IGD Rumah Sakit Medika", type: "Medis", distance: "800 m", address: "Jl. Taman No. 12" },
  ];

  return (
    <div className="w-full space-y-2 font-mono">
      <span className="text-[10px] font-bold text-[#17274d]/60 uppercase tracking-wider block">
        Titik Aman Terdekat
      </span>
      {points.map((p) => (
        <div key={p.id} className="p-3 bg-white/80 border border-[#17274d]/15 rounded-xl flex justify-between items-center shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-[#17274d]">{p.name}</span>
              <span className="text-[9px] bg-[#ce0088]/10 text-[#ce0088] border border-[#ce0088]/20 px-1.5 py-0.5 rounded font-bold">
                {p.type}
              </span>
            </div>
            <div className="text-[10px] text-[#17274d]/70 mt-0.5">{p.address}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-[#17274d]">{p.distance}</div>
            <button className="text-[10px] flex items-center gap-0.5 text-[#ce0088] font-bold hover:underline mt-1">
              Navigasi <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};