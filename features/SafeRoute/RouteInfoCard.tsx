'use client';

import { ShieldCheck } from 'lucide-react';

export function RouteInfoCard() {
  return (
    <div className="bg-white border border-[#f3b6c9] rounded-2xl p-5 shadow-sm h-fit">

      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-[#ce0088]" />

        <h3 className="font-bold text-sm text-[#17274d]">
          Mengapa rute ini aman?
        </h3>
      </div>

      <ul className="space-y-4 text-xs text-[#17274d]/75">

        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ce0088]" />
          Area dengan laporan insiden lebih rendah.
        </li>

        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ce0088]" />
          Pencahayaan jalan lebih baik.
        </li>

        <li className="flex gap-2">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ce0088]" />
          Melewati safe point terdekat.
        </li>

      </ul>

    </div>
  );
}