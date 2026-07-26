'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, X, Lock, ShieldAlert } from 'lucide-react';

interface SosButtonProps {
  onTrigger?: () => void;
  correctPin?: string; // Configurable user PIN, defaults to "1234"
}

export const SosButton: React.FC<SosButtonProps> = ({ 
  onTrigger, 
  correctPin = "1234" 
}) => {
  // Main States
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  // Security PIN Modal States
  const [showPinModal, setShowPinModal] = useState(false);
  const [modalTimer, setModalTimer] = useState(30);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // Ref to track modal context without closure issues
  const pinModalContextRef = useRef<'countdown' | 'active'>('active');

  // --- Hold Logic ---
  const startHold = () => {
    setIsHolding(true);
    let current = 0;
    if (timerRef.current) clearInterval(timerRef.current);

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

  const cancelHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsHolding(false);
    setProgress(0);
  };

  // --- Countdown Logic ---
  const startCountdown = () => {
    setCountdown(3);
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

  const pauseCountdown = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const cancelCountdownCompletely = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(null);
    setProgress(0);
  };

  // --- 30-Second PIN Modal Timer (Fixed Closure) ---
  const openPinModal = (context: 'countdown' | 'active') => {
    pinModalContextRef.current = context; // Save directly to ref

    if (context === 'countdown') {
      pauseCountdown();
    }

    setShowPinModal(true);
    setModalTimer(30);
    setEnteredPin('');
    setPinError(false);

    if (modalTimerRef.current) clearInterval(modalTimerRef.current);

    modalTimerRef.current = setInterval(() => {
      setModalTimer((prev) => {
        if (prev <= 1) {
          // Timeout reached (30s elapsed) -> Close modal & resume countdown immediately
          if (modalTimerRef.current) clearInterval(modalTimerRef.current);
          setShowPinModal(false);
          setEnteredPin('');
          setPinError(false);

          if (pinModalContextRef.current === 'countdown') {
            runCountdownInterval(); // Guarantees countdown resumes on 30s timeout!
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const closePinModalAndResume = () => {
    if (modalTimerRef.current) clearInterval(modalTimerRef.current);
    setShowPinModal(false);
    setEnteredPin('');
    setPinError(false);

    if (pinModalContextRef.current === 'countdown') {
      runCountdownInterval();
    }
  };

  const handlePinSubmit = (pin: string) => {
    setEnteredPin(pin);
    if (pin === correctPin) {
      if (modalTimerRef.current) clearInterval(modalTimerRef.current);
      
      if (pinModalContextRef.current === 'countdown') {
        cancelCountdownCompletely();
      } else {
        setIsActive(false);
        setProgress(0);
      }

      setShowPinModal(false);
      setEnteredPin('');
      setPinError(false);
    } else if (pin.length === 4) {
      setPinError(true);
    } else {
      setPinError(false);
    }
  };

  // --- Native Non-Passive Touch Listeners (Mobile Safari/Android) ---
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

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    btn.addEventListener('touchstart', handleTouchStart, { passive: false });
    btn.addEventListener('touchend', handleTouchEnd, { passive: false });
    btn.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    btn.addEventListener('contextmenu', handleContextMenu);

    return () => {
      btn.removeEventListener('touchstart', handleTouchStart);
      btn.removeEventListener('touchend', handleTouchEnd);
      btn.removeEventListener('touchcancel', handleTouchEnd);
      btn.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isActive, countdown]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (modalTimerRef.current) clearInterval(modalTimerRef.current);
    };
  }, []);

  return (
    <div className="relative my-4 flex items-center justify-center">
      {/* 1. COUNTDOWN VIEW */}
      {countdown !== null && !isActive && (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Activating In</p>
          <div className="text-7xl font-black text-white font-mono animate-pulse my-2">{countdown}</div>
          <button
            onClick={() => openPinModal('countdown')}
            className="mt-2 px-5 py-2 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white font-bold text-xs rounded-full flex items-center gap-2 transition active:scale-95"
          >
            <X className="w-4 h-4" /> Cancel Trigger
          </button>
        </div>
      )}

      {/* 2. ACTIVE EMERGENCY SOS VIEW */}
      {isActive && (
        <div className="w-full bg-red-600/95 p-5 rounded-2xl text-center space-y-4 relative overflow-hidden">
          <div className="pt-2">
            <ShieldAlert className="w-10 h-10 text-white mx-auto animate-bounce mb-1" />
            <h3 className="text-lg font-black text-white tracking-wide uppercase">EMERGENCY SOS ACTIVE</h3>
            <p className="text-xs text-red-100">Broadcasting live location & alarm running</p>
          </div>

          <button
            onClick={() => openPinModal('active')}
            className="w-full py-3 bg-white text-red-600 font-black rounded-xl text-sm shadow hover:bg-slate-100 transition active:scale-95"
          >
            STAND DOWN (CANCEL ALARM)
          </button>
        </div>
      )}

      {/* 3. DEFAULT HOLD TRIGGER BUTTON */}
      {countdown === null && !isActive && (
        <>
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
            ref={buttonRef}
            onMouseDown={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            style={{
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              touchAction: 'none',
            }}
            className={`absolute w-40 h-40 rounded-full flex flex-col items-center justify-center text-white shadow-lg transition select-none ${
              isHolding ? 'bg-red-700 scale-95' : 'bg-red-600 hover:bg-red-500'
            }`}
          >
            <AlertTriangle className="w-10 h-10 mb-1 pointer-events-none" />
            <span className="font-extrabold text-lg tracking-wider pointer-events-none">HOLD SOS</span>
            <span className="text-[9px] text-red-200 mt-0.5 uppercase font-semibold pointer-events-none">
              {isHolding ? 'KEEP HOLDING' : '2 SECONDS'}
            </span>
          </button>
        </>
      )}

      {/* --- SHARED PIN SECURITY MODAL (30s TIMEOUT) --- */}
      {showPinModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-xs w-full text-center space-y-4 shadow-2xl relative">
            <button
              onClick={closePinModalAndResume}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h4 className="text-base font-bold text-white">Security Verification</h4>
              <p className="text-xs text-slate-400 mt-1">
                Enter PIN to cancel. Auto-resumes in{' '}
                <span className="text-red-400 font-mono font-bold">{modalTimer}s</span>
              </p>
            </div>

            <input
              type="password"
              maxLength={4}
              autoFocus
              value={enteredPin}
              onChange={(e) => handlePinSubmit(e.target.value)}
              placeholder="PIN"
              className="w-32 mx-auto text-center py-2.5 text-2xl font-bold text-slate-900 bg-white rounded-lg tracking-widest focus:outline-none shadow-inner"
            />

            {pinError && (
              <p className="text-xs text-red-400 font-bold">
                Incorrect PIN. Try again.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};