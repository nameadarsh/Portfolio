import { useEffect, type RefObject } from 'react';

function canScrollY(el: HTMLElement, deltaY: number): boolean {
  const { scrollTop, scrollHeight, clientHeight } = el;
  if (scrollHeight <= clientHeight) return false;
  if (deltaY < 0) return scrollTop > 0;
  if (deltaY > 0) return scrollTop + clientHeight < scrollHeight - 1;
  return false;
}

/**
 * Keeps wheel / trackpad scroll inside the chat panel.
 * Lenis listens on window; this runs in capture phase first and blocks
 * page scroll whenever the pointer is over the open chat.
 */
export function useScrollContainment(
  scrollRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const panelEl = panelRef.current;
    if (!scrollEl || !panelEl || !active) return;

    const handleWheel = (event: WheelEvent) => {
      if (!panelEl.contains(event.target as Node)) return;

      event.stopPropagation();

      const target = event.target as HTMLElement;
      const nativeScrollParent = target.closest(
        'textarea, input, [data-native-scroll]',
      ) as HTMLElement | null;

      if (
        nativeScrollParent &&
        nativeScrollParent !== scrollEl &&
        nativeScrollParent.scrollHeight > nativeScrollParent.clientHeight
      ) {
        const { scrollTop, scrollHeight, clientHeight } = nativeScrollParent;
        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const scrollingUp = event.deltaY < 0;
        const scrollingDown = event.deltaY > 0;

        if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
          event.preventDefault();
          scrollEl.scrollTop += event.deltaY;
        }
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const scrollingUp = event.deltaY < 0;
      const scrollingDown = event.deltaY > 0;

      if (canScrollY(scrollEl, event.deltaY)) {
        event.preventDefault();
        scrollEl.scrollTop += event.deltaY;
        return;
      }

      if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [scrollRef, panelRef, active]);
}
