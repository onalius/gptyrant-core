export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

export interface Settings {
  apiKey: string;
  model: string;
  sassLevel: number;
  focusAreas: string[];
}
