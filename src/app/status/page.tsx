'use client';

import { useEffect, useState } from 'react';

type Ticket = {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'approved' | 'resolved';
  date: string;
};

const mockTickets: Ticket[] = [
  {
    id: 'T001',
    title: 'عدم اتصال به اینترنت',
    category: 'network',
    status: 'pending',
    date: '2025-07-10',
  },
  {
    id: 'T002',
    title: 'مشکل در ورود به سیستم',
    category: 'account',
    status: 'approved',
    date: '2025-07-08',
  },
  {
    id: 'T003',
    title: 'خرابی پرینتر',
    category: 'hardware',
    status: 'resolved',
    date: '2025-07-06',
  },
];

const getStatusColor = (status: Ticket['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-blue-100 text-blue-800';
    case 'resolved':
      return 'bg-green-100 text-green-800';
  }
};

export default function TicketStatusPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Later: replace this with Firebase fetch
    setTickets(mockTickets);
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-xl font-semibold mb-4">لیست تیکت‌های ثبت شده</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">شماره</th>
              <th className="p-3">عنوان</th>
              <th className="p-3">دسته‌بندی</th>
              <th className="p-3">تاریخ</th>
              <th className="p-3">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{ticket.title}</td>
                <td className="p-3">{ticket.category}</td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status === 'pending'
                      ? 'در انتظار بررسی'
                      : ticket.status === 'approved'
                      ? 'تأیید شده'
                      : 'حل شده'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
