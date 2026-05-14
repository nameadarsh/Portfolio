import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiChevronLeft, FiChevronRight, FiGrid, FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { useContent } from '../hooks/useContent';

const SECTION_H_INSET = 'clamp(1rem, 3vw, 2rem)';
const CARD_MIN = 'clamp(280px, 36vw, 460px)';

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { content } = useContent();
  const projects = content?.projects || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
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
      id="projects"
      style={{
        paddingTop: '15vh',
        paddingBottom: '15vh',
        paddingLeft: SECTION_H_INSET,
        paddingRight: SECTION_H_INSET,
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <SectionTitle style={{ marginBottom: 0 }}>Projects</SectionTitle>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            type="button"
            className="hover-target"
            onClick={() => navigate('/projects')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '0.8rem 1.5rem',
              borderRadius: '100px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              marginRight: '1rem',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.background = 'rgba(0, 245, 212, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <FiGrid size={20} /> <span style={{ display: 'none' }} className="show-on-desktop">See All Projects</span>
          </button>

          <button
            type="button"
            className="hover-target"
            onClick={() => scroll('left')}
            disabled={scrollProgress <= 0.01}
            style={{
              width: '48px',
              height: '48px',
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
            <FiChevronLeft size={24} />
          </button>
          <button
            type="button"
            className="hover-target"
            onClick={() => scroll('right')}
            disabled={scrollProgress >= 0.99}
            style={{
              width: '48px',
              height: '48px',
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
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="carousel-track"
        onScroll={handleScroll}
        style={{
          display: 'flex',
          gap: '2.25rem',
          padding: `0 max(5vw, 1rem) 4rem max(5vw, 1rem)`,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            style={{
              minWidth: CARD_MIN,
              maxWidth: CARD_MIN,
              scrollSnapAlign: 'start',
              flexShrink: 0,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: Math.min(index * 0.1, 0.4) }}
              className="hover-target"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-elevated)',
                borderRadius: '24px',
                border: project.featured ? '1px solid rgba(0, 245, 212, 0.35)' : '1px solid var(--border-subtle)',
                overflow: 'hidden',
                transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                boxShadow: project.featured ? '0 24px 60px rgba(0, 245, 212, 0.08)' : undefined,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = project.featured ? 'rgba(0, 245, 212, 0.35)' : 'var(--border-subtle)';
              }}
            >
              <div
                style={{
                  height: '250px',
                  background: 'var(--bg-deep)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.3,
                        background: 'radial-gradient(circle at center, var(--border-glow) 0%, transparent 70%)',
                      }}
                    />
                    <div style={{ fontSize: '6rem', opacity: 0.05, fontWeight: 800 }}>0{index + 1}</div>
                  </>
                )}
                {project.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: 'rgba(0, 0, 0, 0.55)',
                      border: '1px solid rgba(0, 245, 212, 0.45)',
                      color: 'var(--accent-cyan)',
                    }}
                  >
                    Featured
                  </div>
                )}
              </div>

              <div style={{ padding: '2.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    color: 'var(--accent-purple)',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.category}
                </div>
                <h3 style={{ fontSize: 'clamp(1.35rem, 2.2vw, 2rem)', fontWeight: 600, marginBottom: '1.25rem', lineHeight: 1.2 }}>
                  {project.name}
                </h3>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '1.75rem',
                    flexGrow: 1,
                    whiteSpace: 'pre-line',
                    fontSize: '0.98rem',
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.75rem' }}>
                  {project.tools.map((tool) => (
                    <span key={tool} style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem', fontFamily: 'monospace' }}>
                      {tool}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', marginTop: 'auto' }}>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover-target"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-primary)',
                        transition: 'color 0.3s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--accent-cyan)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      <FiGithub size={20} /> GitHub
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover-target"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-primary)',
                        transition: 'color 0.3s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--accent-cyan)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      <FiExternalLink size={20} /> Live App
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
