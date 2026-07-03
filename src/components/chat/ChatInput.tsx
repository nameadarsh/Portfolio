import { forwardRef, useImperativeHandle, useRef, type KeyboardEvent } from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(function ChatInput(
  { onSend, disabled },
  ref,
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  const handleSend = () => {
    const value = textareaRef.current?.value ?? '';
    if (!value.trim() || disabled) return;
    onSend(value);
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className="chat-input-area">
      <textarea
        ref={textareaRef}
        className="chat-input"
        data-lenis-prevent=""
        placeholder="Ask me anything..."
        rows={1}
        disabled={disabled}
        aria-label="Message input"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      <button
        type="button"
        className="hover-target chat-send-btn"
        aria-label="Send message"
        disabled={disabled}
        onClick={handleSend}
      >
        <FiSend size={18} />
      </button>
    </div>
  );
});
