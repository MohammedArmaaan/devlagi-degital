import { motion } from 'framer-motion';
import { business } from '@/lib/data';

export default function CookiesPolicy() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-grain">
      <div className="container-luxe max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink-100">
          <h1 className="text-3xl md:text-4xl font-serif text-ink-950 mb-8">Cookie Policy</h1>
          <div className="prose prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-burgundy-600">
            <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
            <p>This Cookie Policy explains how <strong>{business.name}</strong> uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.</p>
            
            <h3>1. What are Cookies?</h3>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

            <h3>2. Why Do We Use Cookies?</h3>
            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our digital properties.</p>

            <h3>3. Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Website Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as accessing secure areas or keeping your session active.</li>
              <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</li>
              <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used, how effective our marketing campaigns are, or to help us customize our website for you.</li>
              <li><strong>Tracking Cookies:</strong> We use local storage to keep track of your browsing history and lead capture status (e.g., whether you have already filled out a brochure download form) to prevent asking for the same information repeatedly.</li>
            </ul>

            <h3>4. How Can You Control Cookies?</h3>
            <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
            <p>Because the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.</p>

            <h3>5. Updates to this Policy</h3>
            <p>We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
