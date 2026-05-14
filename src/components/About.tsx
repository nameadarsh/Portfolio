import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiChevronDown, FiMail, FiLinkedin, FiGithub, FiCopy } from 'react-icons/fi';
import SectionTitle from './SectionTitle';
import { useContent } from '../hooks/useContent';
import { PROFILE } from '../constants/links';

const GLASS_CTA: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.2rem 2.5rem',
  borderRadius: '100px',
  fontSize: '1.1rem',
  fontWeight: 600,
  cursor: 'pointer',
  border: '1px solid rgba(255, 255, 255, 0.22)',
  background: 'rgba(248, 249, 250, 0.1)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  color: 'var(--text-primary)',
  transition: 'background 0.35s ease, border-color 0.35s ease, color 0.35s ease, transform 0.3s ease, box-shadow 0.35s ease',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
};

const glassCtaHover = (el: HTMLButtonElement) => {
  el.style.background = 'rgba(248, 249, 250, 0.98)';
  el.style.color = 'var(--bg-deep)';
  el.style.borderColor = 'rgba(255, 255, 255, 0.92)';
  el.style.transform = 'scale(1.05)';
  el.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.25)';
};

const glassCtaRest = (el: HTMLButtonElement) => {
  el.style.background = 'rgba(248, 249, 250, 0.1)';
  el.style.color = 'var(--text-primary)';
  el.style.borderColor = 'rgba(255, 255, 255, 0.22)';
  el.style.transform = 'scale(1)';
  el.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
};

const About = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedRow, setCopiedRow] = useState<string | null>(null);
  const { content } = useContent();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedRow(key);
      window.setTimeout(() => setCopiedRow(null), 1600);
    } catch {
      setCopiedRow(null);
    }
  };

  return (
    <motion.section 
      id="about" 
      className="container" 
      style={{ padding: '15vh 5vw', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ margin: '-100px', once: false }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <SectionTitle>About</SectionTitle>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Left: Premium Profile Image Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          <div style={{
            width: 'clamp(250px, 30vw, 400px)',
            height: 'clamp(250px, 30vw, 400px)',
            borderRadius: '50%',
            background: 'var(--bg-elevated)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden'
          }}>
            {/* Ambient glow behind image */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, var(--border-glow) 0%, transparent 70%)',
              opacity: 0.5
            }} />
            {/* Profile Image or Placeholder */}
            {content?.profileImage ? (
              <img 
                src={content.profileImage} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, borderRadius: '50%' }} 
              />
            ) : (
              <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', zIndex: 1 }}>Profile Image Placeholder</span>
            )}
          </div>
          

        </motion.div>

        {/* Right: Text and Resume */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              lineHeight: 1.8,
              fontWeight: 300,
              color: 'var(--text-primary)',
              marginBottom: '3rem',
              maxWidth: '600px'
            }}
          >
            AI Engineer and Software Developer building real-world machine learning systems and scalable AI applications from development to deployment. Skilled in <span className="text-gradient">AI systems, computer vision, NLP, RAG pipelines, backend engineering, API integration, and full-stack AI development</span>, with a focus on creating high-performance, reliable, scalable, and production-ready solutions with real-world impact.
          </motion.p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Contact Me Dropdown */}
            <div style={{ position: 'relative' }} ref={contactRef}>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onClick={() => { setIsContactOpen(!isContactOpen); setIsDropdownOpen(false); }}
                className="hover-target"
                style={GLASS_CTA}
                onMouseOver={(e) => glassCtaHover(e.currentTarget)}
                onMouseOut={(e) => glassCtaRest(e.currentTarget)}
              >
                Contact Me <FiChevronDown size={20} style={{ transform: isContactOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
              </motion.button>

              <AnimatePresence>
                {isContactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="glass"
                    style={{
                      position: 'absolute',
                      top: '110%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 'min(calc(100vw - 2rem), 440px)',
                      maxWidth: '90vw',
                      borderRadius: '16px',
                      padding: '0.5rem',
                      zIndex: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    {[
                      {
                        key: 'mail',
                        href: PROFILE.mailto,
                        external: false,
                        Icon: FiMail,
                        label: PROFILE.email,
                        copy: PROFILE.email,
                      },
                      {
                        key: 'linkedin',
                        href: PROFILE.linkedin,
                        external: true,
                        Icon: FiLinkedin,
                        label: PROFILE.linkedinDisplay,
                        copy: PROFILE.linkedin,
                      },
                      {
                        key: 'github',
                        href: PROFILE.github,
                        external: true,
                        Icon: FiGithub,
                        label: PROFILE.githubDisplay,
                        copy: PROFILE.github,
                      },
                    ].map((row) => (
                      <div
                        key={row.key}
                        className="hover-target"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.55rem 0.5rem',
                          borderRadius: '12px',
                          transition: 'background 0.25s ease',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <a
                          href={row.href}
                          {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                          className="hover-target"
                          style={{
                            flexShrink: 0,
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px',
                            color: 'var(--accent-cyan)',
                            transition: 'background 0.25s ease, color 0.25s ease',
                          }}
                          aria-label={row.key}
                        >
                          <row.Icon size={20} />
                        </a>
                        <a
                          href={row.href}
                          {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                          style={{
                            flex: 1,
                            minWidth: 0,
                            color: 'var(--text-primary)',
                            fontSize: '0.92rem',
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = 'var(--accent-cyan)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = 'var(--text-primary)';
                          }}
                        >
                          {row.label}
                        </a>
                        <button
                          type="button"
                          className="hover-target"
                          title="Copy"
                          onClick={(e) => {
                            e.stopPropagation();
                            void copyText(row.key, row.copy);
                          }}
                          style={{
                            flexShrink: 0,
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            border: '1px solid var(--border-subtle)',
                            background: 'rgba(255,255,255,0.04)',
                            color: copiedRow === row.key ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'color 0.2s ease, border-color 0.2s ease, background 0.2s ease',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0, 245, 212, 0.35)';
                            e.currentTarget.style.background = 'rgba(0, 245, 212, 0.08)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-subtle)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                          }}
                        >
                          <FiCopy size={18} />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume Dropdown */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsContactOpen(false); }}
                className="hover-target"
                style={GLASS_CTA}
                onMouseOver={(e) => glassCtaHover(e.currentTarget)}
                onMouseOut={(e) => glassCtaRest(e.currentTarget)}
              >
                <FiDownload size={20} /> Resume <FiChevronDown size={20} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
              </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="glass"
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    minWidth: '220px',
                    borderRadius: '16px',
                    padding: '0.5rem',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
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
                        style={{ padding: '1rem', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none', transition: 'background 0.3s', textTransform: 'capitalize' }} 
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} 
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                      >
                        {resume.type.toUpperCase()} Resume
                      </a>
                    ))
                  ) : (
                    <div style={{ padding: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No Resumes Found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
