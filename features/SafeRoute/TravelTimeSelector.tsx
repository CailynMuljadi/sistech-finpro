interface Props {
  travelMode: 'now' | 'schedule';
  date: string;
  time: string;

  onTravelModeChange: (mode: 'now' | 'schedule') => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

export function TravelTimeSelector({
  travelMode,
  date,
  time,
  onTravelModeChange,
  onDateChange,
  onTimeChange,
}: Props) {
  return (
    <div className="space-y-4">

      <div className="flex gap-3">

        <button
          onClick={() => onTravelModeChange('now')}
          className={`px-5 py-2 rounded-lg text-xs font-bold border transition ${
            travelMode === 'now'
              ? 'bg-[#17274d] text-white'
              : 'bg-white'
          }`}
        >
          SEKARANG
        </button>

        <button
          onClick={() => onTravelModeChange('schedule')}
          className={`px-5 py-2 rounded-lg text-xs font-bold border transition ${
            travelMode === 'schedule'
              ? 'bg-[#17274d] text-white'
              : 'bg-white'
          }`}
        >
          ATUR WAKTU
        </button>

      </div>

      {travelMode === 'schedule' && (

        <div className="grid md:grid-cols-2 gap-4">

          <div>

            <label className="text-xs font-bold block mb-2">
              Tanggal
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />

          </div>

          <div>

            <label className="text-xs font-bold block mb-2">
              Jam
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => onTimeChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />

          </div>

        </div>

      )}

    </div>
  );
}