'use client';

import { RouteData } from './data';

interface Props {
  route: RouteData;
}

export function RouteSummaryCard({ route }: Props) {
  return (
    <div className="bg-white border border-[#f3b6c9] rounded-xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-[#f3b6c9]">
        <h3 className="font-bold uppercase tracking-wide text-sm text-[#17274d]">
          Ringkasan Rute
        </h3>
      </div>

      {/* Content */}
      <div className="text-sm">

        <div className="grid grid-cols-2 px-5 py-3 border-b border-gray-200">
          <span className="font-semibold text-[#17274d]/70 uppercase text-xs">
            Asal
          </span>
          <span className="text-right text-[#17274d]">
            {route.origin}
          </span>
        </div>

        <div className="grid grid-cols-2 px-5 py-3 border-b border-gray-200">
          <span className="font-semibold text-[#17274d]/70">
            Estimasi Durasi
          </span>
          <span className="text-right">
            {route.duration}
          </span>
        </div>

        <div className="grid grid-cols-2 px-5 py-3 border-b border-gray-200">
          <span className="font-semibold text-[#17274d]/70">
            Tujuan
          </span>
          <span className="text-right">
            {route.destination}
          </span>
        </div>

        <div className="grid grid-cols-2 px-5 py-3 border-b border-gray-200">
          <span className="font-semibold text-[#17274d]/70">
            Jarak
          </span>
          <span className="text-right">
            {route.distance}
          </span>
        </div>

        <div className="grid grid-cols-2 px-5 py-3 border-b border-gray-200">
          <span className="font-semibold text-[#17274d]/70">
            Tingkat Risiko
          </span>

          <span
            className={`text-right font-medium ${
              route.risk === 'Rendah'
                ? 'text-green-600'
                : route.risk === 'Sedang'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            {route.risk}
          </span>
        </div>

        <div className="grid grid-cols-2 px-5 py-3">
          <span className="font-semibold text-[#17274d]/70">
            Safe Point
          </span>

          <span className="text-right">
            {route.safePoint} Lokasi
          </span>
        </div>

      </div>
    </div>
  );
}