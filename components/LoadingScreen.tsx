import React from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading' }: LoadingScreenProps): React.ReactElement {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#ffeff7]">
      {/* Bouncing Circular Logo */}
      <div className="relative mb-6 animate-bounce">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg border-2 border-[#17274d]/10 flex items-center justify-center">
          <Image
            src="/SafeStep-Logo.png"
            alt="SafeStep Logo"
            width={72}
            height={72}
            className="w-full h-full rounded-full object-cover"
            priority
          />
        </div>
        {/* Shadow beneath the bouncing logo */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-[#17274d]/15 rounded-full blur-[2px] animate-pulse" />
      </div>

      {/* Loading Text with Animated Dots */}
      <div className="flex items-center gap-1 text-[#17274d] font-bold text-lg tracking-wide">
        <span>{message}</span>
        <span className="flex gap-1 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ce0088] animate-[bounce_1s_infinite_100ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#ce0088] animate-[bounce_1s_infinite_200ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#ce0088] animate-[bounce_1s_infinite_300ms]" />
        </span>
      </div>
    </div>
  );
}