export function SafetyReasonCard() {
  return (
    <div className="bg-white border border-[#17274d]/10 rounded-2xl p-5 shadow-sm">

      <h3 className="font-bold text-lg mb-4">
        Mengapa rute ini aman?
      </h3>

      <ul className="space-y-2 text-sm text-[#17274d]/80 list-disc pl-5">

        <li>Melewati jalan utama.</li>

        <li>Pencahayaan cukup terang.</li>

        <li>Dekat dengan Safe Point.</li>

        <li>Memiliki tingkat risiko rendah.</li>

      </ul>

    </div>
  );
}