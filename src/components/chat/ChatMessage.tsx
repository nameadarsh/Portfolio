import { ChatMarkdown } from '../../lib/chat/markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`chat-message-row ${isUser ? 'chat-message-row--user' : 'chat-message-row--assistant'}`}>
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--assistant'}`}>
        {isUser ? (
          <p className="chat-bubble-text">{content}</p>
        ) : content ? (
          <ChatMarkdown content={content} />
        ) : null}
      </div>
    </div>
  );
}
