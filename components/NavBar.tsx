'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { Shield, FileText, PhoneCall, Users, LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { name: 'Safe Route', path: '/safe-route', icon: Shield },
  { name: 'Anonymous Reporting', path: '/anonymous-reporting', icon: FileText },
  { name: 'Emergency SOS', path: '/emergency-sos', icon: PhoneCall },
  { name: 'Trusted Circle', path: '/trusted-circle', icon: Users },
];

export default function Navbar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav className="bg-[#17274d] text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Home / Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-extrabold tracking-wide text-white hover:opacity-90 transition-opacity"
        >
          <Image
            src="/SafeStep-Logo.png"
            alt="SafeStep Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border border-[#ffeff7]/20"
            priority
          />
          <span className="text-xl font-extrabold tracking-wide text-white">
            SafeStep
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-1.5 transition-all text-sm tracking-wide ${
                  isActive
                    ? 'font-bold text-white border-b-2 border-[#ffeff7] pb-1'
                    : 'font-normal text-gray-200 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Authentication (Clerk Core 3 with Show) */}
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className=" bg-magenta text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-[#ffeff7] hover:text-[#17274d] transition-colors cursor-pointer">
                Log In / Sign Up
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9 border-2 border-[#ffeff7]',
                },
              }}
            />
          </Show>
        </div>

      </div>
    </nav>
  );
}