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
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Products Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-ink-950/70" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Products</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">Our Products</h1>
              <div className="w-12 h-0.5 bg-burgundy-500 mx-auto mb-6" />
              <p className="text-white/80 font-sans text-sm md:text-base leading-relaxed tracking-wide">
                Explore our premium range of customizable wallpapers, blinds, and decorative films designed to elevate your space.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 md:py-24 relative bg-ink-50">
        <div className="container-luxe max-w-5xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
            {genericProducts.map((product, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 group`}
                >
                  {/* Image Side */}
                  <div className="w-full md:w-1/2 relative h-[220px] md:h-[280px] lg:h-[320px] overflow-hidden rounded-sm shadow-xl">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ink-950/10 transition-colors duration-500 group-hover:bg-transparent pointer-events-none" />
                  </div>

                  {/* Text Side */}
                  <div className="w-full md:w-1/2 relative flex flex-col justify-center">
                    {/* Icon or Label */}
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-burgundy-600 font-bold mb-3 flex items-center gap-2">
                      <span className="w-6 h-px bg-burgundy-600" />
                      {product.category}
                    </span>

                    <h2 className="text-3xl md:text-4xl font-serif text-ink-950 mb-4 leading-tight">{product.title}</h2>
                    
                    <p className="font-sans text-ink-600 text-sm md:text-[15px] mb-8 leading-relaxed max-w-md">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleEnquire(product.title)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-sans text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        INQUIRE
                      </button>
                      
                      <button
                        onClick={() => navigate(`/products/${product.slug}`)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-ink-900 hover:bg-ink-900 hover:text-white text-ink-900 rounded-full font-sans text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all"
                      >
                        VIEW DETAILS
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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
