import { TravelTimeSelector } from './TravelTimeSelector';

interface Props {
  origin: string;
  destination: string;

  travelMode: 'now' | 'schedule';

  date: string;
  time: string;

  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;

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
  onOriginChange,
  onDestinationChange,
  onTravelModeChange,
  onDateChange,
  onTimeChange,
  onSearch,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-pink-200 p-8">

      <div className="space-y-6">

        <div>

          <label className="text-xs font-bold uppercase">
            Lokasi Asal
          </label>

          <input
            value={origin}
            onChange={(e) => onOriginChange(e.target.value)}
            className="mt-2 w-full rounded-lg border bg-[#fff6f6] px-4 py-3"
          />

        </div>

        <div>

          <label className="text-xs font-bold uppercase">
            Tujuan
          </label>

          <input
            value={destination}
            onChange={(e) => onDestinationChange(e.target.value)}
            placeholder="Masukkan tujuan..."
            className="mt-2 w-full rounded-lg border bg-[#fff6f6] px-4 py-3"
          />

        </div>

        <div>

          <label className="text-xs font-bold uppercase">
            Waktu Perjalanan
          </label>

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