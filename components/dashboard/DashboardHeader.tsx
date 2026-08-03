'use client';

import { useUser } from '@clerk/nextjs';

export default function DashboardHeader() {
  const { user } = useUser();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[#17274d]">
        Halo, {user?.firstName || 'Ayu'} 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Selamat datang kembali. Semua fitur keamanan siap digunakan kapan pun
        Anda membutuhkannya.
      </p>
    </div>
  );
}