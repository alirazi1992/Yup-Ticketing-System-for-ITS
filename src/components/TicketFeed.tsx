'use client';

import { useEffect, useState } from 'react';
import useWebSocket from '@/hooks/useWebSocket';
import {
  TicketType,
  SoftwareFields,
  HardwareFields,
  NetworkFields,
  OtherFields,
} from '@/types/ticket';

type TicketData =
  | (SoftwareFields & { type: TicketType; createdAt: string })
  | (HardwareFields & { type: TicketType; createdAt: string })
  | (NetworkFields & { type: TicketType; createdAt: string })
  | (OtherFields & { type: TicketType; createdAt: string });

export default function TicketFeed() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const { socket } = useWebSocket('ws://localhost:3001'); // ✅ FIXED: only 1 argument

  useEffect(() => {
    if (!socket?.current) return;

    const ws = socket.current;

    ws.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        if (message.event === 'new_ticket') {
          setTickets((prev) => [message.data, ...prev]);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    return () => {
      ws.onmessage = null;
    };
  }, [socket]);

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4">📥 Live Ticket Feed</h3>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets received yet...</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket, index) => (
            <li
              key={index}
              className="p-4 rounded border bg-white shadow-sm hover:bg-gray-50 transition"
            >
              <div className="text-sm text-gray-600 mb-1">
                <strong>Type:</strong> {ticket.type} •{' '}
                <strong>Time:</strong>{' '}
                {new Date(ticket.createdAt).toLocaleString()}
              </div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words">
                {JSON.stringify(ticket, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
