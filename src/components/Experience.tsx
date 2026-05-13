import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const experiences = [
  {
    title: 'AI Engineer',
    company: 'Global Infoventures Pvt. Ltd.',
    date: 'Jan 2026 – Present',
    details: [
      'Developed a RAG pipeline for document querying and question answering with support for bilingual text. Implemented chunking strategies to preserve context and improve response quality.',
      'Contributed to the development of a scalable Learning Management System (LMS). Worked on a joint project with TCS serving ~2 lakh users across multiple universities. Contributed to scalable backend and AI integration workflows.'
    ]
  },
  {
    title: 'B.Tech in Computer Science (AI & ML)',
    company: 'NIIT University',
    date: 'Aug 2022 – May 2026',
    details: []
  },
  {
    title: 'High School Diploma, PCM',
    company: "St. Anselm's Pink City Sr. Sec. School",
    date: 'Aug 2008 – Apr 2022',
    details: []
  }
];

const Experience = () => {
  return (
    <section id="experience" className="container" style={{ padding: '15vh 5vw' }}>
      <SectionTitle>Experience & Education</SectionTitle>

      <div style={{ position: 'relative', paddingLeft: '2rem', maxWidth: '1000px' }}>
        {/* Intro text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '5rem', position: 'relative' }}
        >
          {/* Glowing dot for the intro */}
          <div style={{
            position: 'absolute',
            left: '-2.4rem',
            top: '0.6rem',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'var(--accent-cyan)',
            boxShadow: '0 0 20px var(--accent-cyan)'
          }} />
          
          <h3 
            className="hover-target"
            style={{ 
              fontSize: '2rem', 
              fontWeight: 600, 
              marginBottom: '0.5rem',
              color: 'var(--text-primary)',
              display: 'inline-block',
              transition: 'color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--accent-cyan)';
              e.currentTarget.style.transform = 'translateX(10px)';
              e.currentTarget.style.textShadow = '0 0 15px rgba(0, 245, 212, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.textShadow = 'none';
            }}
          >
            Hopefully You!
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            maxWidth: '600px',
            fontWeight: 300,
            letterSpacing: '0.5px'
          }}>
            Looking forward to the next opportunity to contribute, innovate, and grow.
          </p>
        </motion.div>

        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
          opacity: 0.3
        }} />

        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            style={{ marginBottom: '4rem', position: 'relative' }}
          >
            {/* Glowing dot */}
            <div style={{
              position: 'absolute',
              left: '-2.4rem',
              top: '0.6rem',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'var(--accent-cyan)',
              boxShadow: '0 0 20px var(--accent-cyan)'
            }} />
            
            <h3 
              className="hover-target"
              style={{ 
                fontSize: '2rem', 
                fontWeight: 600, 
                marginBottom: '0.5rem',
                display: 'inline-block',
                transition: 'color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = 'var(--accent-cyan)';
                e.currentTarget.style.transform = 'translateX(10px)';
                e.currentTarget.style.textShadow = '0 0 15px rgba(0, 245, 212, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {exp.title}
            </h3>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent-purple)', fontWeight: 500, fontSize: '1.1rem' }}>{exp.company}</span>
              <span>•</span>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{exp.date}</span>
            </div>
            
            {exp.details.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {exp.details.map((detail, idx) => (
                  <li key={idx} style={{ 
                    marginBottom: '0.8rem', 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    position: 'relative',
                    paddingLeft: '1.5rem',
                    fontSize: '1.05rem'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.7rem',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--border-subtle)'
                    }} />
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
