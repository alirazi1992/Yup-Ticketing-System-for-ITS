// src/Components/Sidebar.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarProps = {
  isOpen?: boolean;
};

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user || !isOpen) return null;

  const isActive = (href: string) => pathname === href;

  const commonItems = [
    { href: '/account', label: 'پروفایل' },
    { href: '/logout', label: 'خروج' },
  ];

  const engineerItems = [{ href: `/engineer/${user.name}`, label: 'داشبورد مهندس' }];
  const adminItems = [{ href: '/admin', label: 'مدیریت تیکت‌ها' }];

  let menuItems = [...commonItems];

  if (user.role === 'engineer') {
    menuItems = [...engineerItems, ...commonItems];
  } else if (user.role === 'admin') {
    menuItems = [...adminItems, ...commonItems];
  }

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4 shadow-md hidden md:block">
      <div className="text-center text-xl font-bold mb-6 text-violet-400">🧭 منو</div>
      <ul className="space-y-2">
        {menuItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`block p-2 rounded transition-colors ${
                isActive(href) ? 'bg-violet-600' : 'hover:bg-gray-700'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
