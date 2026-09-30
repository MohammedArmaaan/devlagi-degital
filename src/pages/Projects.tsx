import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import { projects } from '@/lib/data';

type Props = { navigate: (path: string) => void };
const categories = ['All', 'Residential', 'Commercial'];

export default function Projects({ navigate }: Props) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Projects Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Portfolio</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Our Projects</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">
                A selection of our completed work across Ahmedabad — from residential feature walls
                to commercial glass installations and full interior transformations.
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
            <strong className="text-ink-900">{filtered.length}</strong> Projects
          </span>

          <div className="hidden md:flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-ink-900 cursor-pointer bg-ink-900 text-white px-4 py-2 rounded-sm">
            NEWEST <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
                      Location
                      <svg className="w-3 h-3 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    </h4>
                    <div className="space-y-4">
                      {['Mumbai', 'Delhi', 'Bangalore', 'Dubai'].map(loc => (
                        <label key={loc} className="flex items-center gap-4 cursor-pointer group">
                          <div className={`w-[18px] h-[18px] border bg-transparent flex items-center justify-center transition-colors border-ink-300 group-hover:border-ink-500`}>
                          </div>
                          <span className={`font-sans text-[11px] uppercase tracking-wide text-ink-700 group-hover:text-ink-900`}>{loc}</span>
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
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.button
                    whileHover={{ y: -6 }}
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="group relative block w-full aspect-[4/5] overflow-hidden rounded-sm"
                    style={{ background: 'rgba(12,10,9,0.3)', border: '1px solid rgba(212,168,82,0.08)' }}
                  >
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[1.8s] ease-lux group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 text-left flex flex-col items-start justify-end">
                      <span className="font-sans text-[10px] tracking-widest text-white/70 uppercase mb-2 block">{project.category}</span>
                      <h3 className="font-serif text-lg md:text-xl text-white mb-4 group-hover:text-gold-400 transition-colors duration-500 leading-tight drop-shadow-sm">{project.title}</h3>
                      <div className="flex items-center justify-between w-full mt-auto">
                        <span className="text-white/90 text-xs font-sans tracking-wide">View Project</span>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-ink-950 text-white transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}</AnimatePresence>
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center flex flex-col items-center">
                <span className="font-serif text-2xl text-ink-400 mb-4">No projects found in this category</span>
                <button onClick={() => setFilter('All')} className="border-b border-ink-900 pb-1 font-sans text-xs uppercase tracking-widest font-bold text-ink-900">View All Projects</button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}






