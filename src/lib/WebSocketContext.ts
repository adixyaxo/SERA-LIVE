import React, { createContext, useContext, useEffect, useRef } from 'react';
import { createWebSocket } from '@/lib/api-client';

interface WebSocketContextType {
  sendMessage: (message: any) => void;
  connected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = React.useState(false);

  useEffect(() => {
    ws.current = createWebSocket('/');
    
    ws.current.onopen = () => {
      setConnected(true);
    };

    ws.current.onclose = () => {
      setConnected(false);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle incoming messages
      console.log('Received:', data);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return React.createElement(
    WebSocketContext.Provider,
    { value: { sendMessage, connected } },
    children
  );
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }
  return context;
};