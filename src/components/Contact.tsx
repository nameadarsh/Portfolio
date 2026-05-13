import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiShare2, FiCheck, FiArrowUp, FiDownload } from 'react-icons/fi';
import { useContent } from '../hooks/useContent';

const Contact = () => {
  const [copied, setCopied] = useState(false);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = async () => {
    const text = `Adarsh Bajpai - AI/ML Engineer\n\nCrafting intelligent systems, scalable applications, and impactful digital experiences.\n\nhttps://adarshbajpai.com`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      <footer id="contact" style={{ 
        padding: '10vh 5vw 10vh 5vw',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at bottom, rgba(157, 78, 221, 0.1) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 800,
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-1px'
            }}
          >
            Get in touch
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.2rem',
              maxWidth: '500px',
              marginBottom: '3rem',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Feel free to reach out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <a href="mailto:adarsh@example.com" className="hover-target" style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FiMail size={24} />
            </a>
            <a href="#" className="hover-target" style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FiLinkedin size={24} />
            </a>
            <a href="#" className="hover-target" style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FiGithub size={24} />
            </a>

            <button onClick={handleShare} className="hover-target" style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
              transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.color = 'var(--accent-purple)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {copied ? <FiCheck size={24} color="var(--accent-cyan)" /> : <FiShare2 size={24} />}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: copied ? 1 : 0, y: copied ? -40 : 10 }}
                style={{
                  position: 'absolute', top: 0, background: 'var(--accent-cyan)', color: 'var(--bg-deep)',
                  padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, pointerEvents: 'none', whiteSpace: 'nowrap'
                }}
              >
                Copied!
              </motion.div>
            </button>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50, display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        
        {/* Resume Button */}
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
                    position: 'absolute', bottom: '120%', right: 0, minWidth: '150px',
                    borderRadius: '16px', padding: '0.5rem', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '0.5rem'
                  }}
                >
                  {content?.resumes?.length ? (
                    content.resumes.map((resume) => (
                      <a key={resume.type} href={resume.url} target="_blank" rel="noreferrer" className="hover-target" style={{ padding: '0.8rem', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none', transition: 'background 0.3s', textTransform: 'capitalize', fontSize: '0.9rem', textAlign: 'center', fontWeight: 600 }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        {resume.type.toUpperCase()} Resume
                      </a>
                    ))
                  ) : (
                    <div style={{ padding: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>No Resumes</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setIsResumeOpen(!isResumeOpen)} className="hover-target" style={{
              height: '50px', borderRadius: '100px', padding: '0 1.5rem',
              background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
              display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)',
              transition: 'all 0.3s ease', cursor: 'pointer', fontWeight: 600
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Resume <FiDownload size={18} />
            </button>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Scroll to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover-target group"
          title="Go back to the top"
          style={{
            width: '50px', height: '50px', borderRadius: '50%',
            background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
            transition: 'all 0.3s ease', cursor: 'pointer'
          }}
          onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.color = 'var(--accent-purple)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <FiArrowUp size={20} />
        </button>
      </div>
    </>
  );
};

export default Contact;

