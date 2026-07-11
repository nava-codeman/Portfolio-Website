import React from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const CustomLoader = ({ onStarted }) => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
          className="custom-loader-container"
        >
          <div className="loader-content">
            <h1 className="loader-title">NAVJYOTI NATH</h1>
            <div className="loader-bar-container">
              <motion.div 
                className="loader-bar-fill" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
            <div className="loader-details">
              <span>{Math.round(progress)}%</span>
              <span>INITIALIZING ENVIRONMENT</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomLoader;
