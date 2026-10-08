import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Search } from 'lucide-react';
import { useBanner } from '@/hooks/useBanner';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { useLeadGatekeeper } from '@/contexts/LeadContext';
import { projects as allProjects } from '@/lib/data';

type Props = { navigate: (path: string) => void };

const categories = ['All', 'Residential', 'commercial', 'hospital', 'industry', 'retail'];
export default function Projects({ navigate }: Props) {
  const { requireLead } = useLeadGatekeeper();
  const { banner, isLoading: isBannerLoading } = useBanner('project');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filter, setFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const locations = ['All', ...Array.from(new Set(allProjects.map(p => p.location || p.location))).filter(Boolean)] as string[];

  const projects = allProjects.filter(p => {
    const matchCat = filter === 'All' || p.category === filter || p.category?.toLowerCase() === filter.toLowerCase();
    const matchLoc = locationFilter === 'All' || (p.location || p.location) === locationFilter;
    const searchMatch = !searchQuery || p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || p.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchLoc && searchMatch;
  });

  const loading = false;

  return (
    <div className="bg-white min-h-screen">
      {(isBannerLoading || banner?.image) && (
      <>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div 
          className={`absolute inset-0 z-0 w-full h-full ${banner?.link?.[0] ? 'cursor-pointer' : ''}`}
          onClick={() => {
            const link = banner?.link?.[0];
            if (link) {
              if (link.startsWith('http')) window.location.href = link;
              else navigate(link);
            }
          }}
        >
          {isBannerLoading ? (
            <div className="absolute inset-0 z-20"></div>
          ) : banner?.image ? (
            <img src={banner.image} alt="Banner" className="w-full h-full object-cover object-center" />
          ) : (
            <div className="absolute inset-0 bg-ink-950 flex items-center justify-center"></div>
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>{banner?.subtitle}</div>
              <h1 className="heading-1 mb-6 text-balance text-white">{banner?.title}</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">
                  {banner?.description}
                </p>
            </div>
          </FadeIn>
        </div>
      </section>
      </>
      )}
      {!isBannerLoading && !banner?.image && <div className="pt-24 lg:pt-32" />}

      <section className="py-6 border-y border-ink-200 bg-[#F8F7F5]">
        <div className="container-luxe flex flex-col md:flex-row items-center justify-between gap-4">
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-ink-900 hover:text-burgundy-600 transition-colors"
          >
            Filters
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
          
          

          <span className="font-sans text-xs md:text-sm uppercase tracking-widest text-ink-600 font-medium whitespace-nowrap">
            <strong className="text-ink-900">{projects.length}</strong> Projects
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
                      {locations.map(loc => (
                        <label key={loc} className="flex items-center gap-4 cursor-pointer group">
                          <div className={`w-[18px] h-[18px] border flex items-center justify-center transition-colors ${locationFilter === loc ? 'bg-ink-900 border-ink-900' : 'border-ink-300 group-hover:border-ink-500 bg-transparent'}`}>
                            {locationFilter === loc && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className={`font-sans text-[11px] uppercase tracking-wide ${locationFilter === loc ? 'text-ink-950 font-bold' : 'text-ink-700 group-hover:text-ink-900'}`}>{loc}</span>
                          <input type="radio" name="location" className="hidden" checked={locationFilter === loc} onChange={() => { setLocationFilter(loc); setShowMobileFilters(false); }} />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-ink-200 sticky bottom-0 bg-[#F9F9F9]">
                  <button onClick={() => { setFilter('All'); setLocationFilter('All'); setShowMobileFilters(false); }} className="w-full py-4 border border-ink-900 text-ink-900 font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-ink-900 hover:text-white transition-colors">
                    Clear All Filters
                  </button>
                </div>
              </motion.aside>
            </>
          )}</AnimatePresence>, document.body)}

        <div className="container-luxe">
          {loading ? (
             <div className="flex justify-center items-center py-20">
               
             </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence mode="popLayout">
                {projects.map((project, i) => (
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
                      onClick={() => requireLead(() => navigate('/projects/' + project.slug), { title: 'View Project', description: 'Please fill in your details to view full project information.', source: 'Project Detail', productInterest: project.title })}
                      className="group relative block w-full aspect-[4/5] overflow-hidden rounded-sm"
                      style={{ background: 'rgba(12,10,9,0.3)', border: '1px solid rgba(212,168,82,0.08)' }}
                    >
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[1.8s] ease-lux group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-ink-100">
                          <span className="text-ink-400 text-xs">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 text-left flex flex-col items-start justify-end">
                        <span className="font-sans text-[10px] tracking-widest text-white/70 uppercase mb-2 block">{project.category}</span>
                        <h3 className="font-serif text-lg md:text-xl text-white mb-4 group-hover:text-gold-400 transition-colors duration-500 leading-tight drop-shadow-sm line-clamp-2">{project.title}</h3>
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
              {projects.length === 0 && (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <span className="font-serif text-2xl text-ink-400 mb-4">No projects found matching filters</span>
                  <button onClick={() => { setFilter('All'); setLocationFilter('All'); }} className="border-b border-ink-900 pb-1 font-sans text-xs uppercase tracking-widest font-bold text-ink-900">Clear Filters</button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
