import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(consent);
        if (Date.now() - parsed.timestamp > 600000) {
          setIsVisible(true);
        }
      } catch (e) {
        setIsVisible(true);
      }
    }
  }, []);

  const saveConsent = (type: string) => {
    localStorage.setItem('cookie_consent', JSON.stringify({ type, timestamp: Date.now() }));
    setIsVisible(false);
  };

  const handleAcceptAll = () => saveConsent('all');
  const handleAcceptNecessary = () => saveConsent('necessary');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto glass-strong rounded-xl p-6 shadow-2xl pointer-events-auto border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-ink-950 font-serif font-medium text-lg mb-2">Cookie Preferences</h3>
                <p className="text-ink-700 text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={handleAcceptNecessary}
                  className="px-4 py-2.5 rounded-lg border border-ink-200 text-ink-700 text-sm font-medium hover:bg-ink-50 transition-colors"
                >
                  Accept Necessary
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2.5 rounded-lg bg-burgundy-600 text-white text-sm font-medium hover:bg-burgundy-700 transition-colors shadow-sm"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
