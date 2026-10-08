import { ArrowLeft, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import { trackInterest } from '@/lib/trackInterest';
import { useWhatsapp } from '@/hooks/useWhatsapp';
import { projects } from '@/lib/data';

type Props = { slug: string; navigate: (path: string) => void };

export default function ProjectDetail({ slug, navigate }: Props) {
  const whatsappNo = useWhatsapp();
  const project = projects.find(p => p.slug === slug);
  const loading = false;
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (project) {
      trackInterest(project.title || project.title || '', '/projects/' + project.slug);
    }
  }, [project]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center pt-32">
        
      </div>
    );
  }

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

  const gallery = project.gallery?.length > 0 ? project.gallery : (project.image ? [project.image] : []);
  const coverImage = project.image || (gallery.length > 0 ? gallery[0] : '');

  const proceedToWhatsApp = () => {
    const text = `Hi, I am interested in your project "${project.title}". Please provide more details.

Link: 
${window.location.href}`;
    window.open('https://wa.me/' + whatsappNo.replace('+', '') + '?text=' + encodeURIComponent(text), '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[60vh] md:h-[70vh] pt-32 overflow-hidden bg-ink-950">
        {coverImage && (
          <motion.img 
            initial={{ scale: 1.15 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} 
            src={coverImage} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />
        <div className="relative container-luxe h-full flex flex-col justify-end pb-12 z-20">
          <FadeIn>
            <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-500 mb-4 font-sans text-sm">
              <ArrowLeft className="w-4 h-4" /> All Projects
            </button>
            <span className="font-sans text-xs tracking-wide-3 uppercase text-white/80 mb-3 block">{project.category}</span>
            <h1 className="heading-1 mb-4 text-balance text-white"><AnimatedText text={project.title} /></h1>
            {project.location && (
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-white" />
                <span className="font-sans text-sm">{project.location}</span>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="py-16 md:py-20 bg-ink-50">
          <div className="container-luxe">
            <FadeIn y={60}>
              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm mb-4 group bg-ink-100" style={{ border: '1px solid rgba(212,168,82,0.1)' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    src={gallery[activeImage]}
                    alt={`${project.title} - image ${activeImage + 1}`}
                    className="w-full h-full object-contain md:object-cover"
                  />
                </AnimatePresence>
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
                  {gallery.map((img: string, i: number) => (
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
      )}

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <FadeIn>
                {project.requirement && (
                  <div className="mb-12">
                    <div className="section-label mb-6">The Requirement</div>
                    <p className="body-text text-lg whitespace-pre-wrap">{project.requirement}</p>
                  </div>
                )}
                
                {project.solution && (
                  <div className="mb-12">
                    <div className="section-label mb-6">Our Approach</div>
                    <p className="body-text text-lg whitespace-pre-wrap">{project.solution}</p>
                  </div>
                )}

                {project.materials && (
                  <div className="prose prose-lg max-w-none text-ink-700">
                    <div dangerouslySetInnerHTML={{ __html: project.materials }} />
                  </div>
                )}
              </FadeIn>
            </div>
            
            <div className="lg:col-span-4">
              <FadeIn delay={0.15} y={50}>
                <div className="sticky top-32 p-8 border border-ink-200 rounded-sm bg-white shadow-sm">
                  <h3 className="font-serif text-2xl text-ink-950 mb-6">Interested in a similar project?</h3>
                  <p className="text-ink-600 mb-8 font-sans text-sm leading-relaxed">
                    We bring your vision to life with customized interiors and expert craftsmanship. Let's discuss your requirements.
                  </p>
                  <button 
                    onClick={proceedToWhatsApp}
                    className="w-full h-14 bg-[#25D366] text-white text-[12px] font-sans font-bold tracking-widest uppercase hover:bg-[#128C7E] transition-colors shadow-lg flex items-center justify-center gap-3 rounded-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                    Inquire via WhatsApp
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
