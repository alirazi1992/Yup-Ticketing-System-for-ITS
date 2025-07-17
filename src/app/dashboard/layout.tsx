// src/app/dashboard/layout.tsx
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-col flex-1">
        <Header isOpen={isOpen} onToggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
