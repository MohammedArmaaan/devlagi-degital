import { motion } from 'framer-motion';
import { business } from '@/lib/data';

export default function Terms() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-grain">
      <div className="container-luxe max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-3xl md:text-4xl font-serif text-ink-950 mb-8">Terms & Conditions</h1>
          <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-burgundy-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Welcome to {business.name}. By accessing our website or purchasing our custom products and services, you agree to be bound by these Terms & Conditions.</p>
            
            <h3>1. Custom Orders & Manufacturing</h3>
            <p>All our wallpapers and glass films are customized to your specific dimensions and requirements. Once a custom order is placed and production begins, it cannot be cancelled or modified.</p>
            <ul>
              <li>Measurements provided by the customer are the customer's responsibility. If we perform the site measurement, we guarantee the dimensions.</li>
              <li>Slight color variations may occur between digital proofs/screens and the final printed product due to material and printing tolerances.</li>
            </ul>

            <h3>2. Installation Services</h3>
            <p>If your order includes installation services within Ahmedabad, our team will schedule a visit. The site must be ready (walls primed/cleaned, clear of furniture) before our arrival. Delays caused by site unreadiness may incur rescheduling fees.</p>

            <h3>3. Intellectual Property</h3>
            <p>Unless otherwise indicated, the Site and all custom designs, patterns, text, and graphics provided by {business.name} are our proprietary property and are protected by copyright laws.</p>

            <h3>4. Limitation of Liability</h3>
            <p>In no event will {business.name} be liable to you or any third party for any direct, indirect, consequential, or incidental damages arising from your use of the site or our products.</p>

            <h3>5. Contact Us</h3>
            <p>If you have any questions concerning our Terms & Conditions, please contact us at:</p>
            <p><strong>{business.name}</strong><br/>{business.address}<br/>Phone: {business.phone}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

