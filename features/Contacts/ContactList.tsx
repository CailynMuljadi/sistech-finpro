'use client';

import React from 'react';
import { Search, Edit2, Trash2, UserCheck } from 'lucide-react';
import { Contact } from '@/hooks/useTrustedContacts';

interface ContactListProps {
  totalContactsCount: number;
  filteredContacts: Contact[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  editingContactId: string | null;
  onEdit: (contact: Contact) => void;
  onRemove: (id: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({
  totalContactsCount,
  filteredContacts,
  searchQuery,
  setSearchQuery,
  editingContactId,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="bg-white border border-[#17274d]/15 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-sm uppercase text-[#17274d]">
            Daftar Trusted Contact
          </h2>
          <span className="bg-[#ffeff7] text-[#ce0088] border border-[#ce0088]/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {totalContactsCount} kontak
          </span>
        </div>

        <div className="relative w-full sm:w-56">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#17274d]/40"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kontak..."
            className="w-full h-10 pl-10 pr-3 bg-[#f8f9fa] border border-[#17274d]/20 rounded-xl text-sm text-[#17274d] focus:outline-none focus:border-[#ce0088]"
          />
        </div>
      </div>

      {/* Table Column Headers */}
      <div className="hidden sm:grid grid-cols-12 gap-2 text-[10px] font-bold uppercase text-[#17274d]/50 pb-2 border-b border-[#17274d]/10 px-2">
        <span className="col-span-5">NAMA / LABEL</span>
        <span className="col-span-3">STATUS</span>
        <span className="col-span-4 text-right">AKSI</span>
      </div>

      {/* Contact Rows */}
      {filteredContacts.length === 0 ? (
        <div className="text-center py-10 space-y-2">
          <UserCheck className="w-8 h-8 text-[#17274d]/30 mx-auto" />
          <p className="text-xs text-[#17274d]/60 font-medium">
            {searchQuery
              ? 'Kontak tidak ditemukan.'
              : 'Belum ada kontak terpercaya. Tambahkan di panel sebelah kanan.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex flex-col sm:grid sm:grid-cols-12 gap-2 items-start sm:items-center p-3 border rounded-xl transition text-xs ${
                editingContactId === contact.id
                  ? 'bg-[#ffeff7]/80 border-[#ce0088]'
                  : 'bg-[#f8f9fa] hover:bg-[#ffeff7]/40 border-[#17274d]/10'
              }`}
            >
              {/* Contact Info */}
              <div className="sm:col-span-5 flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-[#17274d]/10 border border-[#17274d]/20 flex items-center justify-center font-bold text-[#17274d] shrink-0 uppercase">
                  {contact.name.charAt(0)}
                </div>
                <div className="truncate">
                  <div className="font-bold text-[#17274d] truncate">
                    {contact.name}
                  </div>
                  <div className="text-[11px] text-[#17274d]/60 font-mono truncate">
                    {contact.email}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="sm:col-span-3 mt-1 sm:mt-0">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                    contact.status === 'AKTIF'
                      ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-700 border border-amber-500/20'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      contact.status === 'AKTIF'
                        ? 'bg-emerald-500'
                        : 'bg-amber-500'
                    }`}
                  />
                  {contact.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="sm:col-span-4 flex items-center justify-end gap-2 w-full mt-2 sm:mt-0">
                <button
                  onClick={() => onEdit(contact)}
                  className={`px-3 py-1 font-bold text-[10px] rounded-lg transition flex items-center gap-1 border ${
                    editingContactId === contact.id
                      ? 'bg-[#17274d] text-white border-[#17274d]'
                      : 'bg-white hover:bg-[#ffeff7] text-[#17274d] border-[#17274d]/20'
                  }`}
                >
                  <Edit2 className="w-3 h-3 text-[#ce0088]" /> EDIT
                </button>

                <button
                  onClick={() => onRemove(contact.id)}
                  className="px-3 py-1 bg-white hover:bg-red-50 border border-red-200 text-red-600 font-bold text-[10px] rounded-lg transition flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> HAPUS
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};