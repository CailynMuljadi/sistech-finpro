'use client';

import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { SosButton } from './SosButton';
import { EmergencyShortcuts } from './EmergencyShortcuts';
import { StaticMiniMap } from './StaticMiniMap';
import { SafePointsList } from './SafePointsList';

export const SosMainPanel: React.FC = () => {
  // Mock trusted contacts state - set to [] to show the warning banner
  const [trustedContacts, setTrustedContacts] = useState<Array<{ id: string; name: string }>>([]);

  return (
    <div className="max-w-md mx-auto p-5 bg-[#ffeff7] rounded-3xl border border-[#17274d]/15 text-[#17274d] font-mono space-y-5 shadow-xl">
      {/* 1. Header */}
      <div className="text-center">
        <h2 className="text-xl font-black tracking-wide text-[#17274d]">
          Emergency Safeguard
        </h2>
        <p className="text-xs opacity-75 mt-0.5">
          Tahan tombol untuk mengirim sinyal darurat ke kontak & pihak berwenang
        </p>
      </div>

      {/* 2. Warning Banner when no trusted contacts exist */}
      {trustedContacts.length === 0 && (
        <div className="bg-[#ce0088]/10 border border-[#ce0088]/30 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-[#17274d]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#ce0088] shrink-0" />
            <p className="text-[11px] leading-tight">
              <span className="font-bold block text-[#ce0088]">
                Belum Ada Kontak Terpercaya
              </span>
              SOS tetap membunyikan alarm, namun SMS lokasi tidak dapat dikirim.
            </p>
          </div>
          <button
            onClick={() => {
              setTrustedContacts([{ id: '1', name: 'Ayah' }]);
            }}
            className="px-3 py-1.5 bg-[#17274d] text-[#ffeff7] text-xs font-bold rounded-xl transition shrink-0 flex items-center gap-1 hover:bg-[#17274d]/90 active:scale-95"
          >
            <UserPlus className="w-3.5 h-3.5" /> Tambah
          </button>
        </div>
      )}

      {/* 3. Main Hold Trigger Button with Sonar Effect */}
      <SosButton />

      {/* 4. Nearby Refuge Points & Mini Map with Real-time GPS */}
      <StaticMiniMap />
      <SafePointsList />

      {/* 5. Direct Call Shortcuts */}
      <EmergencyShortcuts />
    </div>
  );
};