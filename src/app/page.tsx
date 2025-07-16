'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

type Ticket = {
  id: number;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  due: string;
};

const mockUser = {
  name: 'دانیال شایگان',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const mockTickets: Ticket[] = [
  { id: 1, subject: 'مشکل در ورود به سیستم', status: 'Open', priority: 'High', due: '2025-07-12' },
  { id: 2, subject: 'درخواست راه‌اندازی ایمیل', status: 'In Progress', priority: 'Medium', due: '2025-07-15' },
  { id: 3, subject: 'رفع خطای شبکه', status: 'Resolved', priority: 'Low', due: '2025-06-30' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });

  useEffect(() => {
    const today = new Date();
    const threshold = new Date();
    threshold.setDate(today.getDate() + 3);

    const counts = {
      total: mockTickets.length,
      open: mockTickets.filter((t) => t.status === 'Open').length,
      inProgress: mockTickets.filter((t) => t.status === 'In Progress').length,
      resolved: mockTickets.filter((t) => t.status === 'Resolved').length,
    };

    setStats(counts);

    mockTickets.forEach((ticket) => {
      const dueDate = new Date(ticket.due);
      if (dueDate <= threshold && ticket.status !== 'Resolved') {
        toast.warn(`⏰ تیکت "${ticket.subject}" باید تا ${ticket.due} پیگیری شود!`, {
          autoClose: false,
        });
      }
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow space-y-6 text-gray-800 dark:text-white">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative w-16 h-16">
          <Image
            src={mockUser.avatar}
            alt="User Avatar"
            fill
            className="rounded-full border"
            priority
          />
        </div>
        <div className="text-center sm:text-right">
          <h2 className="text-2xl font-bold">خوش آمدید، {mockUser.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">وضعیت تیکت‌های شما در یک نگاه 👇</p>
        </div>
      </div>

      {/* Ticket Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
          <h3 className="text-xl font-semibold">کل تیکت‌ها</h3>
          <p className="text-3xl text-blue-700 dark:text-blue-300">{stats.total}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded">
          <h3 className="text-xl font-semibold">در حال بررسی</h3>
          <p className="text-3xl text-yellow-700 dark:text-yellow-300">{stats.inProgress}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
          <h3 className="text-xl font-semibold">حل شده</h3>
          <p className="text-3xl text-green-700 dark:text-green-300">{stats.resolved}</p>
        </div>
      </div>

      {/* Ticket List */}
      <div>
        <h3 className="text-xl font-bold mb-2">تیکت‌های فعال:</h3>
        <div className="space-y-4">
          {mockTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <div>
                <p className="font-medium">{ticket.subject}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  وضعیت: {ticket.status} | مهلت: {ticket.due}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded font-bold ${
                  ticket.priority === 'High'
                    ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                    : ticket.priority === 'Medium'
                    ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                    : 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                }`}
              >
                {ticket.priority === 'High' && '🚨 فوری'}
                {ticket.priority === 'Medium' && '⚠️ متوسط'}
                {ticket.priority === 'Low' && '✅ کم'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
