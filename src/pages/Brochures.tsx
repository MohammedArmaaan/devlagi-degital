import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, FileText, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { useLeadGatekeeper } from '@/contexts/LeadContext';
import AnimatedText from '@/components/AnimatedText';
import TiltCard from '@/components/TiltCard';
import { brochures as allBrochuresData } from '@/lib/data';
import DOMPurify from 'dompurify';
import { getImageUrl } from '@/lib/imageUtils';
import { useBanner } from '@/hooks/useBanner';
import { trackInterest } from '@/lib/trackInterest';

type Props = { navigate: (path: string) => void };
export default function Brochures({ navigate }: Props) {
  const [filter, setFilter] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const allBrochures = allBrochuresData;
  const loading = false;

  useEffect(() => {
    trackInterest('Brochures', '/brochures');
  }, []);

  const stripHtml = (html: string) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = DOMPurify.sanitize(html);
    return tmp.textContent || tmp.innerText || "";
  };
  const { requireLead } = useLeadGatekeeper();
  
  // Dynamically generate categories based on available data
  const displayCategories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Industry', 'Retail'];

  const filtered = filter === 'All' ? allBrochures : allBrochures.filter(b => b.category && b.category.toLowerCase() === filter.toLowerCase());



  const handleRequestBrochure = (brochure: any) => {
    requireLead(() => {
      trackInterest(`Download ${brochure.title} PDF`, `/brochures/download/${brochure.slug}`);
      window.open(getImageUrl(brochure.pdf_url || brochure.pdf), '_blank');
    }, {
      title: `Download ${brochure.title}`,
      description: "Please provide your details to download the brochure.",
      source: "brochures_page",
      productInterest: `${brochure.title} - ${getImageUrl(brochure.pdf_url || brochure.pdf)}`
    });
  };

  const { banner, isLoading: isBannerLoading } = useBanner('Brochures');

  return (
    <div className="bg-white min-h-screen">
      {(isBannerLoading || banner?.image) && (
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 w-full h-full">
          {isBannerLoading ? (
            <div className="absolute inset-0 z-20"></div>
          ) : banner?.image ? (
            <img 
              src={getImageUrl(banner.image)} 
              alt={banner.title || "Brochures Banner"} 
              className="w-full h-full object-cover" 
            />
          ) : null}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              {banner?.subtitle && <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>{banner.subtitle}</div>}
              {banner?.title && <h1 className="heading-1 mb-6 text-balance text-white">{banner.title}</h1>}
              {(banner?.title || banner?.subtitle || banner?.description) && <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />}
              {banner?.description && <p className="text-white/90 text-lg">{banner.description}</p>}
            </div>
          </FadeIn>
        </div>
      </section>
      )}
      {!isBannerLoading && !banner?.image && <div className="pt-24 lg:pt-32" />}

      <section className="py-6 border-y border-ink-200 bg-[#F8F7F5]">
        <div className="container-luxe flex items-center justify-between">
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-ink-900 hover:text-burgundy-600 transition-colors"
          >
            Filter
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
          
          <span className="font-sans text-xs md:text-sm uppercase tracking-widest text-ink-600 font-medium">
            <strong className="text-ink-900">{filtered.length}</strong> Brochures
          </span>
        </div>
      </section>

      <section className="py-12 md:py-16 relative">
        {/* Drawer Overlay */}
        {createPortal(
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black/50 z-[100]"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-[#F9F9F9] z-[101] flex flex-col shadow-2xl overflow-y-auto"
              >
                <div className="p-6 border-b border-ink-100 flex items-center justify-between sticky top-0 bg-[#F9F9F9] z-10">
                  <h3 className="font-serif text-xl tracking-[0.2em] uppercase text-ink-950 font-bold">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="text-ink-500 hover:text-ink-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                
                <div className="p-6 space-y-8 flex-1">
                  <div>
                    <h4 className="font-sans text-[11px] tracking-widest uppercase text-ink-900 font-bold mb-5 flex items-center justify-between">
                      Categories
                      <svg className="w-3 h-3 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    </h4>
                    <div className="space-y-4">
                      {displayCategories.map(cat => (
                        <div key={cat}>
                          <label className="flex items-center gap-4 cursor-pointer group">
                            <div className={`w-[18px] h-[18px] border flex items-center justify-center transition-colors ${filter === cat ? 'bg-ink-900 border-ink-900' : 'border-ink-300 group-hover:border-ink-500 bg-transparent'}`}>
                              {filter === cat && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span className={`font-sans text-[11px] uppercase tracking-wide ${filter === cat ? 'text-ink-950 font-bold' : 'text-ink-700 group-hover:text-ink-900'}`}>{cat === 'All' ? 'All Categories' : cat}</span>
                            <input type="radio" name="category" className="hidden" checked={filter === cat} onChange={() => { setFilter(cat); setShowMobileFilters(false); }} />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-ink-200 sticky bottom-0 bg-[#F9F9F9]">
                  <button onClick={() => { setFilter('All'); setShowMobileFilters(false); }} className="w-full py-4 border border-ink-900 text-ink-900 font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-ink-900 hover:text-white transition-colors">
                    Clear All Filters
                  </button>
                </div>
              </motion.aside>
            </>
          )}</AnimatePresence>, document.body)}

        <div className="container-luxe">
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {loading ? (
              <div className="col-span-full py-12 text-center text-ink-500 font-sans tracking-widest uppercase">Loading...</div>
            ) : (
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
                        <img src={getImageUrl(brochure.image || brochure.image || brochure.image || brochure.image || brochure.image)} alt={brochure.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" onError={(e) => { e.currentTarget.src = 'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=800'; }} />
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 glass-light px-2 py-1 md:px-3 md:py-1.5 rounded-sm">
                          <span className="font-sans text-[9px] md:text-xs text-burgundy-600 tracking-wide-2 uppercase">PDF</span>
                        </div>
                      </div>
                      <div className="p-3 md:p-6 flex flex-col flex-1">
                        <span className="font-sans text-[10px] md:text-xs tracking-wide-2 uppercase text-burgundy-600 mb-1 md:mb-2">{brochure.category}</span>
                        <h3 className="heading-3 text-sm md:!text-xl mb-2 md:mb-3 group-hover:text-burgundy-700 transition-colors duration-500">{brochure.title}</h3>
                        {brochure.description ? (
                          <p className="body-text text-xs md:text-sm flex-1 mb-3 md:mb-4 line-clamp-3">{stripHtml(brochure.description)}</p>
                        ) : (
                          <div className="flex-1 mb-3 md:mb-4"></div>
                        )}
                        <div className="flex flex-col xl:flex-row gap-2 mt-auto">
                          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleRequestBrochure(brochure)} className="btn-primary flex-1 !py-2 !px-2 md:!py-3 md:!px-4 !text-[10px] md:!text-xs group">
                            <Download className="w-3 h-3 md:w-3.5 md:h-3.5" /><span className="truncate">PDF</span>
                          </motion.button>
                          
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
            )}
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

    </div>
  );
}






