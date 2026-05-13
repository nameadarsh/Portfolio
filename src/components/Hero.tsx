import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section 
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 0
      }}
    >
      <div 
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none'
        }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '1.5rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontWeight: 400
          }}
        >
          Hello, I'm
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient-accent"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            display: 'inline-block' // Ensure gradient applies fully
          }}
        >
          Adarsh Bajpai
        </motion.h1>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <span style={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: 400, letterSpacing: '0.02em' }}>AI & ML Engineer</span>
          <span style={{ opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: 400, letterSpacing: '0.02em' }}>Software Engineer</span>
        </motion.h3>
      </div>

      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20vh',
          background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      />
    </section>
  );
};

export default Hero;
