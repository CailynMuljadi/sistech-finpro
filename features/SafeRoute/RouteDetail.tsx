'use client';

import { ArrowLeft, AlertTriangle } from 'lucide-react';

import { RouteData } from './data';
import { MapPreview } from './MapPreview';
import { RouteSummaryCard } from './RouteSummaryCard';
import { SafetyReasonCard } from './SafetyReasonCard';
import { SafetyTipsCard } from './SafetyTipsCard';

interface RouteDetailProps {
  route: RouteData;
  originCoord?: [number, number];
  destCoord?: [number, number];
  routeCoords?: [number, number][];
  onBack: () => void;
  onStart: () => void;
}

const LONG_DISTANCE_THRESHOLD_KM = 5;

function parseDistanceKm(distance: string): number {
  // "12,2 KM" atau "12.2 KM" -> 12.2
  const cleaned = distance.replace(',', '.').replace(/[^\d.]/g, '');
  return parseFloat(cleaned) || 0;
}

export function RouteDetail({
  route,
  originCoord,
  destCoord,
  routeCoords,
  onBack,
  onStart,
}: RouteDetailProps) {
  const distanceKm = parseDistanceKm(route.distance);
  const isLongDistance = distanceKm > LONG_DISTANCE_THRESHOLD_KM;

  return (
    <div className="space-y-6">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-[#17274d] hover:text-[#ce0088] transition -mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke hasil rute
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#17274d]">
          Detail Rute
        </h1>

        <p className="text-sm text-[#17274d]/70 mt-2">
          Berikut informasi keamanan dari rute yang dipilih.
        </p>
      </div>

      {/* Warning jarak jauh */}
      {isLongDistance && (
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
          <p className="text-sm text-orange-700">
            Jarak rute ini ({route.distance}) cukup jauh untuk ditempuh dengan berjalan kaki.
            Pertimbangkan menggunakan moda transportasi lain untuk perjalanan yang lebih aman dan efisien.
          </p>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map */}
        <div className="lg:col-span-2">
          <MapPreview
            destination={route.destination}
            originCoord={originCoord}
            destCoord={destCoord}
            routeCoords={routeCoords}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          <RouteSummaryCard route={route} />

          <SafetyReasonCard />

          <SafetyTipsCard />

          <button
            onClick={onStart}
            className="w-full bg-[#17274d] text-white py-4 rounded-xl font-bold hover:bg-[#17274d]/90 transition"
          >
            Gunakan Rute Ini
          </button>

        </div>

      </div>

    </div>
  );
}