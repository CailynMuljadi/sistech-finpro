import React from 'react';
import Link from 'next/link';
import { Check, Image as ImageIcon } from 'lucide-react';

export default function TrustedCircleSection(): React.ReactElement {
  const steps = [
    'Tambah Trusted Contact',
    'Check-in Timer',
    'Grace Period 5 Menit',
    'Auto Alert Email',
  ];

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Image Placeholder */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full aspect-[4/3] max-w-2xl bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-400 shadow-sm">
            <ImageIcon className="w-12 h-12 mb-3 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">
              [ Screenshot Halaman Trusted Circle ]
            </p>
          </div>
        </div>

        {/* Right Column: Text & Features List */}
        <div className="lg:col-span-6 flex flex-col items-start">
          
          {/* Top Label with Line */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-magenta" />
            <span className="text-xs font-bold uppercase tracking-widest text-magenta">
              Trusted Circle
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17274d] tracking-tight mb-4">
            Tetap Terhubung Selama Perjalanan
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#3a3a3a] leading-relaxed mb-8">
            Atur estimasi waktu perjalanan dan beri tahu orang terdekat bahwa kamu baik-baik saja. Jika perjalanan tidak dikonfirmasi hingga waktu habis, sistem akan otomatis mengirim email kepada Trusted Contact.
          </p>

          {/* Features List Cards */}
          <div className="w-full space-y-3 mb-8">
            {steps.map((step) => (
              <div
                key={step}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#ffeff7]/60 border border-pink-100/80 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-[#ffeff7] text-[#ce0088] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm font-semibold text-[#17274d]">
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/trusted-circle"
            className="px-7 py-3.5 rounded-xl bg-[#17274d] text-white font-bold text-sm shadow-md hover:bg-[#17274d]/90 transition-all cursor-pointer"
          >
            Pelajari Selengkapnya
          </Link>

        </div>

      </div>
    </section>
  );
}