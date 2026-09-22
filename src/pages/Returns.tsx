import { motion } from 'framer-motion';
import { business } from '@/lib/data';

export default function Returns() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-grain">
      <div className="container-luxe max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-3xl md:text-4xl font-serif text-ink-950 mb-8">Returns & Refunds</h1>
          <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-burgundy-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Thank you for choosing {business.name}. We strive to deliver the highest quality customized decor products.</p>
            
            <h3>Custom Products Policy</h3>
            <p>Because all our wallpapers, glass films, and canvases are custom-manufactured to your specific dimensions and design choices, <strong>we cannot accept returns or offer refunds for change of mind.</strong></p>

            <h3>Manufacturing Defects or Damage</h3>
            <p>We stand by the quality of our work. If you receive a product that has a manufacturing defect or was damaged during transit, please contact us within <strong>48 hours</strong> of delivery/installation.</p>
            <ul>
              <li>Please provide clear photographs of the defect or damage.</li>
              <li>Upon verification, we will arrange for a replacement of the defective panels or products at no additional cost to you.</li>
            </ul>

            <h3>Installation Issues</h3>
            <p>If our team performed the installation and you notice any issues (e.g., peeling edges, bubbles that do not resolve), please inform us within 7 days. We will schedule a visit to rectify the installation issue.</p>

            <h3>Contact Us</h3>
            <p>To report an issue or request support, please reach out to us:</p>
            <p><strong>{business.name}</strong><br/>{business.address}<br/>Phone: {business.phone}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

