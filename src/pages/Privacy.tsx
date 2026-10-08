import { motion } from 'framer-motion';
import { business } from '@/lib/data';

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-grain">
      <div className="container-luxe max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-3xl md:text-4xl font-serif text-ink-950 mb-8">Privacy Policy</h1>
          <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-burgundy-600">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>At <strong>{business.name}</strong>, we respect your privacy and are committed to protecting your personal data. This comprehensive Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage with our digital services, or purchase our custom decor solutions.</p>
            
            <h3>1. Information We Collect</h3>
            <p>We collect information to provide better services to all our users. The types of personal information we may collect include:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, billing address, shipping address, email address, and telephone numbers.</li>
              <li><strong>Project Details:</strong> Custom dimensions, design preferences, uploaded images, and structural requirements necessary for manufacturing your custom decor.</li>
              <li><strong>Technical Data:</strong> Internet Protocol (IP) address, browser type and version, time zone setting, operating system, and platform used to access our website.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products, and services, including page visit history.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We utilize the collected information for various professional purposes:</p>
            <ul>
              <li>To manufacture and deliver your custom wallpaper, glass film, or canvas prints accurately.</li>
              <li>To manage your orders, process payments, and provide post-installation customer support.</li>
              <li>To personalize your experience and deliver content and product offerings relevant to your interests.</li>
              <li>To improve our website functionality, customer service, and manufacturing processes.</li>
              <li>To communicate with you regarding your order status, new products, and promotional offers (with your explicit consent).</li>
            </ul>

            <h3>3. Data Sharing and Third-Party Disclosure</h3>
            <p>We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties for marketing purposes. However, we may share your data with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. These include:</p>
            <ul>
              <li>Logistics and shipping partners to deliver your products.</li>
              <li>Payment gateways for secure transaction processing.</li>
              <li>Analytics providers to help us understand website traffic and usage.</li>
            </ul>

            <h3>4. Data Security</h3>
            <p>We implement a variety of rigorous security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.</p>

            <h3>5. Your Rights</h3>
            <p>Depending on your location, you may have the right to access, correct, update, or delete your personal information. If you wish to exercise these rights, please contact our support team.</p>

            <h3>6. Contact Us</h3>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us at:</p>
            <p><strong>{business.name}</strong><br/>{business.address}<br/>Phone: {business.phone}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
