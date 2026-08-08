'use client';

import React from 'react';
import { Plus, Edit2, X, Check, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  status: 'AKTIF' | 'PERLU DIPERBARUI';
  setStatus: (val: 'AKTIF' | 'PERLU DIPERBARUI') => void;
  emailError: string;
  setEmailError: (val: string) => void;
  editingContactId: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  status,
  setStatus,
  emailError,
  setEmailError,
  editingContactId,
  onSubmit,
  onCancelEdit,
}) => {
  return (
    <div className="bg-white border border-[#17274d]/15 p-5 rounded-2xl shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {editingContactId ? (
            <Edit2 className="w-4 h-4 text-[#ce0088]" />
          ) : (
            <Plus className="w-4 h-4 text-[#ce0088]" />
          )}
          <h2 className="font-bold text-sm uppercase text-[#17274d]">
            {editingContactId ? 'Ubah Trusted Contact' : 'Tambah Trusted Contact'}
          </h2>
        </div>

        {editingContactId && (
          <button
            onClick={onCancelEdit}
            className="text-[10px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-bold"
          >
            <X className="w-3 h-3" /> Batal
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="text-[10px] font-bold uppercase text-[#17274d]/70 block mb-1">
            NAMA / LABEL KONTAK
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Misal: Ayah, Sahabat, dll."
            className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#17274d]/20 rounded-xl text-xs text-[#17274d] focus:outline-none focus:border-[#ce0088]"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase text-[#17274d]/70 block mb-1">
            EMAIL KONTAK
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            placeholder="email@example.com"
            className="w-full px-3 py-2 bg-[#f8f9fa] border border-[#17274d]/20 rounded-xl text-xs text-[#17274d] focus:outline-none focus:border-[#ce0088]"
          />
        </div>

        {emailError && (
          <p className="text-[11px] text-red-600 font-bold flex items-center gap-1">
            <AlertCircle className="w-3 h-3 shrink-0" /> {emailError}
          </p>
        )}

        {/* Toggle status — cuma muncul waktu lagi edit kontak yang sudah ada */}
        {editingContactId && (
          <div>
            <label className="text-[10px] font-bold uppercase text-[#17274d]/70 block mb-1">
              STATUS KONTAK
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatus('AKTIF')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  status === 'AKTIF'
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-[#17274d] border-[#17274d]/20'
                }`}
              >
                Aktif
              </button>
              <button
                type="button"
                onClick={() => setStatus('PERLU DIPERBARUI')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  status === 'PERLU DIPERBARUI'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-[#17274d] border-[#17274d]/20'
                }`}
              >
                Nonaktif
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-[#17274d] hover:bg-[#17274d]/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow active:scale-98 flex items-center justify-center gap-1.5"
        >
          {editingContactId ? (
            <>
              <Check className="w-4 h-4 text-[#ce0088]" /> SIMPAN PERUBAHAN
            </>
          ) : (
            'TAMBAH KONTAK'
          )}
        </button>

        {editingContactId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl transition"
          >
            BATAL
          </button>
        )}

        <p className="text-[10px] text-[#17274d]/60 leading-tight">
          Kontak akan menerima notifikasi darurat saat Emergency SOS / Trusted Circle aktif.
        </p>
      </form>
    </div>
  );
};