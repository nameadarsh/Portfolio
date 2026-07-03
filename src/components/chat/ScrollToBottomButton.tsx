import { FiChevronDown } from 'react-icons/fi';

interface ScrollToBottomButtonProps {
  visible: boolean;
  onClick: () => void;
}

export function ScrollToBottomButton({ visible, onClick }: ScrollToBottomButtonProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      className="hover-target chat-scroll-bottom-btn"
      aria-label="Scroll to latest messages"
      onClick={onClick}
    >
      <FiChevronDown size={18} />
    </button>
  );
}
