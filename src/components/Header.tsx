// src/Components/Header.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useUserSettings } from '@/context/UserSettingsContext';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const Header = ({ isOpen, onToggleSidebar }: HeaderProps) => {
  const { user } = useAuth();
  const { theme, direction, toggleTheme, toggleDirection } = useUserSettings();

  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/32.jpg');

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-2xl md:hidden text-gray-700 dark:text-white focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? '📕' : '📖'}
        </button>
        <h1 className="text-xl font-bold text-violet-600">🎟 سیستم پشتیبانی</h1>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-xl text-gray-600 dark:text-white">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button onClick={toggleDirection} className="text-xl text-gray-600 dark:text-white">
          {direction === 'rtl' ? 'LTR' : 'RTL'}
        </button>

        {user?.email && (
          <span className="text-sm text-gray-800 dark:text-white">{user.email}</span>
        )}

        <Image
          src={avatar}
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full"
        />

        <Link href="/logout" className="text-sm text-red-500 underline">
          خروج
        </Link>
      </div>
    </header>
  );
};

export default Header;

