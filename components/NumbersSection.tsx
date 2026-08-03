import React from 'react';
import { SignUpButton, SignInButton, Show } from '@clerk/nextjs';

export default function NumbersSection(): React.ReactElement {
  const stats = [
    { value: '1.000+', label: 'Laporan Diterima' },
    { value: '100%', label: 'Laporan Bersifat Anonim' },
    { value: '4', label: 'Fitur Keamanan Utama' },
    { value: '24/7', label: 'Siap Digunakan Kapan Saja' },
  ];

  return (
    <section className="w-full bg-[#ffeff7] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17274d] tracking-tight mb-12">
          SafeStep dalam Angka
        </h2>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-pink-200/80 mb-20 border-y border-pink-200/80 py-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center px-4 py-4 md:py-0">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-magenta tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#3a3a3a]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#17274d] tracking-tight mb-4">
            Siap Melangkah dengan Lebih Aman?
          </h3>
          <p className="text-sm sm:text-base text-[#3a3a3a] leading-relaxed mb-8">
            Bergabung bersama SafeStep dan jadikan setiap perjalanan terasa lebih aman dan tenang.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Show when="signed-out">
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="px-7 py-3.5 rounded-xl bg-[#ce0088] text-white font-bold text-sm shadow-md hover:bg-[#ce0088]/90 transition-all cursor-pointer">
                  Daftar Sekarang
                </button>
              </SignUpButton>

              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button className="px-7 py-3.5 rounded-xl bg-white text-[#17274d] border border-gray-200 font-bold text-sm shadow-sm hover:bg-gray-50 transition-all cursor-pointer">
                  Masuk ke Akun
                </button>
              </SignInButton>
            </Show>

            <Show when="signed-in">
              <a
                href="/safe-route"
                className="px-8 py-3.5 rounded-xl bg-[#17274d] text-white font-bold text-sm shadow-md hover:bg-[#17274d]/90 transition-all"
              >
                Mulai Perjalanan Aman
              </a>
            </Show>
          </div>
        </div>

      </div>
    </section>
  );
}