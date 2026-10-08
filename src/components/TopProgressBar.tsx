import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopProgressBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsFinishing(false);
      setIsLoading(true);
    };
    const handleEnd = () => {
      setIsFinishing(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsFinishing(false);
      }, 400); // Wait for the 100% animation to finish
    };

    window.addEventListener('api-load-start', handleStart);
    window.addEventListener('api-load-end', handleEnd);

    return () => {
      window.removeEventListener('api-load-start', handleStart);
      window.removeEventListener('api-load-end', handleEnd);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed top-0 left-0 w-full h-1 z-[9999] pointer-events-none"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: isFinishing ? "100%" : "85%" }}
            transition={{ 
              duration: isFinishing ? 0.3 : 10, 
              ease: isFinishing ? "easeOut" : "easeOut" 
            }}
            className="h-full bg-burgundy-600 shadow-[0_0_15px_rgba(153,27,27,0.8)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
