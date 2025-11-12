// src/lib/api.ts
const API_BASE_URL = 'http://localhost:8000/api';

export interface Card {
  card_id: string;
  type: 'schedule' | 'reschedule' | 'cancel' | 'reminder' | 'task';
  title: string;
  description: string;
  primary_action: {
    event_title: string;
    start_time: string;
    end_time: string;
    duration_minutes: number;
    location?: string;
    participants?: string[];
    notes?: string;
  };
  alternatives: Array<{
    start_time: string;
    end_time: string;
    reason: string;
  }>;
  confidence: number;
  metadata: {
    urgency: 'high' | 'medium' | 'low';
    flexibility: 'flexible' | 'fixed';
    priority: 'high' | 'medium' | 'low';
  };
  created_at: string;
  status: 'pending' | 'accepted' | 'rejected' | 'modified';
  user_id: string;
}

export interface CaptureTextResponse {
  session_id: string;
  cards: Card[];
  status: string;
  user_id: string;
  timestamp: string;
}

export interface CardActionRequest {
  action: 'accept' | 'reject' | 'modify' | 'snooze';
  modifications?: any;
  user_id: string;
}

export interface CardActionResponse {
  card_id: string;
  status: string;
  result: any;
  modifications?: any;
  success: boolean;
  timestamp: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async captureText(text: string, userId: string = 'default_user'): Promise<CaptureTextResponse> {
    const response = await fetch(`${this.baseUrl}/capture/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  async handleCardAction(cardId: string, action: CardActionRequest): Promise<CardActionResponse> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserCards(userId: string = 'default_user'): Promise<{ cards: Card[] }> {
    const response = await fetch(`${this.baseUrl}/user/${userId}/cards`);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  async healthCheck(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }
}

export const apiService = new ApiService();