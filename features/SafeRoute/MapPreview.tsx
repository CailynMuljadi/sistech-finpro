interface Props {
  destination: string;
}

export function MapPreview({ destination }: Props) {
  return (
    <div className="bg-white border border-[#17274d]/10 rounded-2xl p-5 shadow-sm">

      <h3 className="font-bold text-lg mb-4">
        Preview Rute
      </h3>

      <div className="h-[500px] rounded-xl bg-gray-100 flex items-center justify-center">

        <div className="text-center">

          <p className="font-semibold">
            Peta akan ditampilkan di sini
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Tujuan:
          </p>

          <p className="text-sm font-medium">
            {destination}
          </p>

        </div>

      </div>

    </div>
  );
}