'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated user registration
    localStorage.setItem(
      'fake-user',
      JSON.stringify({ email, role })
    );

    toast.success('✅ ثبت‌نام با موفقیت انجام شد');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">ثبت‌نام کاربر جدید</h2>

        <input
          type="email"
          placeholder="ایمیل"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="رمز عبور"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="user">کاربر معمولی</option>
          <option value="engineer">مهندس</option>
          <option value="admin">مدیر</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  );
}
