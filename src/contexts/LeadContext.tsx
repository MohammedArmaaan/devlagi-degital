import React, { createContext, useContext, useState, ReactNode } from 'react';
import LeadCaptureModal from '@/components/LeadCaptureModal';

interface LeadContextType {
  requireLead: (
    onSuccessCallback: () => void,
    options?: {
      source?: string;
      productInterest?: string;
      title?: string;
      description?: string;
    }
  ) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<(() => void) | null>(null);
  const [modalOptions, setModalOptions] = useState({
    source: 'general',
    productInterest: '',
    title: 'Connect With Us',
    description: 'Please provide your details so our team can assist you better.',
  });

  const checkLeadStatus = () => {
    try {
      const captured = localStorage.getItem('lead_captured');
      const time = localStorage.getItem('lead_captured_time');
      
      if (captured === 'true' && time) {
        // Check if 30 days have passed (30 * 24 * 60 * 60 * 1000 = 2592000000)
        if (Date.now() - parseInt(time) < 2592000000) {
          return true;
        } else {
          // Expired
          localStorage.removeItem('lead_captured');
          localStorage.removeItem('lead_captured_time');
        }
      }
    } catch (e) {}
    return false;
  };

  const requireLead = (
    onSuccessCallback: () => void,
    options?: {
      source?: string;
      productInterest?: string;
      title?: string;
      description?: string;
    }
  ) => {
    if (checkLeadStatus()) {
      onSuccessCallback();
    } else {
      setCallback(() => onSuccessCallback);
      if (options) {
        setModalOptions(prev => ({ ...prev, ...options }));
      }
      setIsOpen(true);
    }
  };

  const handleSuccess = () => {
    setIsOpen(false);
    if (callback) {
      callback();
      setCallback(null);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCallback(null);
  };

  return (
    <LeadContext.Provider value={{ requireLead }}>
      {children}
      <LeadCaptureModal
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
        title={modalOptions.title}
        description={modalOptions.description}
        source={modalOptions.source}
        productInterest={modalOptions.productInterest}
      />
    </LeadContext.Provider>
  );
}

export function useLeadGatekeeper() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeadGatekeeper must be used within a LeadProvider');
  }
  return context;
}

