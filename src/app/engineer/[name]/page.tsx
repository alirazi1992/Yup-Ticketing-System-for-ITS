'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const mockTickets = [
  {
    id: 'TCKT-001',
    title: 'عدم نمایش شناورها',
    client: 'علی رضایی',
    priority: 'High',
    status: 'Pending',
    date: '2025-07-10',
  },
  {
    id: 'TCKT-002',
    title: 'فراموشی رمز عبور',
    client: 'مینا احمدی',
    priority: 'Medium',
    status: 'In Progress',
    date: '2025-07-09',
  },
];

export default function EngineerDashboard() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">پنل مهندس: {name}</h1>
      <p className="mb-6">شما وارد پنل اختصاصی خود شده‌اید.</p>

      <div className="space-y-4">
        {mockTickets.map((ticket) => (
          <div key={ticket.id} className="border rounded p-4 bg-gray-50">
            <div className="flex justify-between">
              <h2 className="font-semibold text-violet-700">{ticket.title}</h2>
              <span className="text-xs text-gray-500">{ticket.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">مشتری: {ticket.client}</p>
            <p className="text-sm text-gray-600">اولویت: {ticket.priority}</p>
            <p className="text-sm text-gray-600">وضعیت: {ticket.status}</p>
            <Link
              href={`/engineer/${name}/ticket/${ticket.id}`}
              className="inline-block mt-3 text-blue-600 hover:underline text-sm"
            >
              مشاهده جزئیات تیکت →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
