import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiDownload, FiGithub, FiExternalLink } from 'react-icons/fi';
import Lenis from 'lenis';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
import { useContent } from './hooks/useContent';
import './App.css';

const AllProjects = () => {
  const navigate = useNavigate();
  const { content } = useContent();
  const projectsData = content?.projects || [];

  return (
    <div className="container" style={{ paddingTop: '15vh', paddingBottom: '10vh' }}>
      <button onClick={() => navigate('/')} className="hover-target" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '3rem', fontSize: '1.1rem' }}>
        <FiArrowLeft /> Back to Home
      </button>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '4rem' }}>
        All <span className="text-gradient-accent">Projects</span>
      </motion.h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass"
            style={{ padding: '3rem', borderRadius: '24px' }}
          >
            <div style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {project.category}
            </div>
            
            {project.thumbnail && (
              <img src={project.thumbnail} alt={project.name} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem' }} />
            )}
            
            <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.5rem' }}>{project.name}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px', whiteSpace: 'pre-line' }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' }}>
              {project.tools.map(tool => (
                <span key={tool} style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontFamily: 'monospace' }}>{tool}</span>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-target"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}
                >
                  <FiGithub /> GitHub
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-target"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}
                >
                  <FiExternalLink /> Live App
                </a>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CertificateViewer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { content } = useContent();
  const certificate = content?.certificates.find((c) => c.id === id);
  const [pdfReady, setPdfReady] = useState(false);

  useEffect(() => {
    setPdfReady(false);
  }, [id, certificate?.pdf]);

  const pdfSrc = certificate?.pdf ? `${certificate.pdf}#toolbar=1` : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-deep)', flexWrap: 'wrap', gap: '1rem' }}>
        <button type="button" onClick={() => navigate(-1)} className="hover-target" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1.1rem' }}>
          <FiArrowLeft /> Back
        </button>
        {certificate?.pdf ? (
          <a href={certificate.pdf} download className="hover-target" style={{ background: 'var(--text-primary)', color: 'var(--bg-deep)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }}>
            <FiDownload /> Download PDF
          </a>
        ) : (
          <button type="button" disabled style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'not-allowed', fontWeight: 600 }}>
            <FiDownload /> No PDF Available
          </button>
        )}
      </div>
      <div style={{ flexGrow: 1, padding: 'clamp(1.5rem, 4vw, 4rem) max(5vw, 1rem)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div className="glass" style={{ width: '100%', maxWidth: '960px', borderRadius: '32px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 3vw, 3rem)', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: 'var(--text-primary)' }}>{certificate?.title}</h2>
          <p style={{ color: 'var(--accent-cyan)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '1.75rem', fontWeight: 500, textAlign: 'center' }}>{certificate?.issuer}</p>

          {pdfSrc ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                minHeight: 'min(72vh, 720px)',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '2rem',
              }}
            >
              {!pdfReady && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    background: 'linear-gradient(145deg, var(--bg-elevated), var(--bg-deep))',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '2px solid rgba(0, 245, 212, 0.25)',
                      borderTopColor: 'var(--accent-cyan)',
                      animation: 'spin 0.9s linear infinite',
                    }}
                  />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Loading certificate…</span>
                </div>
              )}
              <iframe title={certificate?.title ?? 'Certificate PDF'} src={pdfSrc} style={{ width: '100%', height: 'min(72vh, 720px)', border: 'none', display: 'block', opacity: pdfReady ? 1 : 0, transition: 'opacity 0.45s ease' }} onLoad={() => setPdfReady(true)} />
            </div>
          ) : certificate?.thumbnail ? (
            <img src={certificate.thumbnail} alt={certificate.title} style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '16px', marginBottom: '2rem' }} />
          ) : (
            <div style={{ minHeight: '28vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)', width: '100%', borderRadius: '16px', marginBottom: '2rem', border: '1px dashed var(--border-subtle)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>No preview available</span>
            </div>
          )}

          {certificate?.details && certificate.details.length > 0 && (
            <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {certificate.details.map((detail, idx) => (
                  <li key={idx} style={{ color: 'var(--text-secondary)', lineHeight: 1.6, position: 'relative', paddingLeft: '1.5rem', fontSize: '1.05rem' }}>
                    <span style={{ position: 'absolute', left: 0, top: '0.7rem', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <GlobalBackground />
      <CustomCursor />
      
      {/* Only show Navbar on Home page, or adjust to be sticky across all */}
      {location.pathname === '/' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/certificate/:id" element={<CertificateViewer />} />
      </Routes>
    </>
  );
}

export default App;
