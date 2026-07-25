'use client';

import React, { useState, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface SosButtonProps {
  onTrigger?: () => void;
}

export const SosButton: React.FC<SosButtonProps> = ({ onTrigger }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (isActive || countdown !== null) return;
    setIsHolding(true);
    let current = 0;

    timerRef.current = setInterval(() => {
      current += 5;
      setProgress(current);
      if (current >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsHolding(false);
        startCountdown();
      }
    }, 100);
  };

const handleTouchStart = (e: React.TouchEvent) => {
  // Prevents mobile browser context popups/selection when holding down
  if (e.cancelable) e.preventDefault();
  startHold();
};
  const cancelHold = () => {
    if (isHolding) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsHolding(false);
      setProgress(0);
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          setIsActive(true);
          if (onTrigger) onTrigger();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelCountdown = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(null);
    setProgress(0);
  };

  const handleStandDown = () => {
    setIsActive(false);
    setProgress(0);
  };

  if (countdown !== null) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Activating In</p>
        <div className="text-7xl font-black text-white font-mono animate-pulse my-2">{countdown}</div>
        <button
          onClick={cancelCountdown}
          className="mt-2 px-5 py-2 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white font-bold text-xs rounded-full flex items-center gap-2 transition"
        >
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="w-full bg-red-600/90 p-4 rounded-2xl text-center space-y-3">
        <h3 className="text-lg font-black text-white tracking-wide">EMERGENCY SOS ACTIVE</h3>
        <p className="text-xs text-red-100">Live position dispatched to trusted contacts.</p>
        <button
          onClick={handleStandDown}
          className="w-full py-3 bg-white text-red-600 font-black rounded-xl text-sm shadow hover:bg-slate-100 transition"
        >
          STAND DOWN (I'M SAFE)
        </button>
      </div>
    );
  }

  return (
    <div className="relative my-4 flex items-center justify-center">
      <svg className="w-56 h-56 -rotate-90">
        <circle cx="112" cy="112" r="92" className="stroke-slate-800" strokeWidth="10" fill="transparent" />
        <circle
          cx="112"
          cy="112"
          r="92"
          className="stroke-red-500 transition-all duration-75"
          strokeWidth="10"
          strokeDasharray={2 * Math.PI * 92}
          strokeDashoffset={2 * Math.PI * 92 * (1 - progress / 100)}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      <button
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        className={`absolute w-40 h-40 rounded-full flex flex-col items-center justify-center text-white shadow-lg transition select-none touch-none ${
          isHolding ? 'bg-red-700 scale-95' : 'bg-red-600 hover:bg-red-500'
        }`}
      >
        <AlertTriangle className="w-10 h-10 mb-1" />
        <span className="font-extrabold text-lg tracking-wider">HOLD SOS</span>
        <span className="text-[9px] text-red-200 mt-0.5 uppercase font-semibold">
          {isHolding ? 'KEEP HOLDING' : '2 SECONDS'}
        </span>
      </button>
    </div>
  );
};