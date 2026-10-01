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
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AnimatedText from '@/components/AnimatedText';
import TestimonialCard from '@/components/TestimonialCard';
import FadeIn from '@/components/FadeIn';
import TiltCard from '@/components/TiltCard';
import Parallax from '@/components/Parallax';
import {
  business,
  services,
  projects,
  productsList,
  categories,
} from '@/lib/data';

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentServiceIdx, setCurrentServiceIdx] = useState(0);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedProductTitle, setSelectedProductTitle] = useState("");

  const proceedToWhatsApp = (title: string) => {
    const text = 'Hi, I am interested in ' + title;
    window.open('https://wa.me/919023791865?text=' + encodeURIComponent(text), '_blank');
  };

  const handleEnquire = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    if (!localStorage.getItem('lead_captured')) {
      setSelectedProductTitle(title);
      setShowLeadModal(true);
    } else {
      proceedToWhatsApp(title);
    }
  };
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceIdx((prev) => (prev + 1) % Math.min(3, services.length));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const scrollProducts = (direction: 'left' | 'right') => {
    if (productsRef.current) {
      const scrollAmount = window.innerWidth >= 1024 ? 400 : 300;
      productsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
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
  const [testimonialRef, testimonialApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

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
        <div className="absolute inset-0 flex flex-col items-center justify-start text-center p-6 pt-[45vh] md:pt-[45vh] z-10 pointer-events-none">
          <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto flex flex-col items-center"
              >
                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] text-white leading-[1.1] mb-6 md:mb-8 font-medium drop-shadow-2xl flex flex-wrap justify-center items-center text-center">
                  {heroSlides[selectedIndex].title.replace('.', '').split('').map((char, index) => (
                    <motion.span
                      key={`title-${index}`}
                      initial={{ opacity: 0, display: 'inline-block' }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: index * 0.05 }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                  <div className="w-full h-0" />
                  {heroSlides[selectedIndex].subtitle.replace('.', '').split('').map((char, index) => (
                    <motion.span
                      key={`subtitle-${index}`}
                      initial={{ opacity: 0, display: 'inline-block' }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: (heroSlides[selectedIndex].title.length * 0.05) + (index * 0.05) }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                  
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
          <div className="flex justify-between md:justify-center items-start md:items-center gap-1 sm:gap-2 md:gap-16 px-2 md:px-0">
            {heroBenefits.map((b, i) => (
              <div key={b.label} className="flex-1 flex flex-col md:flex-row items-center gap-1.5 md:gap-3 group cursor-default">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-burgundy-600/20 flex items-center justify-center group-hover:border-burgundy-600/50 group-hover:bg-burgundy-600/5 transition-all duration-500 shrink-0">
                  <b.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-burgundy-600" />
                </div>
                <span className="font-sans text-[9px] sm:text-[10px] md:text-base text-ink-800 tracking-wider font-medium uppercase text-center leading-tight md:whitespace-nowrap">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section id="collections" className="py-12 md:py-16 bg-grain relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-burgundy-600/40 to-transparent" />
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="section-label justify-center mb-6" style={{ display: 'inline-flex' }}>Explore by Category</div>
              <h2 className="heading-2 mb-4 text-balance"><AnimatedText text="Shop Our Collections" /></h2>
              <div className="gold-divider-center mb-6" />
              <p className="body-text">
                Browse our wide range of premium wallpapers and decorative glass films designed to elevate any interior.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto auto-rows-[220px] md:auto-rows-[340px]">
                            {categories.map((cat, i) => {
                const isWide = i % 6 === 0 || i % 6 === 5;
                const isDark = cat.theme === 'dark';
                const textColor = isDark ? 'text-white' : 'text-black';
                const borderColor = isDark ? 'border-white' : 'border-black';
                const hoverColor = isDark ? 'group-hover:text-white/80' : 'group-hover:text-burgundy-600';
                const hoverBorder = isDark ? 'group-hover:border-white/80' : 'group-hover:border-burgundy-600';
                
                return (
                  <FadeIn key={cat.slug} delay={i * 0.1} className={isWide ? 'col-span-2' : 'col-span-1'}>
                    <button
                      onClick={() => navigate('/products?category=' + cat.slug)}
                      className="group relative overflow-hidden rounded-sm flex flex-col text-left transition-all duration-700 hover:shadow-xl w-full h-full bg-ink-50"
                    >
                      {/* Full Cover Image */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img 
                          src={cat.image} 
                          alt={cat.title} 
                          className="w-full h-full object-cover transition-transform duration-[2s] ease-lux group-hover:scale-110"
                        />
                        {/* Optional subtle gradient overlay just to ensure text legibility if needed, but keeping it minimal as requested */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/60 via-black/10' : 'from-white/60 via-white/10'} to-transparent opacity-60`} />
                      </div>
                      
                      {/* Text Overlay */}
                      <div className="relative z-10 flex flex-col p-5 md:p-8 h-full w-full justify-end">
                        <h3 className={`font-serif leading-snug mb-3 ${isWide ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} ${textColor}`}>
                          {cat.title}
                        </h3>
                        <div className="mt-auto pt-4">
                          <span className={`inline-flex items-center gap-2 font-sans text-[9px] md:text-[10px] uppercase font-bold tracking-widest transition-colors border-b pb-1 w-max ${textColor} ${borderColor} ${hoverColor} ${hoverBorder}`}>
                            EXPLORE <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

      {/* Services preview - Professional Edition */}
      <section className="py-12 md:py-16 relative bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
        <div className="container-luxe max-w-7xl mx-auto">
          {/* Main Title Area */}
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-burgundy-600 font-bold mb-4 block">
                Expertise
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-ink-950 mb-6">Our Services</h2>
              <div className="w-12 h-0.5 bg-burgundy-600 mx-auto" />
            </div>
          </FadeIn>

          <div className="relative flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
              
              {/* Left Side - Image */}
              <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[600px] w-full group overflow-hidden bg-ink-50">
                <AnimatePresence>
                  <motion.div
                    key={currentServiceIdx}
                    initial={{ x: "100%", opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={services[currentServiceIdx].image}
                      alt={services[currentServiceIdx].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-ink-950/10 transition-opacity duration-500 group-hover:bg-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Minimal Indicators overlaid on image (Desktop) */}
                <div className="hidden lg:flex absolute bottom-8 left-8 gap-3 z-10">
                  {services.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentServiceIdx(idx)}
                      className="group/dot p-2"
                      aria-label={`Go to slide ${idx + 1}`}
                    >
                      <div className={`transition-all duration-500 h-[2px] ${currentServiceIdx === idx ? 'w-8 bg-white' : 'w-4 bg-white/50 group-hover/dot:bg-white/80'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Text Box */}
              <div className="lg:col-span-5 flex flex-col justify-center relative z-10 lg:-ml-16 xl:-ml-24 lg:my-12">
                <div className="bg-white p-6 sm:p-10 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-ink-100/50">
                  <div className="mb-4">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-ink-400 uppercase font-bold">
                      {String(currentServiceIdx + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentServiceIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-ink-950 mb-6 leading-tight flex flex-wrap">
                        {services[currentServiceIdx].title.split('').map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, display: 'inline-block' }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1, delay: index * 0.03 }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))}
                      </h3>
                      <p className="body-text text-ink-600 mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed line-clamp-4">
                        {services[currentServiceIdx].description}
                      </p>
                      
                      <button
                        onClick={() => navigate(`/services/${services[currentServiceIdx].slug}`)}
                        className="inline-flex items-center gap-3 font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold text-ink-950 group/btn transition-colors hover:text-burgundy-600"
                      >
                        <span className="border-b border-ink-950 pb-1 group-hover/btn:border-burgundy-600 transition-colors">Discover More</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-2" />
                      </button>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-ink-100">
                    <button 
                      onClick={() => setCurrentServiceIdx(prev => prev === 0 ? services.length - 1 : prev - 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-ink-200 text-ink-500 hover:border-ink-900 hover:text-ink-900 hover:bg-ink-50 transition-all"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentServiceIdx(prev => (prev + 1) % services.length)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-ink-200 text-ink-500 hover:border-ink-900 hover:text-ink-900 hover:bg-ink-50 transition-all"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    {/* Mobile Indicators */}
                    <div className="flex lg:hidden ml-auto items-center gap-2">
                      {services.map((_, idx) => (
                        <div key={idx} className={`h-1 transition-all duration-500 rounded-full ${currentServiceIdx === idx ? 'w-4 bg-ink-900' : 'w-1.5 bg-ink-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button onClick={() => navigate('/services')} className="btn-ghost group inline-flex items-center">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Products preview */}
      <section className="py-12 md:py-16 bg-grain relative overflow-hidden">
        <div className="container-luxe">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 md:mb-12">
              <div>
                <div className="section-label mb-6">Shop Premium</div>
                <h2 className="heading-2 text-balance"><AnimatedText text="New Arrivals" /></h2>
              </div>
            </div>
          </FadeIn>

          <div className="mt-8 md:mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {productsList.filter(p => p.isNewArrival).map((product, i) => (
                <div key={product.slug} className="h-full">
                  <FadeIn delay={i * 0.05} className="h-full">
                    <TiltCard intensity={5} className="h-full">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(`/products/${product.slug}`)}
                        className="card-luxe group flex flex-col h-full glass-shine w-full text-left cursor-pointer"
                      >
                        <div className="aspect-square md:aspect-[4/3] overflow-hidden relative w-full">
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                          <div className="absolute top-3 right-3 bg-burgundy-600 text-white px-2.5 py-1 rounded-sm z-10 shadow-md">
                            <span className="font-sans text-[9px] md:text-[11px] tracking-widest uppercase font-bold">New</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="p-4 md:p-5 flex flex-col flex-1">
                          <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-burgundy-600 mb-1.5 md:mb-2 block line-clamp-1 font-semibold">{product.category}</span>
                          <h3 className="text-base md:text-lg font-serif text-ink-950 mb-3 group-hover:text-burgundy-700 transition-colors duration-500 leading-snug line-clamp-2 min-h-[3rem]">{product.title}</h3>
                          
                          <div className="flex flex-col gap-3 mt-auto pt-3 md:pt-4 border-t border-ink-100">
                            <div className="flex items-center justify-between">
                              <span className="font-serif text-base md:text-lg text-ink-950 font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
                              <div className="flex items-center gap-1.5 text-burgundy-600 font-sans text-[10px] md:text-xs tracking-widest uppercase font-medium">
                                View <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleEnquire(e, product.title)}
                                className="w-full flex items-center justify-center gap-1.5 py-1.5 md:py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded font-sans text-[9px] md:text-[10px] font-bold tracking-widest transition-all shadow-sm hover:shadow-md"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                INQUIRE
                              </button>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <button onClick={() => navigate('/products')} className="btn-primary group inline-flex items-center px-8 py-4">
              <span className="text-sm tracking-widest font-bold">VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-[#f7f7f7]">
        <div className="container-luxe max-w-7xl mx-auto">
          {/* Top Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-12 items-center mb-10">
            {/* Left Text */}
            <FadeIn>
              <div className="flex flex-col justify-center">
                <span className="font-sans text-[11px] tracking-widest uppercase font-bold text-ink-600 mb-4 block">MOST RECENT</span>
                <h2 className="text-4xl md:text-5xl font-bold text-ink-950 mb-6">Projects</h2>
                <p className="body-text text-ink-600 mb-8 max-w-sm leading-relaxed">
                  We have our Distributor all over the world and we have completed more than 4,00,000 projects.
                </p>
                <div>
                  <button 
                    onClick={() => navigate('/projects')} 
                    className="inline-flex items-center justify-center rounded-full border border-ink-300 px-6 py-2.5 text-ink-800 font-sans text-sm tracking-wide font-medium hover:border-burgundy-600 hover:text-burgundy-600 transition-colors w-fit group"
                  >
                    View All Projects <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </FadeIn>
            {/* Right Main Slider */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProjectIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-sm"
                  >
                    <img 
                      src={projects[currentProjectIdx]?.image} 
                      alt={projects[currentProjectIdx]?.title} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Arrows */}
                <button 
                  onClick={() => setCurrentProjectIdx(prev => prev === 0 ? projects.slice(0,4).length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm text-ink-900 hover:bg-white transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setCurrentProjectIdx(prev => (prev + 1) % projects.slice(0,4).length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm text-ink-900 hover:bg-white transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {projects.slice(0, 4).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProjectIdx(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentProjectIdx === idx ? 'w-1.5 h-1.5 bg-ink-900' : 'w-1 h-1 bg-ink-300 hover:bg-ink-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Bottom Grid - Project Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 md:mt-20">
            {projects[currentProjectIdx]?.gallery?.slice(0, 3).map((image, i) => (
              <FadeIn key={`${currentProjectIdx}-${i}`} delay={i * 0.1}>
                <div
                  className="group relative block w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-sm bg-ink-100"
                >
                  <img 
                    src={image} 
                    alt={`${projects[currentProjectIdx].title} gallery ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/10 transition-colors duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Review strip */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grain opacity-50" />
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
              <div className="max-w-2xl">
                <div className="section-label mb-6 justify-center md:justify-start" style={{ display: 'inline-flex' }}>Customer Trust</div>
                <h2 className="heading-2 mb-6">Loved by Our Clients</h2>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-burgundy-600 text-burgundy-600" />
                    ))}
                  </div>
                  <span className="font-sans text-sm text-ink-600 font-medium tracking-wide">Rated {business.rating} on Google</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <motion.a 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }} 
                  href={business.mapsUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary flex items-center gap-2"
                >
                  <Star className="w-4 h-4 fill-white" />
                  <span>Write a Review</span>
                </motion.a>
              </div>
            </div>

                        <div className="w-full max-w-4xl mx-auto overflow-hidden" ref={testimonialRef}>
              <div className="flex">
              {[
                {
                  quote: "Excellent quality and professional service. The decorative glass film they installed transformed our office completely. Highly recommended for anyone looking for customized decor solutions.",
                  name: "Anil Patel",
                  title: "Business Owner",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                },
                {
                  quote: "Very impressed with their wallpaper collection and installation. The team was punctual, polite, and left everything spotless. Our living room looks incredibly elegant now.",
                  name: "Priya Sharma",
                  title: "Interior Designer",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                },
                {
                  quote: "Devlaji Digital provided customized blinds for our new restaurant. The print quality is fantastic and the material is top-notch. Great value for money and excellent support.",
                  name: "Rahul Desai",
                  title: "Restaurant Manager",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
                }
              ].map((review, idx) => (
                <div 
                  key={idx}
                  className="w-full flex-[0_0_100%] min-w-0 flex justify-center px-4"
                >
                  <TestimonialCard 
                    name={review.name}
                    title={review.title}
                    image={review.image}
                    quote={review.quote}
                  />
                </div>
              ))}
            </div>
                </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 relative overflow-hidden">
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



































