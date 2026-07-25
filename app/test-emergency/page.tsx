'use client';

import React from 'react';
import { SosMainPanel } from '@/features/Emergency/SosMainPanel';

export default function TestEmergencyPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-slate-400 text-xs font-mono mb-4 text-center">
          --- TESTING FEATURE: EMERGENCY SOS ---
        </h1>
        
        {/* Render the full SosMainPanel containing all sub-features */}
        <SosMainPanel />
      </div>
    </div>
  );
}