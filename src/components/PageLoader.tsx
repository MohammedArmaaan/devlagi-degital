import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleEnd = () => setIsLoading(false);
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm"
        >
          <div className="relative flex items-center justify-center rounded-full bg-white shadow-2xl h-32 w-32 md:h-40 md:w-40 p-4">
            <motion.div
              className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-burgundy-600 border-r-burgundy-600"
              style={{ width: 'calc(100% + 16px)', height: 'calc(100% + 16px)', top: '-8px', left: '-8px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
            {/* The Logo inside */}
            <img src="/Logo4.png" alt="Loading..." className="w-full h-auto object-contain" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
