import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import TiltCard from '@/components/TiltCard';
import { productsList, categories as dataCategories } from '@/lib/data';
import { MessageCircle, Eye } from 'lucide-react';
import LeadCaptureModal from '@/components/LeadCaptureModal';

type Props = { navigate: (path: string) => void };
const categories = ['All', ...dataCategories.map(c => c.title)];

export default function Products({ navigate }: Props) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filter, setFilter] = useState(() => { const params = new URLSearchParams(window.location.search); const catSlug = params.get('category'); const found = dataCategories.find(c => c.slug === catSlug); return found ? found.title : 'All'; });
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedProductTitle, setSelectedProductTitle] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});

  const proceedToWhatsApp = (title: string) => {
    const text = "Hi, I am interested in ";
    window.open("https://wa.me/919023791865?text=", '_blank');
  };

  const handleEnquire = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    proceedToWhatsApp(title);
  };

  const executeAction = (actionFn: () => void) => {
    const capturedTime = localStorage.getItem('lead_captured_time');
    if (capturedTime && (Date.now() - parseInt(capturedTime, 10)) < 604800000) {
      actionFn();
    } else {
      setModalAction(() => actionFn);
      setShowLeadModal(true);
    }
  };

  const handleVirtualize = (e: React.MouseEvent, productSlug: string) => {
    e.stopPropagation();
    executeAction(() => {
      window.open(`/virtualizer?product=${productSlug}`, '_blank');
    });
  };
  const filtered = filter === 'All' ? productsList : productsList.filter((p) => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      <LeadCaptureModal 
        isOpen={showLeadModal} 
        onClose={() => setShowLeadModal(false)} 
        onSuccess={modalAction} 
        title="Virtualize Product" 
        description="Please provide your details to access our virtualization tool." 
        source="virtualize_button" 
      />
      
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Products Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Shop</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Our Products</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">
                Explore our premium collection of customizable wallpapers and decorative glass films designed to elevate your space.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

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
            <strong className="text-ink-900">{filtered.length}</strong> Products
          </span>

          <div className="hidden md:flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-ink-900 cursor-pointer bg-ink-900 text-white px-4 py-2 rounded-sm">
            FEATURED <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
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
                      {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                          <div className={`w-[18px] h-[18px] border flex items-center justify-center transition-colors ${filter === cat ? 'bg-ink-900 border-ink-900' : 'border-ink-300 group-hover:border-ink-500 bg-transparent'}`}>
                            {filter === cat && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className={`font-sans text-[11px] uppercase tracking-wide ${filter === cat ? 'text-ink-950 font-bold' : 'text-ink-700 group-hover:text-ink-900'}`}>{cat}</span>
                          <input type="radio" name="category" className="hidden" checked={filter === cat} onChange={() => { setFilter(cat); setShowMobileFilters(false); }} />
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-ink-100">
                    <h4 className="font-sans text-[11px] tracking-widest uppercase text-ink-900 font-bold mb-5 flex items-center justify-between">
                      Availability
                      <svg className="w-3 h-3 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    </h4>
                    <div className="space-y-4">
                      {['In Stock', 'Out of Stock'].map(status => (
                        <label key={status} className="flex items-center gap-4 cursor-pointer group">
                          <div className={`w-[18px] h-[18px] border bg-transparent flex items-center justify-center transition-colors border-ink-300 group-hover:border-ink-500`}>
                          </div>
                          <span className={`font-sans text-[11px] uppercase tracking-wide text-ink-700 group-hover:text-ink-900`}>{status}</span>
                        </label>
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
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <TiltCard intensity={5} className="h-full">
                    <motion.button
                      onClick={() => navigate(`/products/${product.slug}`)}
                      className="card-luxe group flex flex-col h-full glass-shine w-full text-left bg-white border border-ink-100"
                    >
                      <div className="aspect-square overflow-hidden relative w-full">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-60" />
                      </div>
                      <div className="p-4 md:p-5 flex flex-col flex-1">
                        <span className="font-sans text-[9px] md:text-[10px] tracking-widest uppercase text-burgundy-600 mb-1.5 block font-semibold">{product.category}</span>
                        <h3 className="text-sm md:text-base font-serif text-ink-950 mb-3 group-hover:text-burgundy-700 transition-colors duration-500 leading-snug line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
                        
                        <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-ink-100">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-sm md:text-base text-ink-950 font-semibold">?{product.price.toLocaleString('en-IN')}</span>
                            <div className="flex items-center gap-1.5 text-burgundy-600 font-sans text-[9px] uppercase font-bold tracking-widest">
                              View <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
                            </div>
                          </div>
                          <div className="flex gap-2">
                              <button
                                onClick={(e) => handleVirtualize(e, product.slug)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-ink-900 hover:bg-ink-800 text-white rounded-sm font-sans text-[9px] font-bold tracking-widest transition-all"
                              >
                                <Eye className="w-3 h-3" />
                                VIRTUALIZE
                              </button>
                              <button
                                onClick={(e) => handleEnquire(e, product.title)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-sm font-sans text-[9px] font-bold tracking-widest transition-all"
                              >
                                <MessageCircle className="w-3 h-3" />
                                INQUIRE
                              </button>
                            </div>
                        </div>
                      </div>
                    </motion.button>
                  </TiltCard>
                </motion.div>
              ))}</AnimatePresence>
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center flex flex-col items-center">
                <span className="font-serif text-2xl text-ink-400 mb-4">No products found in this category</span>
                <button onClick={() => setFilter('All')} className="border-b border-ink-900 pb-1 font-sans text-xs uppercase tracking-widest font-bold text-ink-900">View All Products</button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}





















