'use client';

import React from 'react';
import { useUserSettings } from '@/context/UserSettingsContext';

export default function UserPreferencesToggle() {
  const { theme, direction, toggleTheme, toggleDirection } = useUserSettings();

  return (
    <div className="flex gap-4 items-center justify-center py-4">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      >
        {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Direction toggle */}
      <button
        onClick={toggleDirection}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
      >
        {direction === 'rtl' ? '🇮🇷 راست‌چین' : '🇬🇧 Left-to-Right'}
      </button>
    </div>
  );
}
