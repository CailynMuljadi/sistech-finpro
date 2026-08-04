'use client';

import React from 'react';

export const ContactGuideCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-3 text-xs text-[#17274d]">
      <h3 className="font-bold text-xs uppercase tracking-wider text-[#17274d]/80">
        Bagaimana Cara Kerja Trusted Contact?
      </h3>
      <ol className="space-y-2 text-[11px] text-[#17274d]/80 list-decimal pl-4">
        <li>Tambahkan minimal satu Trusted Contact</li>
        <li>Tentukan estimasi waktu perjalanan.</li>
        <li>Tekan mulai perjalanan</li>
        <li>Konfirmasi {" "}
            <span className="text-[#ce0088] font-semibold">
              sampai dengan aman
            </span> sebelum timer habis.</li>
        <li>Jika waktu habis tanpa konfirmasi, SafeStep akan mengirim email otomatis ke Trusted Contact.</li>

      </ol>
    </div>
  );
};