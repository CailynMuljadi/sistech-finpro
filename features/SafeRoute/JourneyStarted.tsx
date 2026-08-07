'use client';

import { RouteData } from "./data";
import { MapPreview } from "./MapPreview";

interface Props {
  route: RouteData;
  origin: string;
  destination: string;
  originCoord?: [number, number];
  destCoord?: [number, number];
  routeCoords?: [number, number][];
  onFinish: () => void;
}

export function JourneyStarted({
  route,
  origin,
  destination,
  originCoord,
  destCoord,
  routeCoords,
  onFinish,
}: Props) {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-black text-[#17274d]">
          Perjalanan Dimulai
        </h1>

        <p className="text-sm text-[#17274d]/70 mt-2">
          Ikuti rute yang telah dipilih untuk membantu perjalanan tetap aman.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#17274d]/10 p-6 shadow-sm">

        <h2 className="text-xl font-black text-center mb-8">
          STATUS RUTE
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="space-y-3">

            <div>
              <p className="text-xs uppercase text-gray-500">Asal</p>
              <p className="font-semibold">{origin}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-500">
                Estimasi Durasi
              </p>
              <p className="font-semibold">
                {route.duration}
              </p>
            </div>

          </div>

          <div className="space-y-3">

            <div>
              <p className="text-xs uppercase text-gray-500">
                Tujuan
              </p>
              <p className="font-semibold">
                {destination}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-500">
                Tingkat Risiko
              </p>
              <p className="font-semibold text-green-600">
                {route.risk}
              </p>
            </div>

          </div>

        </div>

        <MapPreview
          destination={destination}
          originCoord={originCoord}
          destCoord={destCoord}
          routeCoords={routeCoords}
        />

        <button
          onClick={onFinish}
          className="mt-8 w-full py-4 rounded-xl bg-[#17274d] text-white font-bold hover:bg-[#17274d]/90 transition"
        >
          Selesai Perjalanan
        </button>

      </div>

    </div>
  );
}