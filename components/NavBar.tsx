'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
} from 'lucide-react';

import {
  Show,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';

const navItems = [
  {
    title: 'Safe Route',
    href: '/safe-route',
  },
  {
    title: 'Anonymous Reporting',
    href: '/anonymous-reporting',
  },
  {
    title: 'Emergency SOS',
    href: '/emergency-sos',
  },
  {
    title: 'Trusted Circle',
    href: '/trusted-circle',
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md">

      <div className="max-w-7xl mx-auto h-[72px] px-6 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Show when="signed-out">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/SafeStep-Logo.png"
              alt="SafeStep Logo"
              width={42}
              height={42}
              priority
            />

            <span className="text-background font-bold text-2xl hover:scale-100 transition-all duration-100 ease-in-out">
              SafeStep
            </span>
          </Link>
        </Show>

        <Show when="signed-in">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <Image
              src="/SafeStep-Logo.png"
              alt="SafeStep Logo"
              width={42}
              height={42}
              priority
            />

            <span className="text-background font-bold text-2xl hover:scale-100 transition-all duration-100 ease-in-out">
              SafeStep
            </span>
          </Link>
        </Show>

        {/* ================= MENU DESKTOP ================= */}

        <div className="hidden lg:flex items-center gap-10">

          {navItems.map((item) => {

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-all duration-100

                ${
                  active
                    ? 'font-semibold text-background'
                    : 'text-background/80 hover:text-background'
                }

                `}
              >
                {item.title}
              </Link>
            );

          })}

        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-4">

          <Show when="signed-out">

            <SignInButton mode="modal" forceRedirectUrl="/dashboard">

              <button
                className="
                bg-[#ce0088]
                text-[#ffeff7] [#ce0088]
                px-7
                py-2.5
                rounded-xl
                font-semibold
                text-sm
                hover:opacity-90
                transition
                cursor-pointer
                "
              >
                Login
              </button>

            </SignInButton>

          </Show>

          <Show when="signed-in">

            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    'w-10 h-10 border-2 border-secondary',
                },
              }}
            />

          </Show>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-background"
          >
            {open ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {open && (

        <div className="lg:hidden bg-primary border-t border-background/10">

          <div className="px-6 py-5 space-y-5">

            {navItems.map((item) => {

              const active = pathname === item.href;

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm

                  ${
                    active
                      ? 'font-semibold text-background'
                      : 'text-background/80'
                  }

                  `}
                >
                  {item.title}
                </Link>

              );

            })}

          </div>

        </div>

      )}

    </nav>
  );
}