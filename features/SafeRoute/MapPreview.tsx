'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

interface LeafletMapProps {
  originCoord: [number, number];
  destCoord: [number, number];
  routeCoords: [number, number][];
}

const LeafletMap = dynamic(
  () => import('./LeafletMap') as Promise<{ default: ComponentType<LeafletMapProps> }>,
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] rounded-xl bg-gray-100 flex items-center justify-center">
        <p className="text-sm text-gray-500">Memuat peta...</p>
      </div>
    ),
  }
);

interface Props {
  destination: string;
  originCoord?: [number, number];
  destCoord?: [number, number];
  routeCoords?: [number, number][];
}

export function MapPreview({ destination, originCoord, destCoord, routeCoords }: Props) {
  const hasMapData = !!(originCoord && destCoord);

  return (
    <div className="bg-white border border-[#17274d]/10 rounded-2xl p-5 shadow-sm">
      <h3 className="font-bold text-lg mb-4">Preview Rute</h3>

      {hasMapData ? (
        <div className="overflow-hidden rounded-xl">
          <LeafletMap
            originCoord={originCoord!}
            destCoord={destCoord!}
            routeCoords={routeCoords || []}
          />
        </div>
      ) : (
        <div className="h-[500px] rounded-xl bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <p className="font-semibold">Peta akan ditampilkan di sini</p>
            <p className="text-sm text-gray-500 mt-2">Tujuan:</p>
            <p className="text-sm font-medium">{destination}</p>
          </div>
        </div>
      )}
    </div>
  );
}