import { Lightbulb } from "lucide-react";

export default function TravelTips() {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-[#ce0088]" />

        <h3 className="font-bold text-primary">
          Tips Sebelum Berangkat
        </h3>
      </div>

      <ul className="mt-5 space-y-3 text-sm text-slate-600">
        <li>• Pastikan email Trusted Contact masih aktif.</li>

        <li>• Aktifkan GPS agar lokasi dapat dibagikan.</li>

        <li>• Berikan estimasi perjalanan yang realistis.</li>

        <li>• Konfirmasi Sampai Aman sebelum timer habis.</li>
      </ul>
    </div>
  );
}