'use client';

import { Contact } from '@/hooks/useTrustedContacts';
import { Trip, formatWIB } from '@/hooks/useTripTimer';

interface Props {
  trip: Trip;
  remainingSeconds: number;
  remainingLabel: string;
  contacts: Contact[];
  onConfirmSafe: () => void;
  onExtend: () => void;
}

const STATUS_MAP: Record<'active' | 'grace' | 'alerted', { label: string; dot: string }> = {
  active: { label: 'Sedang Berjalan', dot: 'bg-green-500' },
  grace: { label: 'Menunggu Konfirmasi', dot: 'bg-yellow-400' },
  alerted: { label: 'Menunggu Konfirmasi Pengguna', dot: 'bg-blue-500' },
};

export default function TripStatusView({
  trip,
  remainingSeconds,
  remainingLabel,
  contacts,
  onConfirmSafe,
  onExtend,
}: Props) {
  const isAlerted = trip.status === 'alerted';
  const isGrace = trip.status === 'grace';
  const status = STATUS_MAP[trip.status as 'active' | 'grace' | 'alerted'];

  const headline = isAlerted
    ? 'Notifikasi berhasil dikirim'
    : isGrace
    ? 'Perjalanan Anda hampir selesai.'
    : 'Perjalanan Sedang Berlangsung';

  const subline = isAlerted
    ? 'SafeStep telah mengirim email kepada seluruh Trusted Contact karena perjalanan tidak dikonfirmasi hingga waktu habis.'
    : isGrace
    ? 'SafeStep akan mengirim notifikasi kepada Trusted Contact jika perjalanan tidak dikonfirmasi setelah waktu habis.'
    : 'Check-in Timer sedang aktif. Konfirmasikan saat Anda telah sampai dengan aman atau perpanjang waktu jika perjalanan membutuhkan waktu lebih lama.';

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-primary">{headline}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subline}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase text-slate-500">Status Perjalanan</h2>

            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Status">
                <span className="inline-flex items-center gap-2 font-medium text-slate-700">
                  <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </Row>
              <Row label="Estimasi Durasi">{trip.duration} Menit</Row>
              <Row label="Tujuan">{trip.destination}</Row>
              <Row label="Perjalanan Dimulai">{formatWIB(trip.startTime)}</Row>
              {isAlerted && (
                <>
                  <Row label="Timer">Berakhir</Row>
                  <Row label="Status Email">Berhasil dikirim ke {contacts.length} Trusted Contact</Row>
                </>
              )}
            </dl>

            {!isAlerted && (
              <div className="mt-5 rounded-xl bg-orange-50 px-5 py-4 text-center">
                <p className="text-xs font-medium text-slate-500">Sisa Waktu</p>
                <p className="text-2xl font-bold text-slate-800">{remainingLabel}</p>
              </div>
            )}

            {!isAlerted ? (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={onConfirmSafe}
                  className="rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Sampai dengan Aman
                </button>
                <button
                  onClick={onExtend}
                  className="rounded-xl border border-primary py-3 text-sm font-semibold text-primary hover:bg-pink-50"
                >
                  Perpanjang +15 Menit
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-orange-50 px-5 py-4 text-xs text-slate-600">
                  Email telah dikirim kepada:
                  <ul className="mt-2 space-y-1 font-medium text-slate-700">
                    {contacts.map((c) => (
                      <li key={c.id}>
                        {c.name} — {c.email}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-orange-50 px-5 py-4 text-xs text-slate-600">
                  Email berisi informasi nama pengguna, waktu terakhir aktif, dan lokasi terakhir
                  yang berhasil diperbarui.
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={onConfirmSafe}
                    className="rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Saya Sudah Aman
                  </button>
                  <button className="rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-600 hover:border-primary">
                    Kembali ke Beranda
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400">
                  Setelah Anda menekan &quot;Saya Sudah Aman&quot;, status perjalanan akan diperbarui
                  menjadi selesai.
                </p>
              </div>
            )}

            {!isAlerted && (
              <p className="mt-4 text-center text-xs text-slate-400">
                {isGrace
                  ? 'Jika tidak ada konfirmasi hingga waktu habis, email otomatis akan dikirim kepada seluruh Trusted Contact.'
                  : 'Jika waktu habis tanpa konfirmasi, SafeStep akan mengirim email otomatis kepada Trusted Contact.'}
              </p>
            )}
          </div>

          {!isAlerted && (
            <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase text-slate-500">
                Trusted Contact yang Akan Diberi Notifikasi
              </h2>
              <ul className="mt-4 divide-y divide-slate-100">
                {contacts.map((c) => (
                  <li key={c.id} className="flex items-center gap-3 py-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-sm font-semibold text-primary">
                      {c.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl bg-orange-50 px-4 py-3 text-xs text-slate-500">
                Seluruh kontak akan menerima email hanya jika perjalanan tidak dikonfirmasi hingga
                waktu habis.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase text-slate-500">
              {isAlerted ? 'Ringkasan Alert' : 'Ringkasan Perjalanan'}
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              {isAlerted ? (
                <>
                  <Row label="Status Perjalanan">Belum Dikonfirmasi</Row>
                  <Row label="Lokasi Terakhir">{trip.destination}</Row>
                  <Row label="Waktu Terakhir Aktif">
                    {formatWIB(trip.alertedAt ?? trip.startTime)}
                  </Row>
                  <Row label="Status Email">✓ Alert telah dikirim</Row>
                </>
              ) : (
                <>
                  <Row label="Durasi Dipilih">{trip.duration} Menit</Row>
                  <Row label="Waktu Tersisa">{Math.ceil(remainingSeconds / 60)} Menit</Row>
                  <Row label="Status Lokasi">✓ Lokasi berhasil diperbarui</Row>
                  <Row label="Status Email">✓ Siap dikirim bila diperlukan</Row>
                </>
              )}
            </dl>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase text-slate-500">
              {isAlerted ? 'Langkah Selanjutnya' : 'Pengingat'}
            </h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-xs text-slate-500">
              {isAlerted ? (
                <>
                  <li>Hubungi Trusted Contact jika kondisi sudah aman.</li>
                  <li>Anda tetap dapat memulai perjalanan baru setelah status ini diselesaikan.</li>
                  <li>Pastikan estimasi waktu sesuai pada perjalanan berikutnya.</li>
                </>
              ) : (
                <>
                  <li>Hindari berjalan sendirian di area yang sepi.</li>
                  <li>Perbarui estimasi waktu jika perjalanan berubah.</li>
                  <li>Tekan &quot;Sampai dengan Aman&quot; setelah tiba di tujuan.</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-slate-700">{children}</dd>
    </div>
  );
}