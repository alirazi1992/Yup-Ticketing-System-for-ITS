'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useWebSocket from '@/hooks/useWebSocket';
import {
  TicketType,
  TicketStatus,
  SoftwareFields,
  HardwareFields,
  NetworkFields,
  OtherFields,
  TicketNote,
} from '@/types/ticket';

type TicketData =
  | (SoftwareFields & { type: TicketType; status: TicketStatus; createdAt: string; notes?: TicketNote[] })
  | (HardwareFields & { type: TicketType; status: TicketStatus; createdAt: string; notes?: TicketNote[] })
  | (NetworkFields & { type: TicketType; status: TicketStatus; createdAt: string; notes?: TicketNote[] })
  | (OtherFields & { type: TicketType; status: TicketStatus; createdAt: string; notes?: TicketNote[] });

const WS_URL = 'ws://localhost:3001';

export default function AdminTicketViewer() {
  const { user } = useAuth();
  const router = useRouter();
  const { socket } = useWebSocket(WS_URL);

  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<TicketType | 'all'>('all');

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'admin') router.replace('/unauthorized');
  }, [user, router]);

  useEffect(() => {
    const stored = localStorage.getItem('allTickets');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as TicketData[];
        setTickets(parsed);
      } catch (err) {
        console.error('Invalid ticket format:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (!socket?.current) return;
    const ws = socket.current;

    ws.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        if (message.event === 'update_ticket_status') {
          setTickets((prev) =>
            prev.map((t) =>
              t.createdAt === message.data.id
                ? { ...t, status: message.data.newStatus }
                : t
            )
          );
        }

        if (message.event === 'new_note') {
          setTickets((prev) =>
            prev.map((t) =>
              t.createdAt === message.data.id
                ? {
                    ...t,
                    notes: [...(t.notes || []), message.data.note],
                  }
                : t
            )
          );
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    };

    return () => {
      ws.onmessage = null;
    };
  }, [socket]);

  if (!user || user.role !== 'admin') return null;

  const filtered = tickets.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch = JSON.stringify(t).toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6">📂 مدیریت تیکت‌ها</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="جستجو در بین تیکت‌ها..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as TicketType | 'all')}
          className="w-full md:w-1/3 px-3 py-2 border rounded"
        >
          <option value="all">همه نوع تیکت‌ها</option>
          <option value="software">نرم‌افزار</option>
          <option value="hardware">سخت‌افزار</option>
          <option value="network">شبکه</option>
          <option value="other">سایر</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">هیچ تیکتی یافت نشد.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((ticket, index) => {
            const lastNote = ticket.notes?.[ticket.notes.length - 1];
            return (
              <li key={index} className="border rounded bg-white shadow-sm hover:bg-blue-50 transition">
                <Link href={`/admin/ticket/${ticket.createdAt}`} className="block p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>نوع:</strong> {ticket.type} •{' '}
                    <strong>وضعیت:</strong> {ticket.status} •{' '}
                    <strong>زمان:</strong> {new Date(ticket.createdAt).toLocaleString()}
                  </div>

                  {lastNote && (
                    <div className="text-xs text-gray-700 italic mb-1">
                      📝 <strong>{lastNote.sender}:</strong> {lastNote.message}
                    </div>
                  )}

                  <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words max-h-24 overflow-hidden">
                    {JSON.stringify(ticket, null, 2)}
                  </pre>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
