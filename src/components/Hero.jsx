import React from 'react';
import { motion } from 'framer-motion';
import '@google/model-viewer';
import './Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-text-line">Hi I'm Navjyoti</motion.div>
          <motion.div variants={itemVariants} className="hero-text-line">A Full Stack Developer building</motion.div>
          <motion.div variants={itemVariants} className="hero-huge-text">intelligent</motion.div>
          <motion.div variants={itemVariants} className="hero-text-line">web applications</motion.div>
          
          <motion.p variants={itemVariants} className="hero-subtitle">
            Specializing in React, Firebase, and IoT integrations.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-cta">
            <a href="#projects" className="btn btn-primary">View My Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </motion.div>
        </motion.div>



      </div>
    </section>
  );
};

export default Hero;
