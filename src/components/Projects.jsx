import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const Projects = () => {
  const projects = [
    {
      title: 'EstroSync',
      subtitle: 'Smart Estrous Synchronization Platform',
      tech: ['React', 'Firebase', 'IoT', 'AI', 'Progressive Web App'],
      description: [
        'Developing a next-generation smart livestock management platform.',
        'Designed to automate estrous synchronization, reproductive monitoring, hormone scheduling, and breeding recommendations.',
        'Developing secure cloud infrastructure using Firebase Auth, Firestore, Cloud Storage, and real-time sync across farms.'
      ]
    },
    {
      title: 'FitHub',
      subtitle: 'MERN Fitness Platform',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
      description: [
        'Designed a comprehensive fitness platform providing personalized workout plans and diet recommendations.',
        'Implemented user authentication, responsive UI, scalable backend, and secure cloud DB integration.',
        'Developed modular frontend components following modern React architecture.',
        'Designed for future expansion with community interaction, trainer management, and social fitness features.'
      ]
    },
    {
      title: 'FundSure',
      subtitle: 'NGO and Government Funding Platform',
      tech: ['React', 'Firebase', 'Role-Based Access'],
      description: [
        'Designed a digital funding platform connecting NGOs, government organizations, donors, and beneficiaries.',
        'Implemented role-based authentication, project management workflows, and beneficiary tracking.',
        'Designed scalable Firebase backend architecture for transparency, accessibility, and efficiency.'
      ]
    }
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
        >
          Featured Projects
        </motion.h2>
        
        <motion.div 
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div 
              className="project-card glass-card" 
              key={index}
              variants={fadeUpVariant}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <h4>{project.subtitle}</h4>
                </div>
                
                <ul className="project-description">
                  {project.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
                
                <div className="project-tech">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
