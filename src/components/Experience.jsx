import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Experience = () => {
  const experiences = [
    {
      role: 'Research Intern',
      company: 'ICAR – National Research Centre on Yak',
      location: 'Dirang, Arunachal Pradesh',
      date: 'June 2026 – Present',
      details: [
        'Contributing to the development of EstroSync, an intelligent IoT-enabled estrous synchronization platform.',
        'Designing and developing a PWA using React and Firebase for real-time reproductive health monitoring.',
        'Implementing Firebase Auth, Firestore, Storage, and role-based access control.',
        'Collaborating with researchers to integrate IoT sensor data and automate hormone synchronization workflows.',
        'Participating in system architecture, database design, and AI-assisted reproductive analytics.'
      ]
    },
    {
      role: 'Software Development Intern',
      company: 'Kamaiah Engineering Services Pvt. Ltd.',
      location: 'Kahilipara, Guwahati',
      date: 'July 2025',
      details: [
        'Completed a 120-hour industrial internship focusing on software development practices, documentation, and testing.',
        'Collaborated with technical teams to understand SDLC, requirement analysis, and QA processes.',
        'Strengthened practical knowledge of professional software engineering methodologies and collaborative development.'
      ]
    }
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
        >
          Experience
        </motion.h2>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div 
              className="timeline-item" 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariant}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <span className="timeline-date">{exp.date}</span>
                </div>
                <h4>{exp.company} <span>| {exp.location}</span></h4>
                <ul>
                  {exp.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
