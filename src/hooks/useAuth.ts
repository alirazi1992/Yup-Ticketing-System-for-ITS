import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import { User } from '@/types/user'; // ✅ shared type

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
