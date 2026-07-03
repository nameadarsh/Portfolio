import { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import { useScrollContainment } from '../../hooks/useScrollContainment';
import { SUGGESTED_PROMPTS } from '../../lib/chat/types';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';

interface ChatPanelProps {
  onClose: () => void;
  isVisible: boolean;
}

export function ChatPanel({ onClose, isVisible }: ChatPanelProps) {
  const { messages, isLoading, error, hasUserMessage, sendMessage, clearError } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);

  useScrollContainment(messagesScrollRef, panelRef, isVisible);

  useEffect(() => {
    if (isVisible) {
      window.setTimeout(() => inputRef.current?.focus(), 320);
    }
  }, [isVisible]);

  const handleSend = (text: string) => {
    void sendMessage(text);
  };

  return (
    <div ref={panelRef} className="chat-panel" data-lenis-prevent="">
      <ChatHeader onClose={onClose} />

      <div className="chat-body">
        {error && (
          <div className="chat-error" role="alert">
            <span>{error}</span>
            <button type="button" className="chat-error-dismiss" onClick={clearError}>
              Dismiss
            </button>
          </div>
        )}

        <ChatMessages
          ref={messagesScrollRef}
          messages={messages}
          isLoading={isLoading}
          showSuggestions={!hasUserMessage}
          suggestedPrompts={SUGGESTED_PROMPTS}
          onSelectPrompt={sendMessage}
        />
      </div>

      <ChatInput ref={inputRef} onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
