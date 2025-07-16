'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark';
type Direction = 'rtl' | 'ltr';

interface UserSettingsContextType {
  theme: Theme;
  direction: Direction;
  toggleTheme: () => void;
  toggleDirection: () => void;
}

const UserSettingsContext = createContext<UserSettingsContextType | null>(null);

export const useUserSettings = (): UserSettingsContextType => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};

export const UserSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [direction, setDirection] = useState<Direction>('rtl');

  // Set HTML <html dir=""> attribute
  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  // Set HTML class for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'rtl' ? 'ltr' : 'rtl'));
  };

  return (
    <UserSettingsContext.Provider
      value={{ theme, direction, toggleTheme, toggleDirection }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};
