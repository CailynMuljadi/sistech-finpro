'use client';

import Link from 'next/link';
import {
  Shield,
  FileText,
  PhoneCall,
  Users,
  LucideIcon,
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  iconBg: string;
}

const features: Feature[] = [
  {
    title: 'Safe Route',
    description:
      'Temukan rute dengan tingkat risiko lebih rendah berdasarkan data historis.',
    href: '/safe-route',
    icon: Shield,
    iconBg: 'bg-secondary-light',
  },
  {
    title: 'Anonymous Reporting',
    description:
      'Laporkan kejadian tanpa mengungkap identitas untuk membantu pengguna lain.',
    href: '/anonymous-reporting',
    icon: FileText,
    iconBg: 'bg-blue-50',
  },
  {
    title: 'Emergency SOS',
    description:
      'Aktifkan bantuan darurat hanya dengan menekan tombol SOS selama 2 detik.',
    href: '/emergency-sos',
    icon: PhoneCall,
    iconBg: 'bg-red-50',
  },
  {
    title: 'Trusted Circle',
    description:
      'Bagikan status perjalanan kepada orang terdekat secara otomatis.',
    href: '/trusted-circle',
    icon: Users,
    iconBg: 'bg-slate-100',
  },
];

export default function FiturUtama() {
  return (
    <section
      id="fitur"
      className="bg-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Pink Line */}

        <div className="w-full h-2 rounded-full bg-[#ce0088] mb-8" />

        {/* Label */}

        <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-semibold text-[#ce0088] bg-[#ffeff7] px-3 py-1 rounded-full">
          Fitur Utama
        </span>

        {/* Heading */}

        <h2 className="mt-5 text-4xl font-bold text-primary">
          Fitur yang Selalu Menemanimu
        </h2>

        <p className="mt-3 text-default max-w-xl">
          Empat fitur yang dirancang khusus untuk mendukung keamanan perempuan
          dalam setiap perjalanan.
        </p>

        {/* Cards */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-14">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <Link
                key={feature.title}
                href={feature.href}
                className="
                border
                border-secondary/40
                rounded-xl
                p-6
                hover:shadow-lg
                transition
                bg-white
                "
              >

                <div
                  className={`w-11 h-11 rounded-lg ${feature.iconBg}
                  flex items-center justify-center`}
                >
                  <Icon
                    size={20}
                    className="text-primary"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-primary">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-default">
                  {feature.description}
                </p>

              </Link>

            );

          })}

        </div>

      </div>
    </section>
  );
}