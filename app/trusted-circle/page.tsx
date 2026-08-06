'use client';

import React, { useState } from 'react';
import Footer from '@/components/Footer';

import { useTrustedContacts, Contact } from '@/hooks/useTrustedContacts';
import { useTripTimer } from '@/hooks/useTripTimer';

import { ContactList, ContactForm, ContactGuideCard } from '@/features/Contacts';

import TrustedSummary from '@/features/TrustedCircle/TrustedSummary';
import TravelSetting from '@/features/TrustedCircle/TravelSetting';
import TravelTips from '@/features/TrustedCircle/TravelTips';
import TripStatusView from '@/features/TrustedCircle/TripStatusView';
import TripConfirmedView from '@/features/TrustedCircle/TripConfirmedView';

export default function TrustedCirclePage() {
  const { contacts, activeContacts, addContact, updateContact, removeContact } = useTrustedContacts();
  const { trip, remainingSeconds, remainingLabel, startTrip, extendTime, confirmSafe, resetTrip } =
    useTripTimer();

  // ===== Contact form state & handlers =====
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailError, setEmailError] = useState('');
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

  const validateEmail = (inputEmail: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);

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
    if (!name.trim()) return setEmailError('Nama / label kontak wajib diisi.');
    if (!validateEmail(email)) return setEmailError('Format email tidak valid.');

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

  // ===== Ringkasan status buat TrustedSummary =====
  const tripStatusLabel = !trip
    ? 'Belum Ada Perjalanan'
    : trip.status === 'confirmed'
    ? 'Perjalanan Selesai'
    : trip.status === 'alerted'
    ? 'Menunggu Konfirmasi'
    : 'Sedang Berjalan';

  const tripStatusDesc = !trip
    ? 'Mulai perjalanan untuk mengaktifkan timer.'
    : trip.status === 'confirmed'
    ? 'Konfirmasi telah diterima.'
    : `Tujuan: ${trip.destination}`;

  // trip aktif (active/grace/alerted) -> tampilkan TripStatusView
  // trip confirmed -> tampilkan TripConfirmedView
  // belum ada trip -> tampilkan setup (hero + summary + contact + travel setting)

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#FFF8FC] via-[#FFF2F8] to-[#FFEAF4]">
        {!trip && (
          <>
            <section className="max-w-7xl mx-auto px-6 pt-14">
              <h1 className="text-4xl font-bold text-primary">Trusted Circle</h1>
              <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                Pantau perjalananmu dengan lebih tenang. Tambahkan Trusted Contact dan gunakan
                Check-in Timer agar orang terdekat mengetahui bahwa kamu telah sampai dengan aman.
              </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10">
              <TrustedSummary
                activeContactsCount={activeContacts.length}
                tripStatusLabel={tripStatusLabel}
                tripStatusDesc={tripStatusDesc}
              />
            </section>
          </>
        )}

        {trip && trip.status !== 'confirmed' && (
          <section className=" pt-14 pb-14">
            <TripStatusView
              trip={trip}
              remainingSeconds={remainingSeconds}
              remainingLabel={remainingLabel}
              contacts={activeContacts}
              onConfirmSafe={confirmSafe}
              onExtend={() => extendTime(15)}
            />
          </section>
        )}

        {trip && trip.status === 'confirmed' && (
          <section className="pt-14 pb-14">
            <TripConfirmedView
              trip={trip}
              trustedContactCount={contacts.length}
              onBackHome={resetTrip}
              onNewTrip={resetTrip}
            />
          </section>
        )}

        {!trip && (
          <section className="max-w-7xl mx-auto px-6 pb-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2 space-y-6">
                <ContactList
                  totalContactsCount={contacts.length}
                  filteredContacts={filteredContacts}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  editingContactId={editingContactId}
                  onEdit={handleStartEdit}
                  onRemove={removeContact}
                />
                <TravelSetting hasContacts={activeContacts.length > 0} onStart={startTrip} />
              </div>
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
                <TravelTips />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}