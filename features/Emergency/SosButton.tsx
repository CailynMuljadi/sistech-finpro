'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert, X, Lock } from 'lucide-react';

interface SosButtonProps {
  onTrigger?: () => void;
  correctPin?: string;
}

export const SosButton: React.FC<SosButtonProps> = ({
  onTrigger,
  correctPin = '1234',
}) => {
  const [holdTime, setHoldTime] = useState(0); // in seconds
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  // PIN Modal States
  const [showPinModal, setShowPinModal] = useState(false);
  const [modalTimer, setModalTimer] = useState(30);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pinModalContextRef = useRef<'countdown' | 'active'>('active');

  // --- Hold SOS Logic ---
  const startHold = () => {
    setIsHolding(true);
    setHoldTime(0);

    if (timerRef.current) clearInterval(timerRef.current);

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setHoldTime(elapsed);

      if (elapsed >= 2.0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsHolding(false);
        setHoldTime(2.0);
        startCountdown();
      }
    }, 50);
  };

  const cancelHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsHolding(false);
    setHoldTime(0);
  };

  // --- Countdown Logic ---
  const startCountdown = () => {
    setCountdown(30);
    runCountdownInterval();
  };

  const runCountdownInterval = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);

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

  const openPinModal = (context: 'countdown' | 'active') => {
    pinModalContextRef.current = context;
    if (context === 'countdown' && countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    setShowPinModal(true);
    setModalTimer(30);
    setEnteredPin('');
    setPinError(false);

    if (modalTimerRef.current) clearInterval(modalTimerRef.current);
    modalTimerRef.current = setInterval(() => {
      setModalTimer((prev) => {
        if (prev <= 1) {
          if (modalTimerRef.current) clearInterval(modalTimerRef.current);
          setShowPinModal(false);
          if (pinModalContextRef.current === 'countdown') {
            runCountdownInterval();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePinSubmit = (pin: string) => {
    setEnteredPin(pin);
    if (pin === correctPin) {
      if (modalTimerRef.current) clearInterval(modalTimerRef.current);
      if (pinModalContextRef.current === 'countdown') {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setCountdown(null);
        setHoldTime(0);
      } else {
        setIsActive(false);
        setHoldTime(0);
      }
      setShowPinModal(false);
      setEnteredPin('');
      setPinError(false);
    } else if (pin.length === 4) {
      setPinError(true);
    }
  };

  // --- Mobile Touch Handler ---
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startHold();
    };
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      cancelHold();
    };

    btn.addEventListener('touchstart', handleTouchStart, { passive: false });
    btn.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      btn.removeEventListener('touchstart', handleTouchStart);
      btn.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center font-mono my-2 relative">
      {/* Dynamic Sonar CSS Keyframes */}
      <style jsx>{`
        @keyframes sonar-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .animate-sonar-1 {
          animation: sonar-ring 1.5s infinite cubic-bezier(0, 0.2, 0.8, 1);
        }
        .animate-sonar-2 {
          animation: sonar-ring 1.5s infinite cubic-bezier(0, 0.2, 0.8, 1) 0.5s;
        }
        .animate-sonar-3 {
          animation: sonar-ring 1.5s infinite cubic-bezier(0, 0.2, 0.8, 1) 1s;
        }
      `}</style>

      {/* 1. COUNTDOWN VIEW */}
      {countdown !== null && !isActive && (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <p className="text-[#ce0088] font-bold text-xs uppercase tracking-widest mb-1">
            Mengaktifkan SOS Dalam
          </p>
          <div className="text-6xl font-black text-[#17274d] my-2 animate-pulse">
            {countdown}s
          </div>
          <button
            onClick={() => openPinModal('countdown')}
            className="mt-3 px-6 py-2.5 bg-[#17274d] text-[#ffeff7] font-bold text-xs rounded-full flex items-center gap-2 hover:bg-[#17274d]/90 transition"
          >
            <X className="w-4 h-4" /> BATALKAN SOS
          </button>
        </div>
      )}

      {/* 2. ACTIVE EMERGENCY STATE */}
      {isActive && (
        <div className="w-full bg-[#ce0088] text-white p-6 rounded-2xl text-center space-y-4 shadow-xl">
          <ShieldAlert className="w-12 h-12 mx-auto animate-bounce" />
          <h3 className="text-lg font-black tracking-wider uppercase">
            EMERGENCY SOS AKTIF
          </h3>
          <p className="text-xs opacity-90">
            Penyiaran lokasi langsung & alarm darurat sedang berjalan.
          </p>
          <button
            onClick={() => openPinModal('active')}
            className="w-full py-3 bg-[#17274d] text-white font-bold rounded-xl text-xs tracking-wider uppercase"
          >
            MATIKAN ALARM (MASUKKAN PIN)
          </button>
        </div>
      )}

      {/* 3. DEFAULT SOS BUTTON WITH REPEATED SONAR RIPPLE ANIMATION */}
      {countdown === null && !isActive && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Sonar Pulsing Circles (Ripples emanating outward when held down) */}
            {isHolding && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-[#ce0088] animate-sonar-1 pointer-events-none" />
                <div className="absolute inset-0 rounded-full border-2 border-[#ce0088] animate-sonar-2 pointer-events-none" />
                <div className="absolute inset-0 rounded-full border-2 border-[#ce0088] animate-sonar-3 pointer-events-none" />
              </>
            )}

            {/* Main Outer Decorative Border Circle */}
            <div className="absolute inset-1 rounded-full border-2 border-[#17274d]/20" />

            {/* Interactive SOS Trigger Button */}
            <button
              ref={buttonRef}
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              className={`relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center border-4 transition-transform duration-100 select-none shadow-lg ${
                isHolding
                  ? 'bg-[#ce0088] border-[#17274d] text-white scale-95'
                  : 'bg-[#ffeff7] border-[#17274d] text-[#17274d] hover:bg-[#ce0088]/10'
              }`}
            >
              <span className="text-2xl font-black tracking-wider pointer-events-none">
                SOS
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase mt-1 pointer-events-none">
                TEKAN & TAHAN
              </span>
            </button>
          </div>

          {/* Feedback Indicators matching wireframe image_67cd5e.png */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="px-4 py-1.5 border border-[#17274d]/30 rounded-lg text-xs font-bold text-[#17274d] bg-white/60">
              {isHolding ? 'MENAHAN... JANGAN LEPAS' : 'TEKAN & TAHAN UNTUK SOS'}
            </div>
            <div className="px-3 py-1 border border-dashed border-[#17274d]/40 rounded-md text-xs font-mono text-[#17274d]">
              {holdTime.toFixed(1)} detik / 2 detik
            </div>
          </div>
        </div>
      )}

      {/* --- PIN SECURITY MODAL --- */}
      {showPinModal && (
        <div className="fixed inset-0 bg-[#17274d]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#ffeff7] border border-[#17274d]/20 p-6 rounded-2xl max-w-xs w-full text-center space-y-4 shadow-2xl text-[#17274d]">
            <div className="w-10 h-10 bg-[#ce0088]/10 border border-[#ce0088]/30 rounded-full flex items-center justify-center mx-auto text-[#ce0088]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold">PIN Pembatalan</h4>
              <p className="text-xs opacity-75 mt-1">
                Masukkan PIN untuk membatalkan. Waktu tersisa:{' '}
                <span className="font-bold text-[#ce0088]">{modalTimer}s</span>
              </p>
            </div>

            <input
              type="password"
              maxLength={4}
              autoFocus
              value={enteredPin}
              onChange={(e) => handlePinSubmit(e.target.value)}
              placeholder="••••"
              className="w-32 mx-auto text-center py-2 text-xl font-bold bg-white text-[#17274d] rounded-lg tracking-widest border border-[#17274d]/30 focus:outline-none"
            />

            {pinError && (
              <p className="text-xs text-red-600 font-bold">
                PIN Salah. Silakan coba lagi.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};