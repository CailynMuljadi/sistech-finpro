export default function RecentActivity() {
  const activities = [
    "Laporan anonim berhasil dikirim dan sedang ditinjau",
    "Trusted Contact 'Ayah' berhasil diperbarui",
    "Lokasi berhasil diperbarui 15 menit yang lalu",
    "Belum ada Emergency SOS yang digunakan minggu ini",
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold text-[#17274d] mb-4">
        Aktivitas Terbaru
      </h2>

      <ul className="space-y-3 text-sm text-gray-600">
        {activities.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}