import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadCaptureModal from '@/components/LeadCaptureModal';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
    
    // Check if lead data is already captured
    if (!localStorage.getItem('lead_captured')) {
      setShowLeadModal(true);
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'false');
    setIsVisible(false);
  };

  return (
    <>
      <LeadCaptureModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)}
        onSuccess={() => setShowLeadModal(false)}
        title="Stay Connected"
        description="Thank you for accepting our policy! Please provide your contact info so we can offer personalized service."
        source="cookie_banner"
      />
      <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[400px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-burgundy-50 rounded-full flex items-center justify-center shrink-0">
                  <Cookie className="text-burgundy-600" size={20} />
                </div>
                <h3 className="font-serif font-bold text-ink-900 text-lg">We value your privacy</h3>
              </div>
              <button 
                onClick={handleDecline}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 px-4 py-2.5 rounded-lg bg-burgundy-600 text-white text-sm font-medium hover:bg-burgundy-700 transition-colors shadow-sm shadow-burgundy-200"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

