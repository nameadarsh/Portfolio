export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface StreamChunk {
  content?: string;
  error?: string;
  done?: boolean;
}
