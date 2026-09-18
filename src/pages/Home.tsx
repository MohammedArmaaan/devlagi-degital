import {
  ArrowRight,
  Star,
  Shield,
  Sun,
  Sparkles,
  EyeOff,
  Phone,
  MapPin,
  Instagram,
  Quote,
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AnimatedText from '@/components/AnimatedText';
import FadeIn from '@/components/FadeIn';
import TiltCard from '@/components/TiltCard';
import Parallax from '@/components/Parallax';
import { business, services, projects, productsList } from '@/lib/data';

type Props = { navigate: (path: string) => void };

const heroBenefits = [
  { icon: EyeOff, label: 'Privacy' },
  { icon: Sun, label: 'Natural Light' },
  { icon: Shield, label: 'UV Protection' },
  { icon: Sparkles, label: 'Scratch Resistant' },
];


const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Stylish Privacy.',
    subtitle: 'Natural Light.',
  },
  {
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Custom Design.',
    subtitle: 'Flawless Finish.',
  },
  {
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Elegant Spaces.',
    subtitle: 'Modern Decor.',
  }
];

export default function Home({ navigate }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {heroSlides.map((slide, index) => (
              <div key={index} className="relative flex-[0_0_100%] h-full min-w-0">
                <motion.div className="absolute inset-0" animate={{ scale: selectedIndex === index ? 1.05 : 1 }} transition={{ duration: 6, ease: 'linear' }}>
                  <img
                    src={slide.image}
                    alt="Interior decor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 pb-24 md:pb-32 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto flex flex-col items-center"
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-white leading-[1.1] mb-6 md:mb-8 font-medium drop-shadow-lg">
                {heroSlides[selectedIndex].title.replace('.', '')}
                <br />
                {heroSlides[selectedIndex].subtitle.replace('.', '')}
              </h1>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pointer-events-auto mt-4 md:mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button onClick={() => navigate('/services')} className="btn-primary !bg-white !text-ink-950 hover:!bg-white/90 group">
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate('/projects')} className="btn-outline !text-white !border-white/30 hover:!border-white hover:!bg-white/10 group">
              <span>View Our Work</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-6 md:py-8 bg-ink-50 border-y border-burgundy-600/10">
        <div className="container-luxe px-0 md:px-4">
          <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-6 md:gap-x-16 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 md:px-0 pb-2 md:pb-0">
            {heroBenefits.map((b, i) => (
              <div key={b.label} className="flex-none flex items-center gap-3 group cursor-default snap-center">
                <div className="w-10 h-10 rounded-full border border-burgundy-600/20 flex items-center justify-center group-hover:border-burgundy-600/50 group-hover:bg-burgundy-600/5 transition-all duration-500 shrink-0">
                  <b.icon className="w-4 h-4 text-burgundy-600" />
                </div>
                <span className="font-sans text-sm md:text-base text-ink-800 tracking-wide font-medium uppercase whitespace-nowrap">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-24 md:py-32 bg-grain relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-burgundy-600/40 to-transparent" />
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="section-label mb-6">Who We Are</div>
                <h2 className="heading-2 mb-6 text-balance">
                  <AnimatedText text="Crafting Decor That Defines Spaces" />
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="body-text mb-6">
                  {business.name} is a Ahmedabad-based manufacturer specializing in customized
                  wallpaper and decorative glass film. From our workshop in Behrampura, we design,
                  print, and install decor solutions that combine classic elegance with modern
                  functionality.
                </p>
                <p className="body-text mb-8">
                  Every project begins with understanding your space and ends with a flawless
                  installation — whether it is a single feature wall or a complete commercial
                  interior.
                </p>
                <button onClick={() => navigate('/about')} className="btn-ghost group">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.25} y={60}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {[
                      { src: 'https://images.pexels.com/photos/6583344/pexels-photo-6583344.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Design material samples', aspect: 'aspect-[3/4]' },
                      { src: 'https://images.pexels.com/photos/12995673/pexels-photo-12995673.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Textured wallpaper', aspect: 'aspect-square' },
                    ].map((img, i) => (
                      <Parallax key={i} offset={20} className={img.aspect}>
                        <div className={`${img.aspect} overflow-hidden rounded-sm group relative glass-shine`}>
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                        </div>
                      </Parallax>
                    ))}
                  </div>
                  <div className="space-y-4 pt-8">
                    {[
                      { src: 'https://images.pexels.com/photos/7511755/pexels-photo-7511755.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Office glass partition', aspect: 'aspect-square' },
                      { src: 'https://images.pexels.com/photos/6580002/pexels-photo-6580002.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Color swatches', aspect: 'aspect-[3/4]' },
                    ].map((img, i) => (
                      <Parallax key={i} offset={30} className={img.aspect}>
                        <div className={`${img.aspect} overflow-hidden rounded-sm group relative glass-shine`}>
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                        </div>
                      </Parallax>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="section-label justify-center mb-6" style={{ display: 'inline-flex' }}>What We Offer</div>
              <h2 className="heading-2 mb-4 text-balance"><AnimatedText text="Our Services" /></h2>
              <div className="gold-divider-center mb-6" />
              <p className="body-text">
                From decorative glass film to custom-printed wallpaper, we manufacture and install
                decor solutions for residential and commercial spaces.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 0.12} y={50}>
                <TiltCard intensity={6} className="h-full">
                  <motion.button
                    whileHover={{ y: -6 }}
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="card-luxe group text-left w-full h-full flex flex-col glass-shine"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <h3 className="heading-3 text-lg md:!text-xl mb-2 md:mb-3 group-hover:text-burgundy-700 transition-colors duration-500">{service.title}</h3>
                      <p className="body-text text-xs md:text-sm flex-1">{service.short}</p>
                      <div className="mt-3 md:mt-4 flex items-center gap-1 md:gap-2 text-burgundy-600 font-sans text-[10px] md:text-xs tracking-wide-2 uppercase">
                        Learn More
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.button>
                </TiltCard>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="text-center mt-12">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/services')} className="btn-outline group">
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products preview */}
      <section className="py-24 md:py-32 bg-grain relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-burgundy-600/40 to-transparent" />
        <div className="container-luxe">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="section-label mb-6">Shop Premium</div>
                <h2 className="heading-2 text-balance"><AnimatedText text="New Arrivals" /></h2>
              </div>
              <button onClick={() => navigate('/products')} className="btn-ghost group">
                View All Products
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {productsList.filter(p => p.isNewArrival).slice(0, 4).map((product, i) => (
              <FadeIn key={product.slug} delay={i * 0.1} y={40}>
                <TiltCard intensity={4} className="h-full">
                  <motion.button
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="card-luxe group flex flex-col h-full glass-shine w-full text-left"
                  >
                    <div className="aspect-square overflow-hidden relative w-full">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-burgundy-600 text-white px-2 py-1 md:px-2.5 md:py-1 rounded-sm">
                        <span className="font-sans text-[8px] md:text-[10px] tracking-wide-2 uppercase">New</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-3 md:p-5 flex flex-col flex-1">
                      <span className="font-sans text-[9px] md:text-[10px] tracking-wide-2 uppercase text-burgundy-600 mb-1 block truncate">{product.category}</span>
                      <h3 className="heading-3 text-sm md:text-lg mb-2 group-hover:text-burgundy-700 transition-colors duration-500 line-clamp-1">{product.title}</h3>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-serif text-sm md:text-lg text-ink-950 font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </motion.button>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container-luxe">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="section-label mb-6">Selected Work</div>
                <h2 className="heading-2 text-balance"><AnimatedText text="Recent Projects" /></h2>
              </div>
              <button onClick={() => navigate('/projects')} className="btn-ghost group">
                View All Projects
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.slice(0, 3).map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.15} y={60}>
                <motion.button
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="group relative block w-full aspect-[4/5] overflow-hidden rounded-sm"
                  style={{
                    background: 'rgba(12,10,9,0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212,168,82,0.08)',
                  }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-[1.8s] ease-lux group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-700 group-hover:from-black group-hover:via-black/60" />
                  <div className="absolute inset-4 border border-burgundy-600/0 group-hover:border-burgundy-600/50 rounded-sm transition-all duration-700 ease-lux" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-left">
                    <span className="font-sans text-[10px] md:text-xs tracking-wide-2 uppercase text-burgundy-400 mb-1 md:mb-2 block">{project.category}</span>
                    <h3 className="font-serif text-base md:text-xl text-white group-hover:text-burgundy-300 transition-colors duration-500">{project.title}</h3>
                    <div className="mt-2 md:mt-3 flex items-center gap-1 md:gap-2 text-white/90 font-sans text-xs md:text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-lux">
                      View <span className="hidden md:inline">Project</span> <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                  </div>
                </motion.button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Review strip */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 right-20 w-40 h-40 rounded-full bg-burgundy-700/10 blur-[80px]"
        />
        <div className="container-luxe">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="section-label mb-6">Customer Trust</div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Star className="w-7 h-7 fill-burgundy-600 text-burgundy-600" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="font-serif text-4xl text-ink-950">{business.rating}</span>
                </div>
                <h2 className="heading-3 mb-4 text-balance">Rated 5.0 on Google by our customers</h2>
                <p className="body-text mb-8">
                  We are proud of the trust our customers place in us. Every project — big or
                  small — receives the same attention to detail and commitment to quality.
                </p>
                <div className="flex gap-4">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')} className="btn-primary group">
                    <span>Start Your Project</span>
                  </motion.button>
                  <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={business.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline group">
                    <Instagram className="w-4 h-4" />
                    <span>Follow Us</span>
                  </motion.a>
                </div>
              </div>

              <TiltCard intensity={5}>
                <div className="glass rounded-sm p-8 md:p-10 relative glass-shine">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Quote className="w-16 h-16 text-burgundy-600/20 mb-4" />
                  </motion.div>
                  <p className="font-serif text-xl md:text-2xl text-ink-900 leading-relaxed italic mb-6">
                    "Excellent quality and professional service. The decorative glass film they
                    installed transformed our office completely. Highly recommended for anyone
                    looking for customized decor solutions in Ahmedabad."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-burgundy-800/30 border border-burgundy-600/40 flex items-center justify-center">
                      <span className="font-serif text-burgundy-300 text-lg">A</span>
                    </div>
                    <div>
                      <div className="font-sans text-sm text-ink-900 font-medium">Verified Customer</div>
                      <div className="font-sans text-xs text-ink-600">Google Reviews</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/4 blur-[150px]"
        />
        <div className="relative container-luxe">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <div className="section-label justify-center mb-6" style={{ display: 'inline-flex' }}>Let's Talk</div>
              <h2 className="heading-2 mb-6 text-balance"><AnimatedText text="Ready to Transform Your Space?" /></h2>
              <p className="body-text mb-10 max-w-xl mx-auto">
                Whether you have a clear vision or just a rough idea, our team is here to help.
                Get in touch for a free consultation and quotation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')} className="btn-primary group">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </motion.button>
                <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={`tel:${business.phoneRaw}`} className="btn-outline group">
                  <Phone className="w-4 h-4" />
                  <span>{business.phone}</span>
                </motion.a>
              </div>
              <div className="mt-10 flex items-center justify-center gap-2 text-ink-600">
                <MapPin className="w-4 h-4 text-burgundy-600" />
                <span className="font-sans text-sm">{business.shortAddress}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
