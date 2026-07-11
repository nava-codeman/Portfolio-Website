import React from 'react';
import { motion } from 'framer-motion';
import FloatingModel from './FloatingModel';
import './About.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
        >
          About Me
        </motion.h2>
        
        <div className="about-content">
          <motion.div 
            className="about-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
          >
            <div className="image-wrapper">
              <FloatingModel />
              <div className="glow-effect"></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-text"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h3 variants={fadeUpVariant}>Computer Science and Engineering Undergraduate</motion.h3>
            <motion.p variants={fadeUpVariant}>
              I am a passionate Full Stack Web Developer with hands-on experience in Java, React, Firebase, and IoT-enabled software systems. 
              Currently, I'm serving as a Research Intern at ICAR–National Research Centre on Yak, contributing to the development of EstroSync, 
              an intelligent estrous synchronization platform integrating IoT devices, cloud technologies, and AI-assisted reproductive monitoring.
            </motion.p>
            <motion.p variants={fadeUpVariant}>
              My goal is to design scalable software solutions, solve real-world problems, and continuously expand my expertise in backend development, 
              cloud computing, and modern software engineering practices.
            </motion.p>
            
            <motion.div className="education" variants={fadeUpVariant}>
              <h4>Education</h4>
              <div className="edu-item">
                <h5>Assam Don Bosco University <span>(2023 - 2027)</span></h5>
                <p>Bachelor of Technology (B.Tech), Computer Science & Engineering</p>
              </div>
            </motion.div>

            <motion.div className="skills" variants={fadeUpVariant}>
              <h4>Technical Skills</h4>
              <div className="skills-grid">
                <div className="skill-category glass-card">
                  <h5>Languages</h5>
                  <p>Java, C, C++, Python, JavaScript, SQL</p>
                </div>
                <div className="skill-category glass-card">
                  <h5>Frontend</h5>
                  <p>React.js, HTML5, CSS3, Tailwind CSS</p>
                </div>
                <div className="skill-category glass-card">
                  <h5>Backend & DB</h5>
                  <p>Node.js, Express.js, Firebase, MongoDB</p>
                </div>
                <div className="skill-category glass-card">
                  <h5>Tools</h5>
                  <p>Git, GitHub, VS Code, Postman, Android Studio, Figma</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
