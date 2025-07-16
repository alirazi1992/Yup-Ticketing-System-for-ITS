'use client';

import React, { useState, useRef } from 'react';

const NetworkFormFields = () => {
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">IP Address</label>
        <input
          type="text"
          name="ipAddress"
          className="mt-1 w-full p-2 border rounded"
          placeholder="مثلاً 192.168.1.1"
        />
      </div>

 {/* شرح مشکل */}
      <div>
        <label className="block text-sm font-medium text-gray-700">توضیحات بیشتر</label>
        <textarea
          name="otherIssueDescription"
          rows={4}
          className="mt-1 w-full p-2 border rounded"
          placeholder="لطفاً مشکل خود را به‌طور کامل شرح دهید..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">پیوست (اختیاری)</label>
        <input
          type="file"
          ref={fileRef}
          name="attachment"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-violet-50 file:text-violet-700
                     hover:file:bg-violet-100"
        />
        {fileName && (
          <p className="text-xs text-gray-600 mt-1">فایل انتخاب‌شده: {fileName}</p>
        )}
      </div>
    </div>
  );
};

export default NetworkFormFields;
