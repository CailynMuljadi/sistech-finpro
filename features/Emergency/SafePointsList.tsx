'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

export const SafePointsList: React.FC = () => {
  const points = [
    { id: 1, name: "Central Police Station", type: "Police", distance: "0.4 mi", address: "450 Main St" },
    { id: 2, name: "St. Jude Hospital ER", type: "Medical", distance: "0.8 mi", address: "120 Park Ave" },
  ];

  return (
    <div className="w-full space-y-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Nearby Refuge Points</span>
      {points.map((p) => (
        <div key={p.id} className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-200">{p.name}</span>
              <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-medium">{p.type}</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{p.address}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-slate-300">{p.distance}</div>
            <button className="text-[10px] flex items-center gap-0.5 text-blue-400 hover:underline mt-1">
              Nav <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};