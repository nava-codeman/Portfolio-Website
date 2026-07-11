import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

const projectData = {
  fithub: {
    title: 'FitHub',
    subtitle: 'MERN Fitness Platform',
    description: 'FitHub - MERN Fitness Platform (React, Node.js, Express, MongoDB, Firebase). Engineered modular frontend layout structures, secure authentication middleware, personalized workout tracking setups, and scalable database connections.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
    link: '#',
  },
  estrosync: {
    title: 'EstroSync',
    subtitle: 'Smart Estrous Synchronization Platform',
    description: 'EstroSync - Smart Estrous Synchronization Platform (React, Firebase, IoT, AI, PWA). Engineered secure cloud management layers, real-time synchronization arrays across multiple farms, dynamic breeding workflows, and automated hormone tracking charts for smart farming.',
    stack: ['React', 'Firebase', 'IoT', 'AI', 'PWA'],
    link: '#',
  },
  fundsure: {
    title: 'FundSure',
    subtitle: 'NGO and Government Funding Platform',
    description: 'FundSure - NGO and Government Funding Platform (React, Firebase, Role-Based Access). Implemented role-based dashboards, secure project management sequences, allocation workflows, and end-to-end beneficiary tracking logs.',
    stack: ['React', 'Firebase', 'Role-Based Access'],
    link: '#',
  },
  kamaiah: {
    title: 'Kamaiah Engineering Services Pvt. Ltd.',
    subtitle: 'Software Development Intern',
    description: 'Software Development Intern at Kamaiah Engineering Services Pvt. Ltd., Kahilipara, Guwahati (July 2025). Managed a 120-hour industrial training block highlighting requirement analysis, software testing cycles, documentation standards, and collaborative agile workflows.',
    stack: ['Requirement Analysis', 'Software Testing', 'Agile Workflows'],
    link: '#',
  },
  icar: {
    title: 'ICAR-NRCY',
    subtitle: 'Research Intern',
    description: 'Research Intern at ICAR - National Research Centre on Yak, Dirang, Arunachal Pradesh (June 2026 – Present). Contributed to specialized smart livestock management infrastructure, backend data designs, and role-based access management configurations.',
    stack: ['Backend Data Designs', 'Role-Based Access'],
    link: '#',
  },
  adbu: {
    title: 'Academic Credentials',
    subtitle: 'Assam Don Bosco University',
    description: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering, Assam Don Bosco University (2023–2027) | Current CGPA: 6.410',
    stack: [],
    details: [
      { label: 'B.Tech (CSE)', value: 'Assam Don Bosco University (2023–2027) | CGPA: 6.410' },
      { label: 'Class XII', value: 'Gurukul Academy Junior College, Morigaon (2022) | 67%' },
      { label: 'Class X', value: 'St. Theresa’s School, Morigaon (2020) | 70.17%' }
    ],
    link: '#',
  },
  leadership: {
    title: 'Leadership',
    subtitle: 'Executive Committee Commitments',
    description: 'Secretary, Indoor Sports Committee, Assam Don Bosco University, Azara campus. Coordinated inter-departmental athletic configurations, managed budget planning profiles, and led event execution teams while promoting institutional group dynamics.',
    stack: ['Event Execution', 'Budget Planning', 'Group Dynamics'],
    link: '#',
  },
  skills: {
    title: 'Technical Matrix Graph',
    subtitle: 'Skills Overview',
    description: 'Languages: Java, C, C++, Python, JavaScript, SQL. Frontend: React.js, HTML5, CSS3, Tailwind CSS. Backend/DB: Node.js, Express.js, Firebase, MongoDB. Tools: Git, GitHub, VS Code, Postman, Android Studio, Figma, Antigravity. Core Concepts: Data Structures & Algorithms, OOPs, DBMS, Operating Systems, Software Engineering.',
    stack: ['Java', 'C++', 'Python', 'React.js', 'Node.js', 'Firebase', 'MongoDB'],
    link: '#',
  },
  achievements: {
    title: 'Milestone & Award Pipeline',
    subtitle: 'Achievements',
    description: 'Gold Medal: Bench Press (Under 75 kg), Assam Don Bosco University (2026) | Gold Medal: Short Video Competition, ADBU (2026) | Silver Medal: Advertisement Making Competition (2026) | Silver Medal: Short Video Competition (2025) | Top 5 Rank: State-Level Magazine Art Competition, Assam.',
    stack: [],
    link: '#',
  },
  overview: {
    title: 'System Overview Portal',
    subtitle: 'Professional Summary',
    description: 'Professional summary introducing Navjyoti Nath as a Computer Science & Engineering undergraduate focused on scalable software solutions, modern web systems, and IoT integrations.',
    stack: ['Software Solutions', 'Modern Web Systems', 'IoT Integrations'],
    link: '#',
  },
  contact: {
    title: 'Final Timeline Termination',
    subtitle: 'Contact Information',
    description: 'Morigaon, Assam, India – 782105 | Email: jyotinav710@gmail.com | Phone: +91 8822053335. Provides clean navigation routes to GitHub, LinkedIn, Instagram, YouTube, and Facebook.',
    stack: [],
    details: [
      { label: 'Email', value: 'jyotinav710@gmail.com' },
      { label: 'Phone', value: '+91 8822053335' },
      { label: 'Location', value: 'Morigaon, Assam, India – 782105' }
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/nava-codeman' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/navjyoti-nath-674688229/' },
      { label: 'Instagram', url: 'https://www.instagram.com/_navjyoti_nath_/' },
      { label: 'YouTube', url: 'https://www.youtube.com/@navaxlifts' },
      { label: 'Facebook', url: 'https://www.facebook.com/jyotinav710/' }
    ]
  }
};

const ProjectOverlay = () => {
  const activeProject = useStore((state) => state.activeProject);
  const closeProject = useStore((state) => state.closeProject);

  const data = activeProject ? projectData[activeProject] : null;

  return (
    <AnimatePresence>
      {data && (
          <motion.div 
          className="project-overlay"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <button 
            className="project-close-btn"
            onClick={closeProject}
          >
            [ CLOSE ]
          </button>

          <motion.h1 
            className="project-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {data.title}
          </motion.h1>

          <motion.h3 
            className="project-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {data.subtitle}
          </motion.h3>

          <motion.p 
            className="project-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {data.details && (
              <div style={{ marginBottom: '2rem' }}>
                {data.details.map((detail, i) => (
                  <div key={i} style={{ marginBottom: '0.8rem', fontSize: '1.1rem' }}>
                    <span style={{ opacity: 0.6 }}>{detail.label}: </span>
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
            )}

            {data.links && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                {data.links.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00f0ff', textDecoration: 'none', fontSize: '1.1rem', letterSpacing: '1px' }}>
                    → {link.label}
                  </a>
                ))}
              </div>
            )}

            {data.stack && data.stack.length > 0 && (
              <>
                <h4 style={{ letterSpacing: '2px', fontSize: '0.8rem', opacity: 0.5, marginBottom: '1rem' }}>TECHNOLOGY STACK</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {data.stack.map((tech, i) => (
                    <span key={i} style={{ 
                      padding: '0.5rem 1rem', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      borderRadius: '20px',
                      fontSize: '0.85rem'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectOverlay;
