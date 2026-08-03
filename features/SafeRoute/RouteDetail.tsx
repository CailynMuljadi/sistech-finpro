'use client';

import { ArrowLeft } from 'lucide-react';

import { RouteData } from './data';
import { MapPreview } from './MapPreview';
import { RouteSummaryCard } from './RouteSummaryCard';
import { SafetyReasonCard } from './SafetyReasonCard';
import { SafetyTipsCard } from './SafetyTipsCard';

interface RouteDetailProps {
  route: RouteData;
  onBack: () => void;
  onStart: () => void;
}

export function RouteDetail({
  route,
  onBack,
  onStart,
}: RouteDetailProps) {
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

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map */}
        <div className="lg:col-span-2">
          <MapPreview destination={route.destination} />
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