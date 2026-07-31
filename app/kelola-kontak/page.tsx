'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useTrustedContacts, Contact } from '@/hooks/useTrustedContacts';

// Import feature components via alias
import {
  ContactSummaryCards,
  ContactList,
  ContactForm,
  ContactGuideCard,
} from '@/features/Contacts';

export default function KelolaTrustedContactPage() {
  const { contacts, activeContacts, addContact, updateContact, removeContact } =
    useTrustedContacts();

  // Local Form & Search States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailError, setEmailError] = useState('');
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleStartEdit = (contact: Contact) => {
    setEditingContactId(contact.id);
    setName(contact.name);
    setEmail(contact.email);
    setEmailError('');
  };

  const handleCancelEdit = () => {
    setEditingContactId(null);
    setName('');
    setEmail('');
    setEmailError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setEmailError('Nama / label kontak wajib diisi.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Format email tidak valid. Contoh: nama@example.com');
      return;
    }

    if (editingContactId) {
      updateContact(editingContactId, name, email);
      setEditingContactId(null);
    } else {
      addContact(name, email);
    }

    setName('');
    setEmail('');
    setEmailError('');
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const needsUpdateCount = contacts.filter(
    (c) => c.status === 'PERLU DIPERBARUI'
  ).length;

  return (
    <div className="min-h-screen bg-[#ffeff7] text-[#17274d] font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
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
          <span className="text-[#17274d] font-bold">Kelola Trusted Contact</span>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#17274d]">
            Kelola Trusted Contact
          </h1>
          <p className="text-xs md:text-sm text-[#17274d]/75 mt-1">
            Tambahkan, lihat, ubah, atau hapus kontak terpercaya yang akan menerima notifikasi darurat.
          </p>
        </div>

        {/* Top Summary Cards */}
        <ContactSummaryCards
          contacts={contacts}
          activeContacts={activeContacts}
          needsUpdateCount={needsUpdateCount}
        />

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table Directory */}
          <div className="lg:col-span-2">
            <ContactList
              totalContactsCount={contacts.length}
              filteredContacts={filteredContacts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              editingContactId={editingContactId}
              onEdit={handleStartEdit}
              onRemove={removeContact}
            />
          </div>

          {/* Right Column: Form + Guide */}
          <div className="space-y-6">
            <ContactForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              setEmailError={setEmailError}
              editingContactId={editingContactId}
              onSubmit={handleSubmit}
              onCancelEdit={handleCancelEdit}
            />
            <ContactGuideCard />
          </div>
        </div>
      </div>
    </div>
  );
}