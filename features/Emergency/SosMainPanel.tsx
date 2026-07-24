'use client';

import React from 'react';
import { SosButton } from './SosButton';
import { EmergencyShortcuts } from './EmergencyShortcuts';
import { StaticMiniMap } from './StaticMiniMap';
import { SafePointsList } from './SafePointsList';

export const SosMainPanel: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-slate-900 rounded-3xl border border-slate-800 text-white space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-extrabold tracking-wide">Emergency Safeguard</h2>
        <p className="text-xs text-slate-400">Hold button to alert emergency services & contacts</p>
      </div>

      <SosButton />
      <StaticMiniMap />
      <SafePointsList />
      <EmergencyShortcuts />
    </div>
  );
};