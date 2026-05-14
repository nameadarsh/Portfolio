import { motion } from 'framer-motion';

const Navbar = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        zIndex: 100,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 100%)',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px' }}>
        <span className="text-gradient-accent">Adarsh Bajpai</span>
      </div>
      
      <div style={{ display: 'flex', gap: '30px', fontSize: '16px', fontWeight: 600, letterSpacing: '0.5px' }}>
        {['About', 'Skills', 'Experience', 'Projects', 'Certificates'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase())}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {item}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
