import { useState } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import TiltCard from '@/components/TiltCard';
import { productsList } from '@/lib/data';

type Props = { navigate: (path: string) => void };
const categories = ['All', 'Wallpaper', 'Glass Film'];

export default function Products({ navigate }: Props) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? productsList : productsList.filter((p) => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
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
                  className={`px-6 py-3 font-sans text-sm tracking-wide-2 uppercase rounded-sm border transition-all duration-500 ease-lux ${
                    filter === cat
                      ? 'border-burgundy-600 text-burgundy-700 bg-burgundy-600/5'
                      : 'border-ink-600 text-ink-700 hover:border-ink-400 hover:text-ink-900'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                      className="card-luxe group flex flex-col h-full glass-shine w-full text-left"
                    >
                      <div className="aspect-square overflow-hidden relative w-full">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                        {product.isNewArrival && (
                          <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-burgundy-600 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-sm">
                            <span className="font-sans text-[9px] md:text-xs tracking-wide-2 uppercase">New</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-3 md:p-6 flex flex-col flex-1">
                        <span className="font-sans text-[10px] md:text-xs tracking-wide-2 uppercase text-burgundy-600 mb-1 md:mb-2 block truncate">{product.category}</span>
                        <h3 className="heading-3 text-sm md:!text-xl mb-2 md:mb-3 group-hover:text-burgundy-700 transition-colors duration-500">{product.title}</h3>
                        <p className="body-text text-xs md:text-sm flex-1 mb-3 md:mb-4 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-serif text-base md:text-xl text-ink-950 font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                          <div className="flex items-center gap-1 md:gap-2 text-burgundy-600 font-sans text-[10px] md:text-xs tracking-wide-2 uppercase">
                            View <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

