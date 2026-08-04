'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';

import { useTrustedContacts, Contact } from '@/hooks/useTrustedContacts';

import {
  ContactList,
  ContactForm,
  ContactGuideCard,
} from '@/features/Contacts';

import TrustedSummary from '@/features/TrustedCircle/TrustedSummary';
import TravelSetting from '@/features/TrustedCircle/TravelSetting';
import TravelTips from '@/features/TrustedCircle/TravelTips';

export default function TrustedCirclePage() {
  const {
    contacts,
    activeContacts,
    addContact,
    updateContact,
    removeContact,
  } = useTrustedContacts();

  // ===========================
  // Contact States
  // ===========================

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailError, setEmailError] = useState('');
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  // ===========================
  // Validation
  // ===========================

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  // ===========================
  // Edit Contact
  // ===========================

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

  // ===========================
  // Submit Form
  // ===========================

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setEmailError('Nama / label kontak wajib diisi.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Format email tidak valid.');
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

  // ===========================
  // Search
  // ===========================

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ===========================
  // Page
  // ===========================

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#FFF8FC] via-[#FFF2F8] to-[#FFEAF4]">

        {/* Header */}

        <section className="max-w-7xl mx-auto px-6 pt-14">

          <h1 className="text-4xl font-bold text-primary">
            Trusted Circle
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600 leading-7">
            Pantau perjalananmu dengan lebih tenang.
            Tambahkan Trusted Contact dan gunakan
            Check-in Timer agar orang terdekat mengetahui
            bahwa kamu telah sampai dengan aman.
          </p>

        </section>

        {/* Summary */}

        <section className="max-w-7xl mx-auto px-6 py-10">

          <TrustedSummary />

        </section>

        {/* Trusted Contact */}

        <section className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Contact List */}

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

            {/* Contact Form */}

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

        </section>

        {/* Travel */}

        <section className="max-w-7xl mx-auto px-6 py-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2">

              <TravelSetting />

            </div>

            <div>

              <TravelTips />

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}