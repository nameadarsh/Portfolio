import { motion } from 'framer-motion';

const SectionTitle = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6 }}
    className="hover-target"
    style={{
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      letterSpacing: '1px',
      marginBottom: '3rem',
      position: 'relative',
      display: 'inline-block',
      transition: 'color 0.3s ease, text-shadow 0.3s ease',
      ...style
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.color = 'var(--accent-purple)';
      e.currentTarget.style.textShadow = '0 0 20px var(--border-glow)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.color = 'var(--text-primary)';
      e.currentTarget.style.textShadow = 'none';
    }}
  >
    {children}
  </motion.h2>
);

export default SectionTitle;
