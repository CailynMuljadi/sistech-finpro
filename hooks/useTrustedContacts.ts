// src/hooks/useTrustedContacts.ts
'use client';

import { useState, useMemo } from 'react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  status: 'AKTIF' | 'PERLU DIPERBARUI';
}

function getInitialContacts(): Contact[] {
  if (typeof window === 'undefined') return [];

  const saved = localStorage.getItem('trusted_contacts');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse contacts:', e);
      return [];
    }
  }

  const initial: Contact[] = [
    { id: '1', name: 'Ayah', email: 'ayah@example.com', status: 'AKTIF' },
    { id: '2', name: 'Ibu', email: 'ibu@example.com', status: 'AKTIF' },
    { id: '3', name: 'Kakak', email: 'kakak@example.com', status: 'PERLU DIPERBARUI' },
  ];
  localStorage.setItem('trusted_contacts', JSON.stringify(initial));
  return initial;
}

export function useTrustedContacts() {
  const [contacts, setContacts] = useState<Contact[]>(getInitialContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingContactId, setEditingContactId] = useState<string | null>(null);

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

  const updateContact = (
    id: string,
    name: string,
    email: string,
    status: Contact['status'] = 'AKTIF'
  ) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, name, email, status } : c
    );
    setContacts(updated);
    localStorage.setItem('trusted_contacts', JSON.stringify(updated));
  };

  const removeContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem('trusted_contacts', JSON.stringify(updated));
    if (editingContactId === id) {
      setEditingContactId(null);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContactId(contact.id);
  };

  const handleRemove = (id: string) => {
    removeContact(id);
  };

  const activeContacts = contacts.filter((c) => c.status === 'AKTIF');
  const hasContacts = activeContacts.length > 0;

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    const q = searchQuery.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [contacts, searchQuery]);

  const totalContactsCount = contacts.length;

  return {
    contacts,
    activeContacts,
    hasContacts,
    addContact,
    updateContact,
    removeContact,
    // Ditambahkan untuk TrustedContactSection & ContactList
    searchQuery,
    setSearchQuery,
    editingContactId,
    handleEdit,
    handleRemove,
    filteredContacts,
    totalContactsCount,
  };
}