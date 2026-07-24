'use client';

import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

export const StaticMiniMap: React.FC = () => {
  return (
    <div className="w-full h-36 bg-slate-800/80 rounded-2xl border border-slate-700/60 relative overflow-hidden flex flex-col items-center justify-between p-3">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:14px_14px]"></div>

      <div className="relative z-10 flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700 text-[10px] text-slate-300 shadow-sm">
        <Navigation className="w-3 h-3 text-sky-400 animate-spin" />
        GPS Position Active
      </div>

      <div className="relative z-10 flex justify-around w-full my-auto">
        <div className="flex flex-col items-center animate-pulse">
          <MapPin className="w-5 h-5 text-red-500 fill-red-500/20" />
          <span className="text-[9px] bg-slate-900/90 px-1.5 py-0.5 rounded text-red-300 font-medium mt-0.5">Police (0.4mi)</span>
        </div>
        <div className="flex flex-col items-center">
          <MapPin className="w-5 h-5 text-sky-400 fill-sky-400/20" />
          <span className="text-[9px] bg-slate-900/90 px-1.5 py-0.5 rounded text-sky-300 font-medium mt-0.5">ER (0.8mi)</span>
        </div>
      </div>

      <div className="relative z-10 text-[9px] text-slate-400 font-mono">
        37.7749° N, 122.4194° W
      </div>
    </div>
  );
};