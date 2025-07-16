// ✅ /src/app/unauthorized/page.tsx
'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 دسترسی غیرمجاز</h1>
      <p className="text-gray-700 dark:text-white mb-6">
        شما اجازه دسترسی به این صفحه را ندارید.
      </p>
      <Link href="/" className="text-blue-600 underline">بازگشت به صفحه اصلی</Link>
    </div>
  );
}