import { ArrowLeft, ArrowRight, MapPin, Layers } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import TiltCard from '@/components/TiltCard';
import { projects, business } from '@/lib/data';

type Props = { slug: string; navigate: (path: string) => void };

export default function ProjectDetail({ slug, navigate }: Props) {
  const project = projects.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!project) {
    return (
      <div className="bg-white min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Project Not Found</h1>
          <button onClick={() => navigate('/projects')} className="btn-primary"><span>Back to Projects</span></button>
        </div>
      </div>
    );
  }

  const currentIndex = projects.indexOf(project);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const gallery = project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[60vh] md:h-[70vh] pt-32 overflow-hidden">
        <motion.img initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative container-luxe h-full flex flex-col justify-end pb-12">
          <FadeIn>
            <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-ink-700 hover:text-burgundy-700 transition-colors duration-500 mb-4 font-sans text-sm">
              <ArrowLeft className="w-4 h-4" /> All Projects
            </button>
            <span className="font-sans text-xs tracking-wide-3 uppercase text-burgundy-600 mb-3 block">{project.category}</span>
            <h1 className="heading-1 mb-4 text-balance"><AnimatedText text={project.title} /></h1>
            <div className="flex items-center gap-2 text-ink-700">
              <MapPin className="w-4 h-4 text-burgundy-600" />
              <span className="font-sans text-sm">{project.location}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-luxe">
          <FadeIn y={60}>
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm mb-4 group" style={{ border: '1px solid rgba(212,168,82,0.1)' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={gallery[activeImage]}
                  alt={`${project.title} — image ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-sm border-2 transition-all duration-500 ease-lux ${activeImage === i ? 'border-burgundy-600 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="section-label mb-6">The Challenge</div>
                <h2 className="heading-3 mb-4">Client Requirement</h2>
                <p className="body-text text-lg mb-10">{project.requirement}</p>
                <div className="section-label mb-6">Our Approach</div>
                <h2 className="heading-3 mb-4">The Solution</h2>
                <p className="body-text text-lg">{project.solution}</p>
              </FadeIn>
            </div>
            <div className="lg:col-span-4">
              <FadeIn delay={0.15} y={50}>
                <TiltCard intensity={4}>
                  <div className="glass rounded-sm p-6 md:p-8 glass-shine">
                    <h3 className="font-sans text-xs tracking-wide-2 uppercase text-burgundy-600 mb-6">Project Details</h3>
                    <dl className="space-y-4">
                      {[
                        { label: 'Category', value: project.category },
                        { label: 'Location', value: project.location },
                        { label: 'Materials', value: project.materials },
                      ].map((item) => (
                        <div key={item.label}>
                          <dt className="font-sans text-xs text-ink-600 uppercase tracking-wide-2 mb-1">{item.label}</dt>
                          <dd className="font-sans text-sm text-ink-900">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-8 pt-8 border-t border-ink-200/40">
                      <div className="flex items-center gap-2 text-ink-700 mb-4">
                        <Layers className="w-4 h-4 text-burgundy-600" />
                        <span className="font-sans text-sm">Want a similar project?</span>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/contact')} className="btn-primary w-full group"><span>Request a Quote</span></motion.button>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-ink-200/30">
        <div className="container-luxe">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate(`/projects/${nextProject.slug}`)}
            className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full"
          >
            <div>
              <span className="font-sans text-xs tracking-wide-3 uppercase text-burgundy-600 mb-2 block">Next Project</span>
              <h3 className="heading-3 group-hover:text-burgundy-700 transition-colors duration-500">{nextProject.title}</h3>
            </div>
            <div className="flex items-center gap-3 text-burgundy-600">
              <span className="font-sans text-sm tracking-wide-2 uppercase">View</span>
              <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
            </div>
          </motion.button>
        </div>
      </section>
    </div>
  );
}
