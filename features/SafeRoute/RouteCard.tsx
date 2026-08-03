'use client';

import { ChevronRight } from 'lucide-react';
import { RouteData } from './data';

interface RouteCardProps {
  route: RouteData;
  onClick: () => void;
}

export function RouteCard({
  route,
  onClick,
}: RouteCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">

        <div className="text-[11px] font-bold uppercase text-[#17274d]">

          {route.recommended
            ? `Route ${route.id} (Direkomendasikan) ⭐`
            : `Route ${route.id}`}

        </div>

        <div className="text-[11px] font-bold text-[#17274d]">
          {route.duration}
        </div>

      </div>

      {/* Card */}
      <div
        className="
        border border-[#17274d]/15
        rounded-xl
        px-4
        py-3
        bg-[#fff8f8]
        flex
        justify-between
        items-center
        transition
        group-hover:border-[#ce0088]
        group-hover:shadow-md
      "
      >
        <div className="flex-1">

          <p className="font-medium text-sm text-[#17274d]">

            {route.path}

          </p>

        </div>

        <div className="flex items-center gap-2 ml-5">

          <span
            className="
            text-[10px]
            px-2
            py-1
            rounded-md
            bg-gray-100
            border
          "
          >
            {route.safePoint} Safe Point
          </span>

          <span
            className={`
            text-[10px]
            px-2
            py-1
            rounded-md
            border

            ${
              route.risk === 'Rendah'
                ? 'bg-green-50 text-green-700'
                : route.risk === 'Sedang'
                ? 'bg-yellow-50 text-yellow-700'
                : 'bg-red-50 text-red-700'
            }
          `}
          >
            Risiko {route.risk}
          </span>

          <ChevronRight
            size={18}
            className="text-gray-400"
          />

        </div>

      </div>
    </button>
  );
}