'use client';

import React from 'react';
import Link from 'next/link';
import { Users, UserPlus, AlertCircle } from 'lucide-react';
import { useTrustedContacts } from '@/hooks/useTrustedContacts';

export const TrustedContactsCard: React.FC = () => {
  // Pull live contacts & status helpers from your shared hook
  const { contacts, activeContacts, hasContacts } = useTrustedContacts();

  return (
    <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between font-sans text-[#17274d] shadow-sm">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm tracking-wide uppercase text-[#17274d]">
            Trusted Contact
          </h3>
          <Users className="w-4 h-4 text-[#ce0088]" />
        </div>

        {/* Count Summary */}
        <p className="text-xs font-semibold mb-2 text-[#17274d]">
          {contacts.length === 0
            ? 'Belum ada kontak'
            : `${activeContacts.length} dari ${contacts.length} kontak aktif`}
        </p>

        {/* Contact List / Empty State */}
        {contacts.length === 0 ? (
          <div className="flex items-center gap-2 p-2.5 my-2 bg-[#ffeff7]/60 border border-[#ce0088]/20 rounded-xl text-xs text-[#17274d]/80">
            <AlertCircle className="w-4 h-4 text-[#ce0088] shrink-0" />
            <span>Tambahkan kontak untuk mengirim notifikasi darurat.</span>
          </div>
        ) : (
          <ul className="text-xs space-y-2 mb-4 opacity-90 pl-1 max-h-28 overflow-y-auto pr-1">
            {contacts.slice(0, 3).map((contact) => (
              <li
                key={contact.id}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      contact.status === 'AKTIF' ? 'bg-[#ce0088]' : 'bg-amber-400'
                    }`}
                  />
                  <span className="font-medium text-[#17274d] truncate">
                    {contact.name}
                  </span>
                </div>
                <span className="text-[10px] text-[#17274d]/60 truncate font-mono">
                  {contact.email}
                </span>
              </li>
            ))}
            {contacts.length > 3 && (
              <li className="text-[10px] text-[#ce0088] font-bold pl-4">
                +{contacts.length - 3} kontak lainnya
              </li>
            )}
          </ul>
        )}

        <p className="text-[11px] text-[#17274d]/75 mb-4">
          {hasContacts
            ? 'Semua kontak aktif siap menerima notifikasi darurat & lokasi.'
            : 'SOS akan membunyikan alarm tetapi tidak mengirim email/SMS.'}
        </p>
      </div>

      {/* Button linking directly to /kelola-kontak */}
      <Link
        href="/kelola-kontak"
        className="w-full py-2.5 bg-white hover:bg-[#ffeff7]/60 border border-[#17274d]/20 text-[#17274d] font-bold text-xs rounded-xl tracking-wider uppercase transition flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
      >
        <UserPlus className="w-3.5 h-3.5 text-[#ce0088]" />
        KELOLA KONTAK
      </Link>
    </div>
  );
};

export default TrustedContactsCard;