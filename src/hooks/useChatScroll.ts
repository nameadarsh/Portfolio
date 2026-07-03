import { useCallback, useEffect, useRef, useState } from 'react';

const BOTTOM_THRESHOLD_PX = 72;

interface UseChatScrollOptions {
  /** Values that should trigger a scroll check (message content, loading state) */
  watch: unknown[];
}

export function useChatScroll({ watch }: UseChatScrollOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedToBottomRef = useRef(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const isNearBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return true;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distance <= BOTTOM_THRESHOLD_PX;
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    pinnedToBottomRef.current = true;
    setShowScrollButton(false);
  }, []);

  const handleScroll = useCallback(() => {
    const nearBottom = isNearBottom();
    pinnedToBottomRef.current = nearBottom;
    setShowScrollButton(!nearBottom);
  }, [isNearBottom]);

  useEffect(() => {
    if (pinnedToBottomRef.current) {
      scrollToBottom('auto');
    }
  }, watch);

  return {
    containerRef,
    handleScroll,
    scrollToBottom,
    showScrollButton,
  };
}
