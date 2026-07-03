import { forwardRef, useMemo } from 'react';
import type { ChatMessage as ChatMessageType } from '../../lib/chat/types';
import { useChatScroll } from '../../hooks/useChatScroll';
import { ChatMessage } from './ChatMessage';
import { ScrollToBottomButton } from './ScrollToBottomButton';
import { SuggestedPrompts } from './SuggestedPrompts';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  showSuggestions: boolean;
  suggestedPrompts: readonly string[];
  onSelectPrompt: (prompt: string) => void;
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(function ChatMessages(
  {
    messages,
    isLoading,
    showSuggestions,
    suggestedPrompts,
    onSelectPrompt,
  },
  forwardedRef,
) {
  const lastMessage = messages[messages.length - 1];
  const streamingContent = lastMessage?.role === 'assistant' ? lastMessage.content : '';
  const isStreamingEmpty = isLoading && lastMessage?.role === 'assistant' && !streamingContent;

  const scrollWatch = useMemo(
    () => [messages.length, streamingContent, isLoading, showSuggestions],
    [messages.length, streamingContent, isLoading, showSuggestions],
  );

  const { containerRef, handleScroll, scrollToBottom, showScrollButton } = useChatScroll({
    watch: scrollWatch,
  });

  const setContainerRef = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const handlePromptSelect = (prompt: string) => {
    scrollToBottom('smooth');
    void onSelectPrompt(prompt);
  };

  return (
    <div className="chat-messages-wrapper">
      <div
        ref={setContainerRef}
        className="chat-messages"
        data-lenis-prevent=""
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        onScroll={handleScroll}
      >
        {showSuggestions && (
          <SuggestedPrompts
            prompts={suggestedPrompts}
            onSelect={handlePromptSelect}
            disabled={isLoading}
          />
        )}

        {messages.map((message) => {
          const isStreamingPlaceholder =
            isLoading && message.id === lastMessage?.id && message.role === 'assistant' && !message.content;

          if (isStreamingPlaceholder) return null;

          return (
            <ChatMessage
              key={message.id}
              role={message.role as 'user' | 'assistant'}
              content={message.content}
            />
          );
        })}

        {isStreamingEmpty && (
          <div className="chat-message-row chat-message-row--assistant">
            <div className="chat-bubble chat-bubble--assistant chat-bubble--typing">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      <ScrollToBottomButton visible={showScrollButton} onClick={() => scrollToBottom('smooth')} />
    </div>
  );
});
