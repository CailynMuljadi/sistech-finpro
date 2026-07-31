// src/hooks/useTrustedContacts.ts
'use client';

import { useState, useEffect } from 'react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  status: 'AKTIF' | 'PERLU DIPERBARUI';
}

export function useTrustedContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('trusted_contacts');
    if (saved) {
      try {
        setContacts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse contacts:', e);
      }
    } else {
      const initial: Contact[] = [
        { id: '1', name: 'Ayah', email: 'ayah@example.com', status: 'AKTIF' },
        { id: '2', name: 'Ibu', email: 'ibu@example.com', status: 'AKTIF' },
        { id: '3', name: 'Kakak', email: 'kakak@example.com', status: 'PERLU DIPERBARUI' },
      ];
      setContacts(initial);
      localStorage.setItem('trusted_contacts', JSON.stringify(initial));
    }
  }, []);

  const addContact = (name: string, email: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      email,
      status: 'AKTIF',
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    localStorage.setItem('trusted_contacts', JSON.stringify(updated));
  };

  // NEW: Update function for editing contacts
  const updateContact = (id: string, name: string, email: string) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, name, email, status: 'AKTIF' as const } : c
    );
    setContacts(updated);
    localStorage.setItem('trusted_contacts', JSON.stringify(updated));
  };

  const removeContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem('trusted_contacts', JSON.stringify(updated));
  };

  const activeContacts = contacts.filter((c) => c.status === 'AKTIF');
  const hasContacts = activeContacts.length > 0;

  return {
    contacts,
    activeContacts,
    hasContacts,
    addContact,
    updateContact,
    removeContact,
  };
}