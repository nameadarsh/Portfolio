import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { useContent } from '../hooks/useContent';

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { content } = useContent();
  const projects = content?.projects || [];

  // Reset scroll on reload
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
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  return (
    <section id="projects" style={{ padding: '15vh 0', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <SectionTitle style={{ marginBottom: 0 }}>Projects</SectionTitle>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            className="hover-target"
            onClick={() => navigate('/projects')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', 
              color: 'var(--text-primary)', padding: '0.8rem 1.5rem', borderRadius: '100px',
              cursor: 'pointer', fontSize: '1rem', fontWeight: 500, transition: 'all 0.3s ease',
              marginRight: '1rem'
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
            className="hover-target"
            onClick={() => scroll('left')}
            disabled={scrollProgress <= 0.01}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: scrollProgress <= 0.01 ? 'not-allowed' : 'pointer',
              opacity: scrollProgress <= 0.01 ? 0.5 : 1,
              transition: 'background 0.3s'
            }}
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            className="hover-target"
            onClick={() => scroll('right')}
            disabled={scrollProgress >= 0.99}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: scrollProgress >= 0.99 ? 'not-allowed' : 'pointer',
              opacity: scrollProgress >= 0.99 ? 0.5 : 1,
              transition: 'background 0.3s'
            }}
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          gap: '3rem',
          padding: '0 5vw 4rem 0',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          msOverflowStyle: 'none', // Hide scrollbar for IE
        }}
      >
        {projects.map((project, index) => (
          <div 
            key={index}
            style={{
              minWidth: 'clamp(320px, 48vw, 600px)',
              scrollSnapAlign: 'start',
              flexShrink: 0,
              marginLeft: index === 0 ? '5vw' : '0'
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="hover-target"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-elevated)',
                borderRadius: '24px',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                transition: 'transform 0.4s ease, border-color 0.4s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Abstract Visual Header */}
              <div style={{ height: '250px', background: 'var(--bg-deep)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'radial-gradient(circle at center, var(--border-glow) 0%, transparent 70%)' }} />
                    <div style={{ fontSize: '6rem', opacity: 0.05, fontWeight: 800 }}>0{index + 1}</div>
                  </>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '3rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {project.category}
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                  {project.name}
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', flexGrow: 1 }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' }}>
                  {project.tools.map(tool => (
                    <span key={tool} style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                      {tool}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'auto' }}>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-cyan)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                    <FiGithub size={20} /> Code
                  </a>
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
