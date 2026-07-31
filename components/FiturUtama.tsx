import React from 'react';
import Link from 'next/link';
import { Shield, FileText, PhoneCall, Users, LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: 'Safe Route',
    description: 'Temukan rute dengan tingkat risiko lebih rendah berdasarkan data historis.',
    href: '/safe-route',
    icon: Shield,
  },
  {
    title: 'Anonymous Reporting',
    description: 'Laporkan kejadian tanpa mengungkapkan identitas untuk membantu pengguna lain.',
    href: '/anonymous-reporting',
    icon: FileText,
  },
  {
    title: 'Emergency SOS',
    description: 'Aktifkan bantuan darurat hanya dengan menekan dan menahan tombol SOS selama 2 detik.',
    href: '/emergency-sos',
    icon: PhoneCall,
  },
  {
    title: 'Trusted Circle',
    description: 'Bagikan status perjalanan kepada orang terdekat secara otomatis melalui Check-in Timer.',
    href: '/trusted-circle',
    icon: Users,
  },
];

export default function FiturUtama(): React.ReactElement {
  return (
    <section id="fitur" className="w-full bg-[#ffeff7] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="mb-14">
          {/* Top-left Label with Line */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-magenta" />
            <span className="text-xs font-bold uppercase tracking-widest text-magenta">
              Fitur Utama
            </span>
          </div>

          {/* Centered Heading & Subtitle */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17274d] tracking-tight mb-3">
              Fitur yang Selalu Menemanimu
            </h2>
            <p className="text-sm sm:text-base text-[#3a3a3a] leading-relaxed">
              Empat fitur utama yang dirancang untuk keamanan perempuan saat bepergian.
            </p>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all border border-pink-100/60 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Rounded Navy Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-[#17274d] text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-[#ffeff7]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#17274d] mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#3a3a3a] leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Link Action */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#17274d] group-hover:text-[#ce0088] transition-colors">
                  <span>Pelajari lebih lanjut</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}