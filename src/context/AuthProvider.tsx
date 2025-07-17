'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// ✅ Create named context
export const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Named AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // First check localStorage for stored user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    } else {
      // If no stored user, set a mock user for testing
      const mockUser: User = {
        id: '1',
        name: 'دانیال شایگان',
        email: 'daniel@example.com',
        role: 'user'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
