import { Users, ShieldCheck, BellRing } from "lucide-react";

export default function TrustedSummary() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
        icon={<Users className="text-pink-500" />}
        title="Trusted Contact"
        value="2 Kontak Aktif"
        desc="Siap menerima notifikasi."
      />

      <Card
        icon={<ShieldCheck className="text-pink-500" />}
        title="Status"
        value="Belum Ada Perjalanan"
        desc="Mulai perjalanan untuk mengaktifkan timer."
      />

      <Card
        icon={<BellRing className="text-pink-500" />}
        title="Notifikasi"
        value="Siap Digunakan"
        desc="Alert akan dikirim bila diperlukan."
      />
    </div>
  );
}

function Card({
  icon,
  title,
  value,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      {icon}

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <h2 className="mt-2 text-xl font-bold text-primary">{value}</h2>

      <p className="mt-2 text-sm text-slate-500">{desc}</p>
    </div>
  );
}