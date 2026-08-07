'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  UserPlus,
  Clock3,
  ShieldCheck,
  Mail,
  Check,
} from 'lucide-react';

const features = [
  {
    icon: UserPlus,
    title: 'Tambah Trusted Contact',
  },
  {
    icon: Clock3,
    title: 'Check-in Timer',
  },
  {
    icon: ShieldCheck,
    title: 'Grace Period 5 Menit',
  },
  {
    icon: Mail,
    title: 'Auto Alert Email',
  },
];

export default function TrustedCirclePreview() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Phone */}

          <div className="flex justify-center">

            <Image
              src="/trusted-circle.png"
              alt="Trusted Circle"
              width={520}
              height={850}
              className="drop-shadow-2xl"
            />

          </div>

          {/* Content */}

          <div>

            <div className="inline-block bg-peach text-navy text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-6">
              Trusted Circle
            </div>

            <h2 className="text-4xl font-bold text-navy mb-5">
              Tetap Terhubung
              <br />
              Selama Perjalanan
            </h2>

            <p className="text-dark-gray leading-8 mb-10">
              Atur estimasi waktu perjalanan dan beri tahu orang
              terdekat bahwa kamu baik-baik saja. Jika perjalanan tidak
              dikonfirmasi hingga waktu habis, sistem akan otomatis
              mengirim sinyal Trusted Contact.
            </p>

            <div className="space-y-4">

              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex justify-between items-center shadow-sm"
                  >
                    <div className="flex items-center gap-4">

                      <div className="w-10 h-10 rounded-lg bg-pink-soft flex items-center justify-center">
                        <Icon className="w-5 h-5 text-navy" />
                      </div>

                      <span className="text-dark-gray font-medium">
                        {item.title}
                      </span>

                    </div>

                    <Check className="text-green-500 w-5 h-5" />

                  </div>
                );
              })}

            </div>

            <Link
              href="/trusted-circle"
              className="inline-block mt-8 bg-navy hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Pelajari Selengkapnya →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}