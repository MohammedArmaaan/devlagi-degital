import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { genericProducts } from '@/lib/data';

type Props = { navigate: (path: string) => void };

export default function Products({ navigate }: Props) {
  const proceedToWhatsApp = (title: string) => {
    const text = "Hi, I am interested in " + title;
    window.open(`https://wa.me/919023791865?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEnquire = (title: string) => {
    proceedToWhatsApp(title);
  };

  return (
    <div className="bg-ink-50 min-h-screen">
      
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden flex items-center justify-center min-h-[40vh]">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80" alt="Banner" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-ink-950/40" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Our Catalog</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Premium Products</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">
                Discover our extensive collection of high-quality wallpapers, blinds, glass films, and frames. Designed to elevate any space with style and durability.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-24 relative bg-ink-50">
        <div className="container-luxe max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 lg:gap-x-20 gap-y-12 sm:gap-y-16 md:gap-y-24">
            {genericProducts.map((product, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col group h-full"
                >
                  <div className={`flex flex-col h-full gap-4 sm:gap-6 md:gap-10 ${isEven ? 'flex-col-reverse' : ''}`}>
                    {/* Image Side */}
                    <div className="w-full relative h-[160px] sm:h-[250px] md:h-[450px] overflow-hidden rounded-none shadow-sm shrink-0">
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-500 group-hover:bg-ink-950/10 pointer-events-none" />
                    </div>

                    {/* Text Side */}
                    <div className="w-full flex flex-col justify-center flex-grow">
                      <span className="font-sans text-[7px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-burgundy-600 font-bold mb-1.5 sm:mb-3 flex items-center gap-1 sm:gap-2">
                        <span className="w-3 sm:w-6 h-px bg-burgundy-600" />
                        <span className="hidden sm:inline">{String(i + 1).padStart(2, '0')} - </span>
                        {product.category}
                      </span>

                      <h2 className="text-base sm:text-2xl md:text-4xl font-serif text-ink-950 mb-2 sm:mb-4 leading-tight">{product.title}</h2>
                      
                      <p className="font-sans text-ink-600 text-[9px] sm:text-sm md:text-base mb-3 sm:mb-8 leading-relaxed line-clamp-4">
                        {product.description}
                      </p>
                      
                      {/* Buttons: Securely locked to a single line on mobile */}
                      <div className="flex flex-row flex-nowrap items-center gap-1 sm:gap-2 md:gap-3 w-full mt-auto">
                        <button
                          onClick={() => handleEnquire(product.title)}
                          className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-1 py-1.5 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-none font-sans text-[7px] sm:text-[10px] md:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap overflow-hidden"
                        >
                          <MessageCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="truncate">INQUIRE</span>
                        </button>
                        
                        <button
                          onClick={() => navigate(`/products/${product.slug}`)}
                          className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-1 py-1.5 sm:px-4 sm:py-3 border border-ink-900 hover:bg-ink-900 hover:text-white text-ink-900 rounded-none font-sans text-[7px] sm:text-[10px] md:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase transition-all whitespace-nowrap overflow-hidden"
                        >
                          <span className="truncate">DETAILS</span>
                          <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
