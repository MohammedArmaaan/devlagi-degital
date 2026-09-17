import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import { projects } from '@/lib/data';

type Props = { navigate: (path: string) => void };
const categories = ['All', 'Residential', 'Commercial'];

export default function Projects({ navigate }: Props) {
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/60" />
                    <div className="absolute inset-4 border border-burgundy-600/0 group-hover:border-burgundy-600/50 rounded-sm transition-all duration-700 ease-lux" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-left">
                      <span className="font-sans text-[10px] md:text-xs tracking-wide-2 uppercase text-burgundy-400 mb-1 md:mb-2 block truncate">{project.category} <span className="hidden sm:inline">· {project.location}</span></span>
                      <h3 className="font-serif text-base md:text-xl text-white group-hover:text-burgundy-300 transition-colors duration-500 mb-1 md:mb-2">{project.title}</h3>
                      <div className="flex items-center gap-1 md:gap-2 text-white/90 font-sans text-[10px] md:text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-lux">
                        View <span className="hidden md:inline">Project</span> <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
