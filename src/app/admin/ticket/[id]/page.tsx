'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter, useParams } from 'next/navigation';
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

const WS_URL = 'ws://localhost:3001';

type TicketData =
  | (SoftwareFields & { type: TicketType; status: TicketStatus; createdAt: string; submittedBy: string; notes?: TicketNote[] })
  | (HardwareFields & { type: TicketType; status: TicketStatus; createdAt: string; submittedBy: string; notes?: TicketNote[] })
  | (NetworkFields & { type: TicketType; status: TicketStatus; createdAt: string; submittedBy: string; notes?: TicketNote[] })
  | (OtherFields & { type: TicketType; status: TicketStatus; createdAt: string; submittedBy: string; notes?: TicketNote[] });

export default function TicketDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const { sendMessage } = useWebSocket(WS_URL);

  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [noteText, setNoteText] = useState('');
  const [status, setStatus] = useState<TicketStatus>(() => 'pending');

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'admin') router.replace('/unauthorized');
  }, [user, router]);

  useEffect(() => {
    const allTickets = localStorage.getItem('allTickets');
    if (allTickets) {
      try {
        const parsed = JSON.parse(allTickets) as TicketData[];
        const found = parsed.find((t) => t.createdAt === id);
        if (found) {
          setTicket(found);
          setStatus(found.status);
        }
      } catch (err) {
        console.error('Error loading ticket:', err);
      }
    }
  }, [id]);

  const handleAddNote = () => {
    if (!ticket || !noteText.trim()) return;

    const note: TicketNote = {
      sender: 'Admin',
      message: noteText.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedTicket = {
      ...ticket,
      notes: [...(ticket.notes || []), note],
    };

    setTicket(updatedTicket);
    setNoteText('');

    const stored = localStorage.getItem('allTickets');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as TicketData[];
        const updated = parsed.map((t) =>
          t.createdAt === ticket.createdAt ? updatedTicket : t
        );
        localStorage.setItem('allTickets', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving note to localStorage:', err);
      }
    }

    sendMessage({
      event: 'new_note',
      data: { id: ticket.createdAt, note },
    });
  };

  const handleStatusChange = (newStatus: TicketStatus) => {
    if (!ticket) return;

    setStatus(() => newStatus);
    const updatedTicket = { ...ticket, status: newStatus };
    setTicket(updatedTicket);

    const allTickets = localStorage.getItem('allTickets');
    if (allTickets) {
      try {
        const parsed = JSON.parse(allTickets) as TicketData[];
        const updatedList = parsed.map((t) =>
          t.createdAt === ticket.createdAt ? updatedTicket : t
        );
        localStorage.setItem('allTickets', JSON.stringify(updatedList));
      } catch (err) {
        console.error('Error updating localStorage:', err);
      }
    }

    sendMessage({
      event: 'update_ticket_status',
      data: { id: ticket.createdAt, newStatus },
    });
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">🔍 جزئیات تیکت</h2>

      {!ticket ? (
        <p className="text-gray-500">تیکتی با این شناسه یافت نشد.</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">📌 تغییر وضعیت تیکت</label>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
              className="px-4 py-2 border rounded bg-white shadow-sm"
            >
              <option value="pending">⏳ در انتظار بررسی</option>
              <option value="in_progress">🚧 در حال بررسی</option>
              <option value="resolved">✅ حل شده</option>
            </select>
          </div>

          <div className="bg-white p-4 rounded shadow border mb-4">
            <div className="text-sm text-gray-600 mb-2">
              <strong>ارسال شده توسط:</strong> {ticket.submittedBy}
            </div>
            <pre className="whitespace-pre-wrap break-words text-sm text-gray-800">
              {JSON.stringify(ticket, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-4 rounded shadow border">
            <h3 className="text-lg font-semibold mb-2">📝 یادداشت‌ها</h3>
            <ul className="space-y-2 text-sm text-gray-700 mb-3">
              {(ticket.notes || []).map((note, idx) => (
                <li key={idx} className="border-l-2 pl-2 border-blue-400">
                  <strong>{note.sender}:</strong> {note.message}{' '}
                  <em className="text-xs text-gray-500">({new Date(note.timestamp).toLocaleTimeString()})</em>
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddNote();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                className="flex-1 border px-2 py-1 rounded text-sm"
                placeholder="یادداشت جدید..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                ثبت
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
