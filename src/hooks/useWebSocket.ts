// ✅ /hooks/useWebSocket.ts
'use client';

import { useEffect, useRef } from 'react';

interface WebSocketMessage {
  event: string;
  data: unknown;
}

const useWebSocket = (url: string) => {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    socket.current = ws;

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url]);

  const sendMessage = (message: WebSocketMessage): void => {
    const currentSocket = socket.current;
    if (currentSocket?.readyState === WebSocket.OPEN) {
      currentSocket.send(JSON.stringify(message));

      if (message.event === 'new_ticket') {
        try {
          const existing = JSON.parse(localStorage.getItem('allTickets') || '[]');
          localStorage.setItem(
            'allTickets',
            JSON.stringify([message.data, ...existing])
          );
        } catch (err) {
          console.error('Error saving to localStorage:', err);
        }
      }
    } else {
      console.warn('WebSocket is not open or not initialized.');
    }
  };

  return { socket, sendMessage };
};

export default useWebSocket;