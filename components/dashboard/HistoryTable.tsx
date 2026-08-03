export default function HistoryTable() {
  return (
    <div className="bg-white rounded-xl shadow p-5 mt-6">
      <h2 className="font-bold text-[#17274d] mb-4">
        Riwayat Singkat
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Waktu</th>
            <th>Aktivitas</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">
            <td>Hari Ini</td>
            <td>Anonymous Report</td>
            <td>Pending Review</td>
          </tr>

          <tr className="border-t">
            <td>Kemarin</td>
            <td>Check In Perjalanan</td>
            <td>Berhasil</td>
          </tr>

          <tr className="border-t">
            <td>2 Hari lalu</td>
            <td>Safe Route digunakan</td>
            <td>Selesai</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}