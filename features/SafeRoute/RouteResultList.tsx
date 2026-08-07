'use client';

import { RouteData } from './data';
import { RouteCard } from './RouteCard';
import { RouteInfoCard } from './RouteInfoCard';

interface Props {
  routes: RouteData[];
  onSelect: (route: RouteData) => void;
}

export function RouteResultList({ routes, onSelect }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 text-xs text-[#e78484]">
        <div className="w-2 h-2 rounded-full border border-[#e78484] mt-1" />
        <p>
          Tingkat risiko dihitung menggunakan data yang tersedia
          dan akan semakin akurat seiring bertambahnya laporan komunitas.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#f3b6c9] p-6">
          <h2 className="font-black text-2xl text-[#17274d] mb-6">HASIL RUTE</h2>
          <div className="space-y-5">
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} onClick={() => onSelect(route)} />
            ))}
          </div>
        </div>
        <RouteInfoCard />
      </div>
    </div>
  );
}