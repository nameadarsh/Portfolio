import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { FiArrowUp, FiDownload } from 'react-icons/fi';
import { useContent } from '../hooks/useContent';
import { ChatWidget } from './chat/ChatWidget';
import { FAB_CIRCLE, FAB_GLASS, FLOATING_STACK, fabGlassHover, fabGlassRest } from './chat/chatStyles';

const FloatingActions = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const { content } = useContent();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setShowResume(latest > 0.9);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resumeRef.current && !resumeRef.current.contains(event.target as Node)) {
        setIsResumeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={FLOATING_STACK}>
      <ChatWidget />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="hover-target"
        title="Go back to the top"
        aria-label="Scroll to top"
        style={FAB_CIRCLE}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-purple)';
          e.currentTarget.style.color = 'var(--accent-purple)';
          e.currentTarget.style.transform = 'translateY(-5px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <FiArrowUp size={20} />
      </button>

      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ position: 'relative' }}
            ref={resumeRef}
          >
            <AnimatePresence>
              {isResumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="glass"
                  style={{
                    position: 'absolute',
                    bottom: '120%',
                    right: 0,
                    minWidth: '150px',
                    borderRadius: '16px',
                    padding: '0.5rem',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {content?.resumes?.length ? (
                    content.resumes.map((resume) => (
                      <a
                        key={resume.type}
                        href={resume.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover-target"
                        style={{
                          padding: '0.8rem',
                          borderRadius: '12px',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          transition: 'background 0.3s',
                          textTransform: 'capitalize',
                          fontSize: '0.9rem',
                          textAlign: 'center',
                          fontWeight: 600,
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {resume.type.toUpperCase()} Resume
                      </a>
                    ))
                  ) : (
                    <div style={{ padding: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>
                      No Resumes
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setIsResumeOpen(!isResumeOpen)}
              className="hover-target"
              style={FAB_GLASS}
              onMouseOver={(e) => fabGlassHover(e.currentTarget)}
              onMouseOut={(e) => fabGlassRest(e.currentTarget)}
            >
              Resume <FiDownload size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
