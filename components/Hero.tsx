import React from 'react';
import Link from 'next/link';
import { Check, Image as ImageIcon } from 'lucide-react';

export default function Hero(): React.ReactElement {
  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text & Content */}
        <div className="lg:col-span-6 flex flex-col items-start">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffeff7] text-[#ce0088] text-xs font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ce0088]" />
            Platform Keamanan Perempuan
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17274d] tracking-tight leading-[1.15] mb-6">
            Rasa Aman di Setiap Langkahmu
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#3a3a3a] leading-relaxed mb-8 max-w-xl">
            SafeStep membantu perempuan bepergian dengan lebih tenang melalui rekomendasi rute aman, laporan anonim, Emergency SOS, dan Trusted Circle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <Link
              href="/safe-route"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-[#17274d] text-white font-bold text-sm shadow-md hover:bg-[#17274d]/90 transition-all cursor-pointer"
            >
              Mulai Sekarang
            </Link>
            <Link
              href="#fitur"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-[#ffeff7] text-[#17274d] border border-[#ffeff7] font-bold text-sm hover:bg-[#ffeff7]/80 transition-all cursor-pointer"
            >
              Pelajari Fitur
            </Link>
          </div>

          {/* Value Badges / Checkmarks */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-[#3a3a3a]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#ffeff7] text-[#ce0088] flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-magenta">Gratis digunakan</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#ffeff7] text-[#ce0088] flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-magenta">100% Anonim</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#ffeff7] text-[#ce0088] flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-magenta">Tersedia 24/7</span>
            </div>
          </div>

        </div>

        {/* Right Column: Image Placeholder */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full aspect-[4/3] max-w-2xl bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-400">
            <ImageIcon className="w-12 h-12 mb-3 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">
              [ Ilustrasi / Mockup Website SafeStep ]
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}