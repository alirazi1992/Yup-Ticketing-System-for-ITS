'use client';

import { useEffect, useState } from 'react';
import useWebSocket from '@/hooks/useWebSocket';
import {
  TicketType,
  SoftwareFields,
  HardwareFields,
  NetworkFields,
  OtherFields,
  TicketStatus,
  TicketNote,
} from '@/types/ticket';

const VALID_STATUSES: TicketStatus[] = ['open', 'in_progress', 'resolved', 'closed'];
const TABS: TicketType[] = ['software', 'hardware', 'network', 'other'];

type TicketWithNotes =
  | (SoftwareFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] })
  | (HardwareFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] })
  | (NetworkFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] })
  | (OtherFields & { type: TicketType; createdAt: string; status: TicketStatus; notes?: TicketNote[] });

export default function AdminTicketView() {
  const [tickets, setTickets] = useState<TicketWithNotes[]>([]);
  const [activeTab, setActiveTab] = useState<TicketType>('software');
  const { socket, sendMessage } = useWebSocket('ws://localhost:3001');

  useEffect(() => {
    const currentSocket = socket?.current;
    if (!currentSocket) return;

    currentSocket.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        if (message.event === 'new_ticket') {
          setTickets((prev) => [message.data, ...prev]);
        } else if (message.event === 'update_ticket_status') {
          setTickets((prev) =>
            prev.map((t) =>
              t.createdAt === message.data.id
                ? { ...t, status: message.data.newStatus }
                : t
            )
          );
        } else if (message.event === 'new_note') {
          setTickets((prev) =>
            prev.map((t) =>
              t.createdAt === message.data.id
                ? { ...t, notes: [...(t.notes || []), message.data.note] }
                : t
            )
          );
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    return () => {
      if (currentSocket) currentSocket.onmessage = null;
    };
  }, [socket]);

  const handleStatusChange = (ticket: TicketWithNotes, newStatus: TicketStatus) => {
    sendMessage({
      event: 'update_ticket_status',
      data: { id: ticket.createdAt, newStatus },
    });
  };

  const handleAddNote = (ticket: TicketWithNotes, noteText: string) => {
    const note: TicketNote = {
      message: noteText,
      sender: 'Admin',
      timestamp: new Date().toISOString(),
    };

    sendMessage({
      event: 'new_note',
      data: { id: ticket.createdAt, note },
    });
  };

  const filteredTickets = tickets.filter((ticket) => ticket.type === activeTab);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">🎛️ Admin Ticket View</h2>

      <div className="flex gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {filteredTickets.length === 0 ? (
        <p className="text-gray-500">No {activeTab} tickets yet...</p>
      ) : (
        <ul className="space-y-6">
          {filteredTickets.map((ticket, index) => (
            <li key={index} className="p-4 rounded border bg-white shadow">
              <div className="text-sm text-gray-600 mb-1">
                <strong>Time:</strong> {new Date(ticket.createdAt).toLocaleString()} •{' '}
                <strong>Status:</strong> {ticket.status.toUpperCase()}
              </div>

              <div className="flex gap-2 mb-2">
                {VALID_STATUSES.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(ticket, status)}
                    className="px-2 py-1 text-xs rounded border hover:shadow"
                  >
                    {status.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>

              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words mb-3">
                {JSON.stringify(ticket, null, 2)}
              </pre>

              <div className="mt-2">
                <h4 className="font-semibold mb-1 text-sm">💬 Notes</h4>
                <ul className="text-sm text-gray-700 space-y-1 mb-2">
                  {(ticket.notes || []).map((note, idx) => (
                    <li key={idx} className="border-l-2 pl-2 border-blue-400">
                      <strong>{note.sender}:</strong> {note.message} <em className="text-xs text-gray-500">({new Date(note.timestamp).toLocaleTimeString()})</em>
                    </li>
                  ))}
                </ul>
                <NoteForm ticket={ticket} onSubmit={handleAddNote} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NoteForm({ ticket, onSubmit }: { ticket: TicketWithNotes; onSubmit: (ticket: TicketWithNotes, text: string) => void }) {
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit(ticket, text);
        setText('');
      }}
      className="flex gap-2 mt-2"
    >
      <input
        type="text"
        className="flex-1 border rounded px-2 py-1 text-sm"
        placeholder="Add note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
}
    