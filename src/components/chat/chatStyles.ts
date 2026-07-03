import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

export const FAB_SIZE = 50;
export const FAB_GAP = '1rem';

export const FLOATING_STACK: CSSProperties = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
  gap: FAB_GAP,
  alignItems: 'flex-end',
};

export const FAB_GLASS: CSSProperties = {
  height: `${FAB_SIZE}px`,
  borderRadius: '100px',
  padding: '0 1.5rem',
  background: 'rgba(248, 249, 250, 0.1)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'var(--text-primary)',
  transition: 'background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.3s ease, box-shadow 0.35s ease',
  cursor: 'pointer',
  fontWeight: 600,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
};

export const FAB_CIRCLE: CSSProperties = {
  width: `${FAB_SIZE}px`,
  height: `${FAB_SIZE}px`,
  borderRadius: '50%',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-subtle)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-primary)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
};

export const fabGlassHover = (el: HTMLButtonElement) => {
  el.style.background = 'rgba(248, 249, 250, 0.98)';
  el.style.color = 'var(--bg-deep)';
  el.style.borderColor = 'rgba(255, 255, 255, 0.92)';
  el.style.transform = 'translateY(-5px)';
  el.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.25)';
};

export const fabGlassRest = (el: HTMLButtonElement) => {
  el.style.background = 'rgba(248, 249, 250, 0.1)';
  el.style.color = 'var(--text-primary)';
  el.style.borderColor = 'rgba(255, 255, 255, 0.22)';
  el.style.transform = 'translateY(0)';
  el.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
};

export const MORPH_TRANSITION = {
  duration: 0.44,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

export interface ShellDimensions {
  width: number;
  height: number;
  borderRadius: number;
}

function computeDimensions(isOpen: boolean): ShellDimensions {
  if (!isOpen) {
    return { width: FAB_SIZE, height: FAB_SIZE, borderRadius: FAB_SIZE / 2 };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const mobile = vw <= 768;
  const narrow = vw <= 480;

  if (narrow) {
    return {
      width: vw - 20,
      height: Math.min(vh - 160, vh * 0.78),
      borderRadius: 20,
    };
  }

  if (mobile) {
    return {
      width: vw - 32,
      height: Math.min(vh - 176, vh * 0.72),
      borderRadius: 20,
    };
  }

  return {
    width: Math.min(420, vw - 32),
    height: Math.min(560, vh - 192),
    borderRadius: 24,
  };
}

export function useChatShellDimensions(isOpen: boolean): ShellDimensions {
  const [dims, setDims] = useState(() => computeDimensions(isOpen));

  useEffect(() => {
    setDims(computeDimensions(isOpen));

    const onResize = () => setDims(computeDimensions(isOpen));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  return dims;
}
