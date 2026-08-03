'use client';

import Link from 'next/link';
import {
  Shield,
  FileText,
  PhoneCall,
  Users,
} from 'lucide-react';

const cards = [
  {
    title: 'Safe Route',
    subtitle: 'Rute terakhir: UNESA → Rumah',
    status: 'Risiko Rendah',
    button: 'Cari Rute Aman',
    href: '/safe-route',
    icon: Shield,
    color: 'bg-blue-50',
  },
  {
    title: 'Anonymous Reporting',
    subtitle: 'Laporan terakhir: Pending Review',
    status: 'Dikirim Hari Ini',
    button: 'Buat Laporan',
    href: '/anonymous-reporting',
    icon: FileText,
    color: 'bg-pink-50',
  },
  {
    title: 'Emergency SOS',
    subtitle: 'Status: Siap digunakan',
    status: 'PIN sudah dibuat',
    button: 'Buka Emergency',
    href: '/emergency-sos',
    icon: PhoneCall,
    color: 'bg-red-50',
  },
  {
    title: 'Trusted Circle',
    subtitle: '2 Trusted Contact aktif',
    status: 'Check-in Timer berhasil',
    button: 'Kelola Kontak',
    href: '/trusted-circle',
    icon: Users,
    color: 'bg-indigo-50',
  },
];

export default function OverviewCards() {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow border p-5"
          >
            <div
              className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-4`}
            >
              <Icon className="w-5 h-5 text-[#17274d]" />
            </div>

            <h3 className="font-bold text-[#17274d]">
              {card.title}
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              {card.subtitle}
            </p>

            <p className="text-xs text-gray-500 mb-4">
              {card.status}
            </p>

            <Link
              href={card.href}
              className="block text-center bg-[#17274d] text-white rounded-lg py-2 text-sm"
            >
              {card.button}
            </Link>
          </div>
        );
      })}
    </div>
  );
}