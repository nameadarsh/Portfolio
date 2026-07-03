import { FiX } from 'react-icons/fi';

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <div>
        <p className="chat-header-eyebrow">Let&apos;s Talk</p>
        <h2 className="chat-header-title">
          Happy to chat! Ask me about my work, projects, or anything you&apos;re curious about.
        </h2>
      </div>
      <button
        type="button"
        className="hover-target chat-close-btn"
        aria-label="Close chat"
        onClick={onClose}
      >
        <FiX size={20} />
      </button>
    </div>
  );
}
