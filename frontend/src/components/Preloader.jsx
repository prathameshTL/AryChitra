import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        // Ease towards 100 — fast at start, slows near end
        const increment = Math.max(1, Math.floor((100 - prev) / 8));
        return Math.min(prev + increment, 100);
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              className="preloader-logo"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: 'linear-gradient(135deg, #6C63FF, #00D9FF, #A78BFA, #6C63FF)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              AryChitra
            </motion.div>

            {/* Progress Bar */}
            <div style={{
              width: '160px',
              height: '3px',
              background: 'rgba(148, 163, 184, 0.15)',
              borderRadius: '2px',
              margin: '1rem auto 0',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #6C63FF, #00D9FF)',
                  borderRadius: '2px',
                }}
              />
            </div>

            {/* Percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                color: '#94A3B8',
                fontSize: '0.85rem',
                marginTop: '1rem',
                fontFamily: 'var(--font-accent)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              {progress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

