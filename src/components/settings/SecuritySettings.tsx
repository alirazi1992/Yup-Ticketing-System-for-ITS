// src/components/settings/SecuritySettings.tsx
'use client';

import React from 'react';

interface SecuritySettingsProps {
  form: {
    password: string;
    twoFactor: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelete: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ form, handleChange, handleDelete }) => {
  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold">تنظیمات امنیتی</h3>

      <div>
        <label className="block text-right font-medium">رمز عبور جدید</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1 text-right"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="font-medium">فعال‌سازی احراز هویت دو مرحله‌ای</label>
        <input
          type="checkbox"
          name="twoFactor"
          checked={form.twoFactor}
          onChange={handleChange}
          className="w-5 h-5"
        />
      </div>

      <button
        type="button"
        onClick={handleDelete}
        className="text-red-600 underline text-sm mt-4"
      >
        حذف حساب
      </button>
    </div>
  );
};

export default SecuritySettings;
