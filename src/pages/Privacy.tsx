import { motion } from 'framer-motion';
import { business } from '@/lib/data';

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-grain">
      <div className="container-luxe max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-3xl md:text-4xl font-serif text-ink-950 mb-8">Privacy Policy</h1>
          <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-burgundy-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>At {business.name}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            
            <h3>1. Information We Collect</h3>
            <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
            <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you request a quote or contact us.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>

            <h3>2. Use of Your Information</h3>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
            <ul>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to our services.</li>
              <li>Respond to customer service requests and support needs.</li>
              <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions to you.</li>
            </ul>

            <h3>3. Disclosure of Your Information</h3>
            <p>We do not share, sell, or rent your personal information to third parties for their marketing purposes. We may share information we have collected about you in certain situations, such as to comply with legal obligations or to protect our rights.</p>

            <h3>4. Contact Us</h3>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <p><strong>{business.name}</strong><br/>{business.address}<br/>Phone: {business.phone}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

