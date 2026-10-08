import { motion } from 'framer-motion';
import { business } from '@/lib/data';

export default function Returns() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-grain">
      <div className="container-luxe max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-3xl md:text-4xl font-serif text-ink-950 mb-8">Returns & Refunds Policy</h1>
          <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-burgundy-600">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>At <strong>{business.name}</strong>, we pride ourselves on delivering premium, custom-made decor solutions. Because our products are tailored entirely to your specifications, our returns policy differs from standard retail stores.</p>
            
            <h3>1. Custom Products (No Change of Mind Returns)</h3>
            <p>Because all our wallpapers, glass films, custom canvases, and printed decor are manufactured to your specific dimensions, material choices, and design selections, <strong>we cannot accept returns or offer refunds for "change of mind" or measurement errors made by the customer.</strong> Please double-check all measurements and design choices before finalizing your order.</p>

            <h3>2. Order Cancellations</h3>
            <p>If you need to cancel or modify your order, you must contact us within <strong>24 hours</strong> of placement. Once the 24-hour window has passed, your order will enter the manufacturing phase, and we will no longer be able to cancel or refund the transaction.</p>

            <h3>3. Defective or Damaged Items</h3>
            <p>We maintain strict quality control. However, if your product arrives damaged or contains a clear manufacturing defect, we will replace it at no additional cost to you. To claim a replacement:</p>
            <ul>
              <li>You must notify us within <strong>7 days</strong> of receiving the delivery.</li>
              <li>You must provide clear, high-resolution photographs of the damage or defect before attempting any installation.</li>
              <li>The product must remain unused and in its original packaging. <strong>Do not attempt to install a defective product</strong>, as installation voids any replacement claims.</li>
            </ul>

            <h3>4. Color Discrepancies</h3>
            <p>As mentioned in our Terms & Conditions, screen colors vary greatly. We do not offer returns or reprints based solely on slight color variations between your monitor's display and the final printed product. If precise color matching is critical, we recommend requesting a physical sample print (charges may apply) before placing a full-scale order.</p>

            <h3>5. Refund Processing</h3>
            <p>If a refund is approved (e.g., due to an unresolvable defect or a valid 24-hour cancellation), the funds will be credited back to your original payment method within 5-7 business days, depending on your bank's processing times.</p>

            <h3>6. Contact for Claims</h3>
            <p>To initiate a defect claim or cancellation, please reach out to our support team immediately:</p>
            <p>Phone: <strong>{business.phone}</strong><br/>(Please have your Order ID ready)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
