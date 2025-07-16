'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-700 dark:text-white">
      در حال خروج...
    </div>
  );
};

export default LogoutPage;
