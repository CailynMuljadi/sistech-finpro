'use client';

import React from 'react';
import { Phone } from 'lucide-react';

export const EmergencyShortcuts: React.FC = () => {
  const services = [
    { label: "Layanan Darurat Utama", number: "112", desc: "Polisi, Ambulans, Pemadam" },
    { label: "Bantuan Medis / Panggilan Ambulans", number: "119", desc: "Layanan Darurat Kesehatan 24/7" },
  ];

  return (
    <div className="w-full space-y-2 font-mono">
      <span className="text-[10px] font-bold text-[#17274d]/60 uppercase tracking-wider block">
        Panggilan Darurat Langsung
      </span>
      {services.map((item, idx) => (
        <a
          key={idx}
          href={`tel:${item.number}`}
          className="flex justify-between items-center p-3 bg-white/80 hover:bg-white border border-[#17274d]/15 rounded-xl transition shadow-sm"
        >
          <div>
            <div className="text-xs font-bold text-[#17274d]">{item.label}</div>
            <div className="text-[10px] text-[#17274d]/70">{item.desc}</div>
          </div>
          <div className="flex items-center gap-1.5 text-[#ce0088] text-xs font-bold bg-[#ce0088]/10 px-2.5 py-1 rounded-lg border border-[#ce0088]/20">
            <Phone className="w-3 h-3" />
            {item.number}
          </div>
        </a>
      ))}
    </div>
  );
};