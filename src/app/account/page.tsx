'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

const AccountPage = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState('/avatar.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formStep, setFormStep] = useState<'profile' | 'security'>('profile');
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [activities, setActivities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) setAvatar(storedAvatar);

    const fetchActivities = async () => {
      setActivities([
        'تیکت #1456 ایجاد شد.',
        'پاسخ به تیکت #1433 ارسال شد.',
        'تیکت #1409 بسته شد.',
      ]);
    };

    fetchActivities();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        localStorage.setItem('avatar', result);
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formStep === 'security') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      setLoading(true);
      try {
        const res = await fetch('/api/user/password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: formData.password }),
        });
        if (!res.ok) throw new Error('Update failed');
        alert('Password updated!');
      } catch {
        alert('خطا در بروزرسانی رمز عبور');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Profile updated (mock)');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <Image
            src={avatar}
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-800 dark:text-white">{user?.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">نقش: {user?.role}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-4 transition-all">
        <button
          onClick={() => setFormStep('profile')}
          className={`px-4 py-2 rounded transition-all duration-300 ${formStep === 'profile' ? 'bg-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
        >
          اطلاعات پروفایل
        </button>
        <button
          onClick={() => setFormStep('security')}
          className={`px-4 py-2 rounded transition-all duration-300 ${formStep === 'security' ? 'bg-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}
        >
          امنیت حساب
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formStep === 'profile' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">نام کاربری</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              value={formData.name}
              onChange={handleChange}
              placeholder="وارد کردن نام جدید"
            />
          </div>
        )}

        {formStep === 'security' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">رمز عبور جدید</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                value={formData.password}
                onChange={handleChange}
                placeholder="رمز جدید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">تأیید رمز عبور</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="تأیید رمز"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'در حال بروزرسانی...' : 'ذخیره تغییرات'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">📜 فعالیت‌های اخیر</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
          {activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountPage;
