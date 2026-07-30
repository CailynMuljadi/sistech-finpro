'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import { Menu, X, Shield, FileText, PhoneCall, Users, LayoutDashboard, LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Safe Route', path: '/safe-route', icon: Shield },
  { name: 'Anonymous Reporting', path: '/anonymous-reporting', icon: FileText },
  { name: 'Emergency SOS', path: '/emergency-sos', icon: PhoneCall },
  { name: 'Trusted Circle', path: '/trusted-circle', icon: Users },
];

export default function Navbar(): React.ReactElement {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-[#17274d] text-white px-4 sm:px-6 py-3.5 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Hamburger (Mobile) + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-1.5 rounded-lg text-[#ffeff7] hover:bg-[#ffeff7]/10 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#ffeff7]" />
            ) : (
              <Menu className="w-6 h-6 text-[#ffeff7]" />
            )}
          </button>

          {/* Logo links to Dashboard if signed in, otherwise Landing Page */}
          <Show when="signed-in">
            <Link 
              href="/dashboard" 
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/SafeStep-Logo.png" 
                alt="SafeStep Logo" 
                width={36} 
                height={36} 
                className="w-9 h-9 rounded-full object-cover border border-[#ffeff7]/20"
                priority
              />
              <span className="text-xl font-extrabold tracking-wide text-white">
                SafeStep
              </span>
            </Link>
          </Show>

          <Show when="signed-out">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/SafeStep-Logo.png" 
                alt="SafeStep Logo" 
                width={36} 
                height={36} 
                className="w-9 h-9 rounded-full object-cover border border-[#ffeff7]/20"
                priority
              />
              <span className="text-xl font-extrabold tracking-wide text-white">
                SafeStep
              </span>
            </Link>
          </Show>
        </div>

        {/* Desktop Links */}
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

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="bg-[#ffeff7] text-[#17274d] font-semibold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm shadow-sm hover:bg-white transition-colors cursor-pointer">
                Log In / Sign Up
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8 sm:w-9 sm:h-9 border-2 border-[#ffeff7]',
                },
              }}
            />
          </Show>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[#ffeff7]/10 flex flex-col space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                  isActive
                    ? 'font-bold bg-[#ffeff7] text-[#17274d]'
                    : 'font-normal text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#ce0088]' : 'text-gray-300'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}