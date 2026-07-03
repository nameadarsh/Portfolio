import { useCallback, useRef, useState } from 'react';
import type { ChatMessage } from '../lib/chat/types';
import {
  MAX_CONTEXT_MESSAGES,
  createMessageId,
  toApiMessages,
} from '../lib/chat/types';
import { consumeChatStream } from '../lib/chat/streamHandler';

export interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  hasUserMessage: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearError: () => void;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: trimmed,
    };

    let historyForApi: ChatMessage[] = [];

    setMessages((prev) => {
      historyForApi = [...prev, userMessage].slice(-MAX_CONTEXT_MESSAGES);
      return [
        ...historyForApi,
        { id: createMessageId(), role: 'assistant', content: '' },
      ];
    });

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: toApiMessages(historyForApi) }),
        signal: abortRef.current.signal,
      });

      let accumulated = '';

      await consumeChatStream(response, (chunk) => {
        accumulated += chunk;
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === 'assistant') {
            next[next.length - 1] = { ...last, content: accumulated };
          }
          return next;
        });
      });

      if (!accumulated.trim()) {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === 'assistant') {
            next[next.length - 1] = {
              ...last,
              content: "I'm having trouble forming a response right now. Could you try asking again?",
            };
          }
          return next;
        });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;

      const message =
        err instanceof Error ? err.message : 'Unable to reach the chat service. Please try again.';

      setError(message);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    error,
    hasUserMessage: messages.some((m) => m.role === 'user'),
    sendMessage,
    clearError,
  };
}
