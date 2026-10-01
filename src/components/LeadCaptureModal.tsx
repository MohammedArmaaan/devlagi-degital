import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Send } from 'lucide-react';
import { apiClient } from '@/lib/axios';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
  source?: string;
  productInterest?: string;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Connect With Us",
  description = "Please provide your details so our team can assist you better.",
  source = "general",
  productInterest = ""
}: LeadCaptureModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/visitors', {
        name,
        phone,
        source,
        product_interest: productInterest,
        description: ''
      });

      if (response.data.success) {
        localStorage.setItem('lead_captured', 'true');
        localStorage.setItem('lead_captured_time', Date.now().toString());
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      const data = err.response?.data;
      if (data?.message) {
        setError(data.message);
      } else {
        setError('Connection error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-serif text-xl font-bold text-ink-900">{title}</h3>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 transition-all outline-none"
                  placeholder="Enter your number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>

              
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-burgundy-600 text-white font-medium py-3.5 px-4 rounded-xl hover:bg-burgundy-700 transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Continue
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}











