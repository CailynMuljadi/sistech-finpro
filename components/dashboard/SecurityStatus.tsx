export default function SecurityStatus() {
  const status = [
    "Lokasi berhasil dideteksi",
    "2 kontak aktif",
    "Emergency SOS siap digunakan",
    "Check-in Timer aktif",
    "Tidak ada perjalanan aktif",
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold text-[#17274d] mb-4">
        Status Keamanan Hari Ini
      </h2>

      <ul className="space-y-3 text-sm">
        {status.map((item) => (
          <li key={item}>✅ {item}</li>
        ))}
      </ul>
    </div>
  );
}