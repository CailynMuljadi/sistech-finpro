export interface TrustedContact {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'update';
}

export const trustedContacts: TrustedContact[] = [
  {
    id: 1,
    name: 'Ayah',
    email: 'ayah@example.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Ibu',
    email: 'ibu@example.com',
    status: 'active',
  },
  {
    id: 3,
    name: 'Kakak',
    email: 'kakak@example.com',
    status: 'update',
  },
];