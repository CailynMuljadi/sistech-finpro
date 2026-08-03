'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Show, SignUpButton } from '@clerk/nextjs';
import { CheckCircle2 } from 'lucide-react';

export default function Hero(): React.ReactElement {
  return (
    <section className="relative w-full bg-[#ffeff7] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-24 top-16 w-[700px] h-[700px] rounded-full bg-[#ffd9ee] blur-[150px] opacity-80" />

        <div className="absolute -left-20 bottom-0 w-[350px] h-[350px] rounded-full bg-[#ffeaf5] blur-[120px] opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-primary">
              Rasa Aman
              <br />
              di Setiap
              <br />
              Langkahmu.
            </h1>

            <p className="mt-6 text-default text-lg leading-8 max-w-xl">
              SafeStep membantu perempuan bepergian dengan lebih aman melalui
              rekomendasi rute, laporan anonim, Emergency SOS, dan Trusted
              Circle yang selalu siap mendampingi perjalananmu.
            </p>

            {/* BUTTON */}
            <div className="flex flex-wrap gap-4 mt-10">

              <Show when="signed-out">
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <button
                    className="
                      bg-primary
                      text-white
                      px-8
                      py-3
                      rounded-xl
                      font-semibold
                      shadow-md
                      hover:opacity-90
                      transition
                      cursor-pointer
                    "
                  >
                    Mulai Sekarang
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  className="
                    bg-primary
                    text-white
                    px-8
                    py-3
                    rounded-xl
                    font-semibold
                    shadow-md
                    hover:opacity-90
                    transition
                  "
                >
                  Dashboard
                </Link>
              </Show>

              <Link
                href="#fitur"
                className="
                  border-2
                  border-primary
                  text-primary
                  px-8
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-primary
                  hover:text-white
                  transition
                "
              >
                Pelajari Fitur
              </Link>

            </div>

            {/* VALUE */}
            <div className="flex flex-wrap gap-8 mt-10">

              <div className="flex items-center gap-2 text-default">
                <CheckCircle2
                  className="text-[#ce0088]"
                  size={20}
                />
                <span>Gratis digunakan</span>
              </div>

              <div className="flex items-center gap-2 text-default">
                <CheckCircle2
                  className="text-[#ce0088]"
                  size={20}
                />
                <span>100% Anonim</span>
              </div>

              <div className="flex items-center gap-2 text-default">
                <CheckCircle2
                  className="text-[#ce0088]"
                  size={20}
                />
                <span>Tersedia 24/7</span>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center">

            <div className="relative">

              {/* Glow di belakang gambar */}
              <div className="absolute inset-0 rounded-full bg-[#ffd4ea] blur-[100px] opacity-80 scale-95" />

              <Image
                src="/hero-image.png"
                alt="SafeStep Hero"
                width={550}
                height={550}
                priority
                className="relative object-contain"
              />

            </div>

          </div>

        </div>

        {/* Divider ke section berikutnya */}
        <div className="mt-20 border-b border-pink-200/70" />

      </div>
    </section>
  );
}