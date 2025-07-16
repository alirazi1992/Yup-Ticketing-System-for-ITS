'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import { useUserSettings } from '@/context/UserSettingsContext';

export default function InnerLayout({
  children,
  isOpen,
  onToggleSidebar,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const { theme, direction } = useUserSettings();

  return (
    <div
      className={`min-h-screen flex flex-col ${
        direction === 'rtl' ? 'rtl' : 'ltr'
      } ${theme === 'dark' ? 'dark' : ''}`}
    >
      <Header isOpen={isOpen} onToggleSidebar={onToggleSidebar} />
      <div className="flex flex-1">
        {isOpen && <Sidebar />}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">{children}</main>
      </div>
    </div>
  );
}
