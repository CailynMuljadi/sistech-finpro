'use client';

import React from 'react';

export const ContactGuideCard: React.FC = () => {
  return (
    <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-3 text-xs text-[#17274d]">
      <h3 className="font-bold text-xs uppercase tracking-wider text-[#17274d]/80">
        Cara Kerja Trusted Contact
      </h3>
      <ol className="space-y-2 text-[11px] text-[#17274d]/80 list-decimal pl-4">
        <li>Kontak akan menerima email saat SOS / timer perjalanan aktif.</li>
        <li>Kontak tidak perlu membuat akun di platform ini.</li>
        <li>Gunakan email yang masih aktif dan sering diperiksa.</li>
      </ol>
    </div>
  );
};