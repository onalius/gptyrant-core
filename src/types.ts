export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string | MessageContent[];
}

export type MessageContent = {
  type: 'text';
  text: string;
} | {
  type: 'image_url';
  image_url: {
    url: string;
  };
};

export type ProviderType = 'openai' | 'anthropic' | 'grok' | 'vertex';

export interface TyrantOptions {
  sassLevel: number;
  focusAreas: string[];
  temperature?: number;
  maxTokens?: number;
  provider?: ProviderType;
  model?: string;
}

export interface ProviderConfig {
  apiKey: string;
  model?: string;
  baseUrl?: string;
  organization?: string;
}

export interface AIProvider {
  generateCompletion(messages: Message[], options: TyrantOptions): Promise<string>;
  getSystemPrompt(options: TyrantOptions): Message;
}