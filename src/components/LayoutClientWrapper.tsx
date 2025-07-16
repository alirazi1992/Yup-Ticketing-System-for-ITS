// src/Components/LayoutClientWrapper.tsx
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1">
        <Header isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}
