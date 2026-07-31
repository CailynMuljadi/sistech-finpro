'use client';

import React from 'react';
import { Users, CheckCircle2, Info } from 'lucide-react';
import { Contact } from '@/hooks/useTrustedContacts';

interface ContactSummaryCardsProps {
  contacts: Contact[];
  activeContacts: Contact[];
  needsUpdateCount: number;
}

export const ContactSummaryCards: React.FC<ContactSummaryCardsProps> = ({
  contacts,
  activeContacts,
  needsUpdateCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Total Kontak */}
      <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-[#17274d]/60">
            Total Kontak
          </span>
          <Users className="w-4 h-4 text-[#ce0088]" />
        </div>
        <ul className="text-xs space-y-1 font-medium text-[#17274d]">
          <li>• {contacts.length} kontak tersimpan</li>
          <li className="text-emerald-600 font-bold">
            • {activeContacts.length} kontak aktif
          </li>
          {needsUpdateCount > 0 && (
            <li className="text-amber-600 font-bold">
              • {needsUpdateCount} kontak perlu diperbarui
            </li>
          )}
        </ul>
      </div>

      {/* Card 2: Status Notifikasi */}
      <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-[#17274d]/60">
            Status Notifikasi
          </span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <ul className="text-xs space-y-1 font-medium text-[#17274d]/80">
          <li>• Email notifikasi aktif</li>
          <li>• Semua kontak dapat menerima alert</li>
          <li className="opacity-60">• Pengiriman terakhir: berhasil</li>
        </ul>
      </div>

      {/* Card 3: Pengingat */}
      <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold text-[#17274d]/60">
            Pengingat
          </span>
          <Info className="w-4 h-4 text-[#ce0088]" />
        </div>
        <ul className="text-xs space-y-1 font-medium text-[#17274d]/80">
          <li>• Pastikan email kontak selalu aktif</li>
          <li>• Perbarui kontak yang berubah email</li>
          <li>• Tambahkan kontak cadangan bila perlu</li>
        </ul>
      </div>
    </div>
  );
};