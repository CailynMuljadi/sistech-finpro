import { TravelTimeSelector } from './TravelTimeSelector';
import { LocationAutocomplete } from './LocationAutocomplete';
import { PlaceSuggestion, LatLng } from '@/app/lib/mapApi';
import { Crosshair } from 'lucide-react';

interface Props {
  origin: string;
  destination: string;

  travelMode: 'now' | 'schedule';

  date: string;
  time: string;

  currentLocation?: LatLng | null;

  onOriginChange: (value: string) => void;
  onOriginSelect: (place: PlaceSuggestion) => void;
  onDestinationChange: (value: string) => void;
  onDestinationSelect: (place: PlaceSuggestion) => void;
  onUseCurrentLocation: () => void;

  onTravelModeChange: (mode: 'now' | 'schedule') => void;

  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;

  onSearch: () => void;
}

export function RouteSearchCard({
  origin,
  destination,
  travelMode,
  date,
  time,
  currentLocation,
  onOriginChange,
  onOriginSelect,
  onDestinationChange,
  onDestinationSelect,
  onUseCurrentLocation,
  onTravelModeChange,
  onDateChange,
  onTimeChange,
  onSearch,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-pink-200 p-8">

      <div className="space-y-6">

        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase">Lokasi Asal</label>
            <button
              type="button"
              onClick={onUseCurrentLocation}
              className="flex items-center gap-1 text-xs font-semibold text-[#ce0088] hover:underline"
            >
              <Crosshair className="w-3 h-3" />
              Gunakan lokasi saat ini
            </button>
          </div>

          <div className="mt-2">
            <LocationAutocomplete
              value={origin}
              placeholder="Masukkan lokasi asal..."
              biasCoord={currentLocation || undefined}
              onChange={onOriginChange}
              onSelectPlace={onOriginSelect}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase">Tujuan</label>
          <div className="mt-2">
            <LocationAutocomplete
              value={destination}
              placeholder="Masukkan tujuan..."
              biasCoord={currentLocation || undefined}
              onChange={onDestinationChange}
              onSelectPlace={onDestinationSelect}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase">Waktu Perjalanan</label>
          <div className="mt-3">
            <TravelTimeSelector
              travelMode={travelMode}
              date={date}
              time={time}
              onTravelModeChange={onTravelModeChange}
              onDateChange={onDateChange}
              onTimeChange={onTimeChange}
            />
          </div>
        </div>

        <button
          onClick={onSearch}
          className="w-full bg-[#17274d] text-white py-4 rounded-xl font-bold hover:bg-[#22386d] transition"
        >
          Cari Rute Aman
        </button>

      </div>

    </div>
  );
}