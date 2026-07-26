'use client';

import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { SosButton } from './SosButton';
import { EmergencyShortcuts } from './EmergencyShortcuts';
import { StaticMiniMap } from './StaticMiniMap';
import { SafePointsList } from './SafePointsList';

export const SosMainPanel: React.FC = () => {
  // Mock trusted contacts state to simulate empty or populated lists
  // Set this to [] to test the edge case warning banner!
  const [trustedContacts, setTrustedContacts] = useState<Array<{ id: string; name: string }>>([]);

  return (
    <div className="max-w-md mx-auto p-4 bg-slate-900 rounded-3xl border border-slate-800 text-white space-y-5">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-extrabold tracking-wide">Emergency Safeguard</h2>
        <p className="text-xs text-slate-400">Hold button to alert emergency services & contacts</p>
      </div>

      {/* PRD EDGE CASE REMINDER: Shown when no trusted contacts are configured */}
      {trustedContacts.length === 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl flex items-center justify-between gap-3 text-amber-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-[11px] leading-tight">
              <span className="font-bold block text-amber-200">No Trusted Contacts Added</span>
              SOS will still sound alarm & dial, but no location SMS will be broadcasted.
            </p>
          </div>
          <button
            onClick={() => {
              // Simulate adding a contact for testing
              setTrustedContacts([{ id: '1', name: 'Sarah' }]);
            }}
            className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-bold rounded-lg transition shrink-0 flex items-center gap-1"
          >
            <UserPlus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      )}

      {/* Main Hold Trigger Button */}
      <SosButton />

      {/* Nearby Refuge Points & Mini Map */}
      <StaticMiniMap />
      <SafePointsList />

      {/* Direct Call Shortcuts */}
      <EmergencyShortcuts />
    </div>
  );
};