import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { useContent } from '../hooks/useContent';

const SECTION_H_INSET = 'clamp(1rem, 3vw, 2rem)';

const Certificates = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { content } = useContent();
  const certificates = content?.certificates || [];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const max = scrollWidth - clientWidth;
      setScrollProgress(max > 0 ? scrollLeft / max : 0);
    }
  };

  return (
    <section
      id="certificates"
      style={{
        paddingTop: '10vh',
        paddingBottom: '15vh',
        paddingLeft: SECTION_H_INSET,
        paddingRight: SECTION_H_INSET,
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <SectionTitle style={{ marginBottom: 0 }}>Certifications</SectionTitle>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            type="button"
            className="hover-target"
            onClick={() => scroll('left')}
            disabled={scrollProgress <= 0.01}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: scrollProgress <= 0.01 ? 'not-allowed' : 'pointer',
              opacity: scrollProgress <= 0.01 ? 0.5 : 1,
              transition: 'background 0.3s',
            }}
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="hover-target"
            onClick={() => scroll('right')}
            disabled={scrollProgress >= 0.99}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: scrollProgress >= 0.99 ? 'not-allowed' : 'pointer',
              opacity: scrollProgress >= 0.99 ? 0.5 : 1,
              transition: 'background 0.3s',
            }}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="carousel-track"
        onScroll={handleScroll}
        style={{
          display: 'flex',
          gap: '2rem',
          padding: `0 max(5vw, 1rem) 2rem max(5vw, 1rem)`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {certificates.map((cert, index) => (
          <div
            key={cert.id || index}
            style={{
              minWidth: 'clamp(300px, 45vw, 550px)',
              width: 'clamp(300px, 45vw, 550px)',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              display: 'flex',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(`/certificate/${cert.id}`)}
              className="hover-target glass"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '2.5rem',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'transform 0.4s ease, border-color 0.4s ease, background 0.4s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
                e.currentTarget.style.background = 'rgba(157, 78, 221, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.background = 'rgba(10, 10, 10, 0.5)';
              }}
            >
              <div style={{ color: 'var(--accent-purple)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                <FiFileText size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3, flexShrink: 0 }}>
                {cert.title}
              </h3>
              <div style={{ color: 'var(--accent-cyan)', fontSize: '1rem', fontWeight: 500, marginBottom: '1.5rem', flexShrink: 0 }}>
                {cert.issuer}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {cert.details.map((detail, idx) => (
                  <li
                    key={idx}
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      position: 'relative',
                      paddingLeft: '1.2rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.5rem',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--border-subtle)',
                      }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
