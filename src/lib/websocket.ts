// src/lib/websocket.ts
import { Card } from './api';

export type WebSocketMessage = 
  | { type: 'new_cards'; session_id: string; cards: Card[] }
  | { type: 'card_updated'; card_id: string; action: string; result: any }
  | { type: 'card_deleted'; card_id: string }
  | { type: 'current_cards'; cards: Card[] }
  | { type: 'pong'; timestamp: string };

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private userId: string;
  private messageHandlers: Map<string, ((data: any) => void)[]> = new Map();

  constructor(userId: string = 'default_user') {
    this.userId = userId;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`ws://localhost:8000/ws/${this.userId}`);
        
        this.ws.onopen = () => {
          console.log('✅ WebSocket connected');
          this.reconnectAttempts = 0;
          this.send({ type: 'subscribe_cards' });
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect().catch(() => {
          // Reconnection will be attempted again on next close
        });
      }, 2000 * this.reconnectAttempts); // Exponential backoff
    }
  }

  private handleMessage(message: WebSocketMessage) {
    const handlers = this.messageHandlers.get(message.type) || [];
    handlers.forEach(handler => handler(message));
  }

  on<T extends WebSocketMessage['type']>(
    type: T, 
    handler: (data: Extract<WebSocketMessage, { type: T }>) => void
  ) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }
    this.messageHandlers.get(type)!.push(handler as any);
  }

  send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  ping() {
    this.send({ type: 'ping' });
  }
}