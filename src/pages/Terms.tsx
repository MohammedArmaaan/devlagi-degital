import { motion } from 'framer-motion';
import { business } from '@/lib/data';

export default function Terms() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-grain">
      <div className="container-luxe max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-3xl md:text-4xl font-serif text-ink-950 mb-8">Terms & Conditions</h1>
          <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-burgundy-600">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>Welcome to <strong>{business.name}</strong>. These Terms & Conditions govern your use of our website and the purchase of our custom decor products, including wallpapers, glass films, and canvases. By accessing our platform or placing an order, you agree to be bound by these terms.</p>
            
            <h3>1. Custom Manufacturing & Orders</h3>
            <p>All our products are custom-manufactured based on the specific dimensions, designs, and materials selected by you. It is your responsibility to ensure that all measurements and specifications provided during the ordering process are 100% accurate. We cannot be held liable for products that do not fit due to incorrect measurements supplied by the customer.</p>

            <h3>2. Pricing & Payments</h3>
            <p>All prices are listed in INR and are subject to change without notice. Full payment or an agreed advance deposit is required before the manufacturing process begins. We reserve the right to cancel any order if payment is not received or if fraudulent activity is suspected.</p>

            <h3>3. Color Accuracy & Variations</h3>
            <p>While we make every effort to display the colors of our products as accurately as possible, the actual colors you see will depend on your monitor or mobile screen calibration. We cannot guarantee that your device's display of any color will accurately reflect the color of the physical printed product. Minor variations in color and texture are normal in digital printing.</p>

            <h3>4. Intellectual Property</h3>
            <p>All content on this website, including text, graphics, logos, images, and software, is the property of {business.name} or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission. If you upload custom designs, you warrant that you hold the necessary rights to use those designs.</p>

            <h3>5. Installation & Liability</h3>
            <p>Unless professional installation services are explicitly purchased from us, {business.name} is not responsible for any damage caused to the product or your property during self-installation. We highly recommend using experienced professionals for applying glass films and wallpapers.</p>

            <h3>6. Limitation of Liability</h3>
            <p>To the maximum extent permitted by law, {business.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of our products or services.</p>

            <h3>7. Contact Information</h3>
            <p>For any legal inquiries or questions regarding these terms, please contact:</p>
            <p><strong>{business.name}</strong><br/>{business.address}<br/>Phone: {business.phone}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
