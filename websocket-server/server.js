// websocket-server/server.js
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('🔌 New client connected');

  // Welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Welcome to the WebSocket Ticket Server 🎉'
  }));

  // Message listener
  ws.on('message', (data) => {
    console.log('📨 Received:', data.toString());

    // Broadcast to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

console.log('✅ WebSocket server running at ws://localhost:3001');
