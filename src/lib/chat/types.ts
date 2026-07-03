export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface StreamChunk {
  content?: string;
  error?: string;
  done?: boolean;
}

/** API payload shape — ids stripped before sending */
export interface ApiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const SUGGESTED_PROMPTS = [
  'Tell me about yourself',
  'Tell me about your projects',
  'Tell me about your internship',
  'Explain Clarity',
  'What are you currently learning?',
] as const;

/** Recent turns kept for follow-up context (e.g. "What was the biggest challenge?") */
export const MAX_CONTEXT_MESSAGES = 24;

export function toApiMessages(messages: ChatMessage[]): ApiChatMessage[] {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .filter((m) => m.content.trim().length > 0)
    .map(({ role, content }) => ({
      role: role as 'user' | 'assistant',
      content: content.trim(),
    }));
}

let messageCounter = 0;

export function createMessageId(): string {
  messageCounter += 1;
  return `msg-${messageCounter}-${Date.now()}`;
}
