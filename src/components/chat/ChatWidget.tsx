import { motion } from 'framer-motion';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { MORPH_TRANSITION, useChatShellDimensions } from './chatStyles';

const ChatPanel = lazy(() =>
  import('./ChatPanel').then((mod) => ({ default: mod.ChatPanel })),
);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activated, setActivated] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const dims = useChatShellDimensions(isOpen);

  const open = useCallback(() => {
    setActivated(true);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) {
      shellRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  return (
    <motion.div
      ref={shellRef}
      className={`chat-shell liquid-glass ${isOpen ? 'chat-shell--open' : 'chat-shell--collapsed'}`}
      data-lenis-prevent={isOpen ? '' : undefined}
      tabIndex={isOpen ? -1 : undefined}
      role={isOpen ? 'dialog' : undefined}
      aria-modal={isOpen ? true : undefined}
      aria-label={isOpen ? 'Chat with Adarsh Bajpai' : undefined}
      initial={false}
      animate={{
        width: dims.width,
        height: dims.height,
        borderRadius: dims.borderRadius,
        filter: isOpen ? 'blur(0px)' : 'blur(0px)',
      }}
      transition={MORPH_TRANSITION}
      style={{ transformOrigin: 'bottom right' }}
    >
      {/* Collapsed trigger crossfades out as shell expands */}
      <motion.button
        type="button"
        className="chat-shell-trigger hover-target"
        aria-label="Open chat with Adarsh"
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.88 : 1,
          filter: isOpen ? 'blur(4px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.22, ease: MORPH_TRANSITION.ease }}
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
        onClick={open}
        whileHover={isOpen ? undefined : { scale: 1.06 }}
        whileTap={isOpen ? undefined : { scale: 0.96 }}
      >
        <FiMessageCircle size={20} />
      </motion.button>

      {/* Expanded panel crossfades in; lazy-loaded on first open */}
      {activated && (
        <motion.div
          className="chat-shell-panel"
          data-lenis-prevent=""
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.96,
            filter: isOpen ? 'blur(0px)' : 'blur(8px)',
          }}
          transition={{
            duration: 0.28,
            delay: isOpen ? 0.14 : 0,
            ease: MORPH_TRANSITION.ease,
          }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          aria-hidden={!isOpen}
        >
          <Suspense fallback={null}>
            <ChatPanel onClose={close} isVisible={isOpen} />
          </Suspense>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ChatWidget;
