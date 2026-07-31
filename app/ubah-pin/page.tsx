'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function UbahPinPage() {
  const router = useRouter();

  // Current PIN stored in state (defaults to '1234')
  const [currentPin, setCurrentPin] = useState('1234');
  const [showCurrentPin, setShowCurrentPin] = useState(false);

  // Form PIN Inputs (4 digits each)
  const [pinLama, setPinLama] = useState(['', '', '', '']);
  const [pinBaru, setPinBaru] = useState(['', '', '', '']);
  const [konfirmasiPin, setKonfirmasiPin] = useState(['', '', '', '']);

  // Options & Errors
  const [showInputDigits, setShowInputDigits] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-focus helper function for 4-digit segmented input blocks
  const handleDigitChange = (
    value: string,
    index: number,
    digitArray: string[],
    setDigitArray: React.Dispatch<React.SetStateAction<string[]>>,
    nextInputPrefix: string
  ) => {
    if (value.length > 1) return; // Prevent multi-character input

    const updated = [...digitArray];
    updated[index] = value;
    setDigitArray(updated);
    setErrorMessage('');

    // Auto focus next box
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`${nextInputPrefix}-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    digitArray: string[],
    prevInputPrefix: string
  ) => {
    if (e.key === 'Backspace' && !digitArray[index] && index > 0) {
      const prevInput = document.getElementById(`${prevInputPrefix}-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const oldPinStr = pinLama.join('');
    const newPinStr = pinBaru.join('');
    const confirmPinStr = konfirmasiPin.join('');

    // Validations
    if (oldPinStr.length < 4) {
      setErrorMessage('Masukkan 4 digit PIN lama Anda.');
      return;
    }

    if (oldPinStr !== currentPin) {
      setErrorMessage('PIN lama yang Anda masukkan salah.');
      return;
    }

    if (newPinStr.length < 4) {
      setErrorMessage('PIN baru harus terdiri dari 4 digit angka.');
      return;
    }

    if (newPinStr !== confirmPinStr) {
      setErrorMessage('Konfirmasi PIN baru tidak cocok.');
      return;
    }

    // Update PIN in state & localStorage
    setCurrentPin(newPinStr);
    localStorage.setItem('sos_security_pin', newPinStr);

    setSuccessMessage('PIN Darurat berhasil diperbarui!');

    // Reset inputs
    setPinLama(['', '', '', '']);
    setPinBaru(['', '', '', '']);
    setKonfirmasiPin(['', '', '', '']);

    // Redirect back to Emergency SOS after 1.5s
    setTimeout(() => {
      router.push('/emergency-sos');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#ffeff7] text-[#17274d] font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#17274d]/60">
          <Link href="/" className="hover:text-[#ce0088] transition">
            Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/emergency-sos" className="hover:text-[#ce0088] transition">
            Emergency SOS
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#17274d] font-bold">Ubah PIN</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#17274d]">
            Ubah PIN Darurat
          </h1>
          <p className="text-xs md:text-sm text-[#17274d]/75 mt-1">
            Perbarui PIN yang digunakan untuk membatalkan Emergency SOS selama countdown berlangsung.
          </p>
        </div>

        {/* Top Grid: Current PIN Status & Security Reminder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Box 1: PIN Saat Ini */}
          <div className="lg:col-span-2 bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#17274d]/60 block">
              PIN SAAT INI
            </span>

            <div className="flex items-center justify-between bg-[#f8f9fa] border border-[#17274d]/15 p-3 rounded-xl max-w-md">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#ce0088]" />
                <span className="text-xs font-bold tracking-widest font-mono">
                  {showCurrentPin ? currentPin : '••••'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCurrentPin(!showCurrentPin)}
                className="text-[#17274d]/60 hover:text-[#17274d] transition p-1"
              >
                {showCurrentPin ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-[11px] text-[#17274d]/60">
              PIN tidak ditampilkan secara langsung untuk menjaga keamanan.
            </p>
          </div>

          {/* Box 2: Pengingat Keamanan */}
          <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-2 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#ce0088]" />
              <span className="font-bold uppercase tracking-wider text-[#17274d]/80">
                Pengingat Keamanan
              </span>
            </div>
            <ol className="space-y-1.5 text-[11px] text-[#17274d]/80 list-decimal pl-4">
              <li>PIN digunakan untuk membatalkan Emergency SOS.</li>
              <li>Jangan bagikan PIN kepada orang lain.</li>
              <li>Ubah PIN jika dirasa sudah tidak aman.</li>
            </ol>
          </div>
        </div>

        {/* Main Form Box: Form Ubah PIN */}
        <div className="bg-white border border-[#17274d]/15 rounded-2xl p-6 shadow-sm space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#17274d] block border-b border-[#17274d]/10 pb-3">
            FORM UBAH PIN
          </span>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field 1: PIN LAMA */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase text-[#17274d]/80">
                  PIN LAMA
                </label>
                <span className="text-[10px] text-[#17274d]/50">
                  Masukkan PIN aktif sekarang
                </span>
              </div>
              <div className="flex items-center gap-2">
                {pinLama.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-lama-${idx}`}
                    type={showInputDigits ? 'text' : 'password'}
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleDigitChange(
                        e.target.value,
                        idx,
                        pinLama,
                        setPinLama,
                        'pin-lama'
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(idx, e, pinLama, 'pin-lama')}
                    className="w-12 h-12 text-center text-lg font-bold border border-[#17274d]/20 rounded-xl bg-[#f8f9fa] focus:outline-none focus:border-[#ce0088] focus:bg-white transition"
                  />
                ))}
              </div>
            </div>

            {/* Field 2: PIN BARU */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase text-[#17274d]/80">
                  PIN BARU
                </label>
                <span className="text-[10px] text-[#17274d]/50">4 digit angka</span>
              </div>
              <div className="flex items-center gap-2">
                {pinBaru.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-baru-${idx}`}
                    type={showInputDigits ? 'text' : 'password'}
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleDigitChange(
                        e.target.value,
                        idx,
                        pinBaru,
                        setPinBaru,
                        'pin-baru'
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(idx, e, pinBaru, 'pin-baru')}
                    className="w-12 h-12 text-center text-lg font-bold border border-[#17274d]/20 rounded-xl bg-[#f8f9fa] focus:outline-none focus:border-[#ce0088] focus:bg-white transition"
                  />
                ))}
              </div>
            </div>

            {/* Field 3: KONFIRMASI PIN BARU */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold uppercase text-[#17274d]/80">
                  KONFIRMASI PIN BARU
                </label>
                <span className="text-[10px] text-[#17274d]/50">Ulangi PIN baru</span>
              </div>
              <div className="flex items-center gap-2">
                {konfirmasiPin.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-confirm-${idx}`}
                    type={showInputDigits ? 'text' : 'password'}
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleDigitChange(
                        e.target.value,
                        idx,
                        konfirmasiPin,
                        setKonfirmasiPin,
                        'pin-confirm'
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(idx, e, konfirmasiPin, 'pin-confirm')
                    }
                    className="w-12 h-12 text-center text-lg font-bold border border-[#17274d]/20 rounded-xl bg-[#f8f9fa] focus:outline-none focus:border-[#ce0088] focus:bg-white transition"
                  />
                ))}
              </div>
            </div>

            <p className="text-[11px] text-[#17274d]/60">
              Gunakan PIN 4 digit yang mudah diingat tetapi tetap aman.
            </p>

            {/* Checkbox: Tampilkan PIN saat diketik */}
            <div className="pt-2 border-t border-[#17274d]/10 space-y-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#17274d]">
                <input
                  type="checkbox"
                  checked={showInputDigits}
                  onChange={(e) => setShowInputDigits(e.target.checked)}
                  className="rounded border-[#17274d]/30 text-[#ce0088] focus:ring-[#ce0088]"
                />
                Tampilkan PIN saat diketik
              </label>
              <p className="text-[10px] text-[#17274d]/50 pl-5">
                Aktifkan jika kamu ingin melihat angka PIN selama proses pengisian.
              </p>
            </div>

            {/* Alert Messages */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {successMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3.5 bg-[#17274d] hover:bg-[#17274d]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow active:scale-98"
              >
                SIMPAN PIN BARU
              </button>
              <button
                type="button"
                onClick={() => router.push('/emergency-sos')}
                className="w-full sm:w-28 py-3.5 bg-white hover:bg-[#ffeff7] border border-[#17274d]/20 text-[#17274d] font-bold text-xs uppercase tracking-wider rounded-xl transition text-center"
              >
                BATAL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}