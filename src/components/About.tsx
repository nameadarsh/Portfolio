import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiChevronDown, FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import SectionTitle from './SectionTitle';
import { useContent } from '../hooks/useContent';

const About = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onClick={() => { setIsContactOpen(!isContactOpen); setIsDropdownOpen(false); }}
                className="hover-target"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem 2.5rem',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '100px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = 'var(--accent-cyan)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
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
                    <a href="mailto:adarsh@example.com" className="hover-target" style={{ padding: '1rem', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none', transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}><FiMail size={18} /> adarsh@example.com</a>
                    <a href="#" className="hover-target" style={{ padding: '1rem', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none', transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}><FiLinkedin size={18} /> LinkedIn</a>
                    <a href="#" className="hover-target" style={{ padding: '1rem', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none', transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}><FiGithub size={18} /> GitHub</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resume Dropdown */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsContactOpen(false); }}
                className="hover-target"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem 2.5rem',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-deep)',
                  border: 'none',
                  borderRadius: '100px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
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
