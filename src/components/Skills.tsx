import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from './SectionTitle';

const skillCategories = [
  {
    title: 'Programming',
    skills: ['Python', 'JavaScript']
  },
  {
    title: 'Data Science & ML Libraries',
    skills: ['PyTorch', 'NumPy', 'Pandas', 'Matplotlib', 'OpenCV']
  },
  {
    title: 'AI & Machine Learning',
    skills: ['Machine Learning', 'CNNs', 'ResNet', 'U2-Net', 'Vision Transformers', 'RT-DETR', 'ByteTrack', 'NLP', 'RAG Pipelines', 'LLM Integration', 'Data Preprocessing', 'Feature Engineering']
  },
  {
    title: 'Web Frameworks & Development',
    skills: ['Flask', 'FastAPI', 'React', 'Node.js', 'MongoDB']
  },
  {
    title: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'Docker', 'Jenkins', 'Postman', 'Jira']
  },
  {
    title: 'Design & Visualization',
    skills: ['Figma', 'Wireframing', 'UI Design', 'Prototyping', 'Adobe Suite']
  }
];

const Skills = () => {
  const targetRef = useRef(null);
  
  // Create a tall scrolling container (400vh) to map vertical scroll to horizontal scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map 0 -> 1 vertical progress to 0% -> -80% horizontal translation 
  // (-80% assumes we have ~5-6 cards to scroll through)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-85%']);

  return (
    <section ref={targetRef} id="skills" style={{ position: 'relative', height: '400vh' }}>
      {/* Sticky container that stays in view while the parent scrolls */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'absolute', top: '10vh', left: 0, right: 0, zIndex: 10 }}>
          <SectionTitle>Technical Skills</SectionTitle>
        </div>

        <motion.div style={{ x, display: 'flex', gap: '5vw', paddingLeft: '5vw', paddingTop: '10vh' }}>
          {skillCategories.map((category, idx) => (
            <div 
              key={category.title}
              className="glass hover-target"
              style={{
                width: '55vw',
                minWidth: '500px',
                height: '60vh',
                padding: '4rem',
                borderRadius: '32px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: '6rem',
                transition: 'transform 0.4s ease, border-color 0.4s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = 'var(--accent-purple)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Dynamic glowing orb in the card */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3] 
                }}
                transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
                style={{ 
                  position: 'absolute', 
                  top: '-20%', 
                  right: '-10%', 
                  width: '300px', 
                  height: '300px', 
                  background: 'var(--border-glow)', 
                  filter: 'blur(80px)', 
                  borderRadius: '50%',
                  zIndex: 0
                }} 
              />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                  <div style={{ width: '4px', height: '40px', background: 'var(--accent-cyan)', borderRadius: '4px', boxShadow: '0 0 10px var(--accent-cyan)' }} />
                  <h3 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    {category.title}
                  </h3>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {category.skills.map((skill) => (
                    <motion.span 
                      key={skill}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--accent-cyan)', borderColor: 'var(--accent-cyan)', boxShadow: '0 0 15px rgba(0, 245, 212, 0.4)' }}
                      style={{
                        padding: '14px 28px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '100px',
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        cursor: 'default',
                        transition: 'border-color 0.3s, box-shadow 0.3s'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
