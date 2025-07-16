'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace('/unauthorized');
    }
  }, [user, allowedRoles, router]); // ✅ full dependencies

  if (!user) return null;

  return <>{children}</>;
}
