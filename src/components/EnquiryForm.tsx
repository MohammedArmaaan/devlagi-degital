import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitEnquiry } from '@/lib/supabase';
import { services } from '@/lib/data';

type Props = {
  defaultService?: string;
  compact?: boolean;
};

export default function EnquiryForm({ defaultService = '', compact = false }: Props) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    project_type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setStatus('error');
      setErrorMsg('Please fill in your name, phone number, and select a service.');
      return;
    }
    setStatus('loading');
    const result = await submitEnquiry(form);
    if (result.success) {
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', project_type: '', message: '' });
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center text-center py-12 px-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 rounded-full bg-burgundy-600/10 border border-burgundy-600/30 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-burgundy-600" />
        </motion.div>
        <h3 className="heading-3 !text-2xl mb-3">Thank You</h3>
        <p className="body-text max-w-md">
          Your enquiry has been received. Our team will contact you within 24 hours to discuss your
          project requirements.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-ghost mt-8">Send Another Enquiry</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-5' : 'space-y-6'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label-luxe" htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-luxe"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="label-luxe" htmlFor="phone">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-luxe"
            placeholder="Your phone number"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label-luxe" htmlFor="email">
            Email (Optional)
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-luxe"
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="label-luxe" htmlFor="service">
            Service *
          </label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="input-luxe"
            required
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label-luxe" htmlFor="project_type">
          Project Type
        </label>
        <div className="flex gap-3">
          {['Residential', 'Commercial', 'Both'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm({ ...form, project_type: type })}
              className={`px-5 py-2.5 font-sans text-sm rounded-sm border transition-all duration-500 ease-lux ${
                form.project_type === type
                  ? 'border-burgundy-600 text-burgundy-700 bg-burgundy-600/5'
                  : 'border-ink-600 text-ink-700 hover:border-ink-400 hover:text-ink-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-luxe" htmlFor="message">
          Project Details
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input-luxe min-h-[120px] resize-y"
          placeholder="Tell us about your space, dimensions, design preferences, or any questions you have..."
        />
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 text-burgundy-300 bg-burgundy-950/30 border border-burgundy-800/40 rounded-sm px-4 py-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-sans text-sm">{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
        whileTap={{ scale: status === 'loading' ? 1 : 0.99 }}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed group"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
        ) : (
          <span>Submit Enquiry</span>
        )}
      </motion.button>
    </form>
  );
}
