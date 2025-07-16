'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';

export default function TicketDetail() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);
  const ticketId = decodeURIComponent(params.ticketId as string);

  const [status, setStatus] = useState('pending');
  const [response, setResponse] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    alert(`وضعیت تیکت تغییر کرد به: ${e.target.value}`);
  };

  const handleResponseSubmit = () => {
    if (response.trim() === '') {
      alert('لطفاً یک پاسخ بنویسید.');
      return;
    }

    alert(`✅ پاسخ ارسال شد:\n\n${response}\n\nوضعیت: ${status}`);
    // Here you would send data to backend via fetch/axios
  };

  const handleDownload = () => {
    // Simulate file download
    const fileURL = '/sample.pdf'; // Replace with real file URL
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'ticket-attachment.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">تیکت: {ticketId}</h1>
      <p className="mb-2 text-gray-700">مهندس: {name}</p>

      {/* 📝 Ticket Info */}
      <div className="bg-gray-100 p-4 rounded mb-4 space-y-2 text-sm">
        <p><strong>عنوان:</strong> عدم نمایش شناورها</p>
        <p><strong>مشتری:</strong> علی رضایی</p>
        <p><strong>توضیحات:</strong> بعد از لاگین هیچ کشتی‌ای نمایش داده نمی‌شود.</p>
        <p>
          <strong>فایل پیوست:</strong>{' '}
          <button onClick={handleDownload} className="text-blue-600 hover:underline">
            دانلود فایل
          </button>
        </p>
      </div>

      {/* 📊 Status Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">وضعیت تیکت</label>
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="pending">در انتظار بررسی</option>
          <option value="in_progress">در حال بررسی</option>
          <option value="resolved">برطرف شده</option>
        </select>
      </div>

      {/* 📝 Response Input */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">پاسخ شما</label>
        <textarea
          className="w-full border rounded px-3 py-2 text-sm h-28"
          placeholder="توضیحات خود را بنویسید..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={handleResponseSubmit}
        className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700 text-sm"
      >
        ارسال پاسخ
      </button>
    </div>
  );
}
