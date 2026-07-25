'use client';

import React from 'react';
import { Phone } from 'lucide-react';

export const EmergencyShortcuts: React.FC = () => {
  const services = [
    { label: "Emergency Services", number: "12345", desc: "Police, Ambulance, Fire" },
    { label: "Poison Helpline", number: "1-800-222-1222", desc: "24/7 Medical Advice" },
  ];

  return (
    <div className="w-full space-y-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Direct Emergency Dial</span>
      {services.map((item, idx) => (
        <a
          key={idx}
          href={`tel:${item.number}`}
          className="flex justify-between items-center p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition"
        >
          <div>
            <div className="text-sm font-semibold text-slate-200">{item.label}</div>
            <div className="text-xs text-slate-400">{item.desc}</div>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            <Phone className="w-3 h-3" />
            {item.number}
          </div>
        </a>
      ))}
    </div>
  );
};