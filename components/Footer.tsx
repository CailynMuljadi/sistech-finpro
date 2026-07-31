import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Custom SVG Icons for Social Media
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer(): React.ReactElement {
  return (
    <footer className="w-full bg-white text-[#3a3a3a] pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          
          {/* Left Column: Brand & Socials */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo & Name */}
              <Link href="/" className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity mb-4">
                <Image
                  src="/SafeStep-Logo.png"
                  alt="SafeStep Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-xl font-bold text-[#17274d]">SafeStep</span>
              </Link>

              {/* Tagline */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm mb-6">
                Platform keamanan bagi perempuan.<br />
                Berjalan dengan lebih aman, setiap hari.
              </p>
            </div>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-[#ffeff7] text-[#ce0088] hover:bg-magenta hover:text-pink-soft hover:opacity-80 flex items-center justify-center transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-[#ffeff7] text-[#ce0088] hover:bg-magenta hover:text-pink-soft hover:opacity-80 flex items-center justify-center transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-[#ffeff7] text-[#ce0088] hover:bg-magenta hover:text-pink-soft hover:opacity-80 flex items-center justify-center transition-all"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Section: 4 Link Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Column 1: Fitur */}
            <div>
              <h3 className="text-sm font-semibold text-[#17274d] mb-4">Fitur</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/safe-route" className="hover:text-[#17274d] text-gray-600 transition-colors">Safe Route</Link></li>
                <li><Link href="/anonymous-reporting" className="hover:text-[#17274d] text-gray-600 transition-colors">Anonymous Reporting</Link></li>
                <li><Link href="/emergency-sos" className="hover:text-[#17274d] text-gray-600 transition-colors">Emergency SOS</Link></li>
                <li><Link href="/trusted-circle" className="hover:text-[#17274d] text-gray-600 transition-colors">Trusted Circle</Link></li>
              </ul>
            </div>

            {/* Column 2: Tentang Kami */}
            <div>
              <h3 className="text-sm font-semibold text-[#17274d] mb-4">Tentang Kami</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/tentang-safestep" className="hover:text-[#17274d] text-gray-600 transition-colors">Tentang SafeStep</Link></li>
                <li><Link href="/blog" className="hover:text-[#17274d] text-gray-600 transition-colors">Blog</Link></li>
                <li><Link href="/karier" className="hover:text-[#17274d] text-gray-600 transition-colors">Karier</Link></li>
              </ul>
            </div>

            {/* Column 3: Pusat Bantuan */}
            <div>
              <h3 className="text-sm font-semibold text-[#17274d] mb-4">Pusat Bantuan</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/panduan-penggunaan" className="hover:text-[#17274d] text-gray-600 transition-colors">Panduan Penggunaan</Link></li>
                <li><Link href="/faq" className="hover:text-[#17274d] text-gray-600 transition-colors">FAQ</Link></li>
                <li><Link href="/laporkan-masalah" className="hover:text-[#17274d] text-gray-600 transition-colors">Laporkan Masalah</Link></li>
              </ul>
            </div>

            {/* Column 4: Lainnya */}
            <div>
              <h3 className="text-sm font-semibold text-[#17274d] mb-4">Lainnya</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/kebijakan-privasi" className="hover:text-[#17274d] text-gray-600 transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/kontak" className="hover:text-[#17274d] text-gray-600 transition-colors">Kontak</Link></li>
                <li><Link href="/syarat-dan-ketentuan" className="hover:text-[#17274d] text-gray-600 transition-colors">Syarat &amp; Ketentuan</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar Divider Line */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SafeStep. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/kebijakan-privasi" className="hover:text-[#17274d] transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-dan-ketentuan" className="hover:text-[#17274d] transition-colors">
              Syarat &amp; Ketentuan
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}