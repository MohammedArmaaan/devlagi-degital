import { useState } from 'react';
import { Download, FileText, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import TiltCard from '@/components/TiltCard';
import EnquiryForm from '@/components/EnquiryForm';
import { brochures } from '@/lib/data';

type Props = { navigate: (path: string) => void };
const categories = ['All', 'Glass Film', 'Wallpaper', 'Home Decor', 'Commercial'];

export default function Brochures({ navigate }: Props) {
  const [filter, setFilter] = useState('All');
  const [requestBrochure, setRequestBrochure] = useState<string | null>(null);
  const filtered = filter === 'All' ? brochures : brochures.filter((b) => b.category === filter);

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Brochures Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Resources</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Brochures & Catalogues</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">Browse our product brochures and design catalogues. Request a copy to be sent to you, or get in touch for a personalized consultation.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-luxe">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 font-sans text-sm tracking-wide-2 uppercase rounded-sm border transition-all duration-500 ease-lux ${filter === cat ? 'border-burgundy-600 text-burgundy-700 bg-burgundy-600/5' : 'border-ink-600 text-ink-700 hover:border-ink-400 hover:text-ink-900'}`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((brochure, i) => (
                <motion.div
                  key={brochure.slug}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard intensity={5} className="h-full">
                    <div className="card-luxe group flex flex-col h-full glass-shine">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={brochure.image} alt={brochure.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 glass-light px-2 py-1 md:px-3 md:py-1.5 rounded-sm">
                          <span className="font-sans text-[9px] md:text-xs text-burgundy-600 tracking-wide-2 uppercase">{brochure.pages} pages</span>
                        </div>
                      </div>
                      <div className="p-3 md:p-6 flex flex-col flex-1">
                        <span className="font-sans text-[10px] md:text-xs tracking-wide-2 uppercase text-burgundy-600 mb-1 md:mb-2">{brochure.category}</span>
                        <h3 className="heading-3 text-sm md:!text-xl mb-2 md:mb-3 group-hover:text-burgundy-700 transition-colors duration-500">{brochure.title}</h3>
                        <p className="body-text text-xs md:text-sm flex-1 mb-3 md:mb-4">{brochure.description}</p>
                        <div className="flex flex-col xl:flex-row gap-2 mt-auto">
                          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setRequestBrochure(brochure.title)} className="btn-primary flex-1 !py-2 !px-2 md:!py-3 md:!px-4 !text-[10px] md:!text-xs group">
                            <Download className="w-3 h-3 md:w-3.5 md:h-3.5" /><span className="truncate">Request</span>
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')} className="btn-outline !py-2 !px-2 md:!py-3 md:!px-4 !text-[10px] md:!text-xs group"><span className="truncate">Enquire</span></motion.button>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <div className="container-luxe">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="w-14 h-14 rounded-sm border border-burgundy-600/30 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-burgundy-600" />
                </motion.div>
                <div>
                  <h3 className="heading-3 !text-xl">Need a Printed Copy?</h3>
                  <p className="body-text text-sm mt-1">We can mail a physical brochure to your address. Get in touch to request one.</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')} className="btn-primary group">
                <span>Contact Us</span><ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>

      <AnimatePresence>
        {requestBrochure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(5,4,3,0.9)', backdropFilter: 'blur(8px)' }}
            onClick={() => setRequestBrochure(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-ink-200/40">
                <div>
                  <span className="font-sans text-xs tracking-wide-2 uppercase text-burgundy-600">Request Brochure</span>
                  <h3 className="heading-3 !text-xl mt-1">{requestBrochure}</h3>
                </div>
                <button onClick={() => setRequestBrochure(null)} className="text-ink-600 hover:text-ink-900 transition-colors duration-300 p-2"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                <p className="body-text text-sm mb-6">Fill in your details and we will send the brochure to you. Mention the brochure name in the message field.</p>
                <EnquiryForm defaultService={requestBrochure} compact />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
