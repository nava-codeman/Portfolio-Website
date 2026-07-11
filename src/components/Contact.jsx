import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariant}
        >
          Get In Touch
        </motion.h2>
        
        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
          >
            <h3>Let's build something amazing</h3>
            <p>
              I'm currently looking for new opportunities, and my inbox is always open. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="social-links">
              <motion.a whileHover={{ scale: 1.1, y: -5 }} href="mailto:jyotinav710@gmail.com" className="social-card glass-card">
                <img src="/logo-gmail-9988.png" alt="Email" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -5 }} href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer" className="social-card glass-card">
                <img src="/linkedin.png" alt="LinkedIn" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -5 }} href="https://github.com/" target="_blank" rel="noreferrer" className="social-card glass-card">
                <img src="/github.png" alt="GitHub" style={{ height: '35px', width: 'auto', objectFit: 'contain', backgroundColor: 'white', borderRadius: '50%' }} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -5 }} href="https://www.instagram.com/_navjyoti_nath_?igsh=NXp1OGtldm1nYmFs&utm_source=qr" target="_blank" rel="noreferrer" className="social-card glass-card">
                <img src="/instagram.png" alt="Instagram" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="contact-form-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="John Doe" value={formState.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="john@example.com" value={formState.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Hello Navjyoti..." value={formState.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {isSubmitted && <div className="success-msg">Message sent successfully!</div>}
            </form>
          </motion.div>
        </div>
      </div>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Navjyoti Nath. Designed & Built with passion.</p>
      </footer>
    </section>
  );
};

export default Contact;
