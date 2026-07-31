'use client';

import React, { useState } from 'react';
import { Users, UserPlus } from 'lucide-react';

export const TrustedContactsCard: React.FC = () => {
  const [contacts] = useState(['Ayah', 'Ibu', 'Kakak']);

  return (
    <div className="bg-[#ffeff7] border border-[#17274d]/15 p-5 rounded-2xl flex flex-col justify-between font-mono text-[#17274d]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm tracking-wide uppercase text-[#17274d]">
            Trusted Contact
          </h3>
          <Users className="w-4 h-4 text-[#ce0088]" />
        </div>

        <p className="text-xs font-semibold mb-2">
          {contacts.length} kontak telah terhubung
        </p>

        <ul className="text-xs space-y-1.5 mb-4 opacity-90 pl-1">
          {contacts.map((contact, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ce0088]"></span>
              {contact}
            </li>
          ))}
        </ul>

        <p className="text-[11px] opacity-75 mb-4">
          Semua kontak siap menerima notifikasi darurat.
        </p>
      </div>

      <button className="w-full py-2.5 bg-white hover:bg-slate-50 border border-[#17274d]/20 text-[#17274d] font-bold text-xs rounded-xl tracking-wider uppercase transition flex items-center justify-center gap-1.5 active:scale-98">
        <UserPlus className="w-3.5 h-3.5 text-[#ce0088]" />
        KELOLA KONTAK
      </button>
    </div>
  );
};