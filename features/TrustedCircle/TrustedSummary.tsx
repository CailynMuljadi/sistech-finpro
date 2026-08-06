import { Users, ShieldCheck, BellRing } from 'lucide-react';

interface Props {
  activeContactsCount: number;
  tripStatusLabel: string;
  tripStatusDesc: string;
}

export default function TrustedSummary({
  activeContactsCount,
  tripStatusLabel,
  tripStatusDesc,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card
        icon={<Users size={22} />}
        title="TRUSTED CONTACT"
        value={`${activeContactsCount} Kontak Aktif`}
        desc="Siap menerima notifikasi."
      />

      <Card
        icon={<ShieldCheck size={22} />}
        title="STATUS PERJALANAN"
        value={tripStatusLabel}
        desc={tripStatusDesc}
      />

      <Card
        icon={<BellRing size={22} />}
        title="NOTIFIKASI"
        value="Siap Digunakan"
        desc="Alert akan dikirim bila diperlukan."
      />
    </div>
  );
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc: string;
}

function Card({ icon, title, value, desc }: CardProps) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Icon + Judul */}
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center text-pink-500">
          {icon}
        </div>

        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>
      </div>

      {/* Value */}
      <h2 className="mt-4 text-3xl font-bold text-primary">
        {value}
      </h2>

      {/* Description */}
      <p className="mt-2 text-sm text-slate-500">
        {desc}
      </p>
    </div>
  );
}