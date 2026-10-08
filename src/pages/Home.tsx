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
import Parallax from '@/components/Parallax';
import {
  business,
  services,
  projects, genericProducts,
} from '@/lib/data';


const TestimonialBubble = ({ quote, name, title, image, date }: { quote: string, name: string, title: string, image: string, date: string }) => (
  <FadeIn>
    <div className="flex flex-col mb-10 group">
      {/* Speech Bubble */}
      <div className="relative bg-white text-ink-800 p-6 md:p-8 rounded-[2rem] rounded-bl-none text-sm md:text-[15px] leading-relaxed font-sans mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] group-hover:-translate-y-1">
        <Quote className="absolute top-6 left-6 w-8 h-8 text-burgundy-600/10 -scale-y-100" />
        <p className="relative z-10 font-medium">"{quote}"</p>
        {/* The tail of the speech bubble */}
        <div className="absolute -bottom-4 left-0 w-8 h-8 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      </div>
      
      {/* User Info */}
      <div className="flex items-center justify-between gap-4 pl-2 mt-2">
        <div className="flex items-center gap-4">
          <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white" />
          <div>
            <h4 className="font-bold text-ink-950 font-sans text-xs uppercase tracking-widest">{name}</h4>
            <p className="text-burgundy-600 text-xs font-serif italic mt-0.5">{title}</p>
          </div>
        </div>
        <div className="text-ink-400 text-[10px] uppercase tracking-[0.2em] font-bold text-right mr-2">
          {date}
        </div>
      </div>
    </div>
  </FadeIn>
);


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
        <div className="absolute inset-0 flex flex-col items-center justify-start text-center p-6 pt-[50vh] md:pt-[55vh] z-10 pointer-events-none">
          <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto flex flex-col items-center"
              >
                <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-[4rem] text-white leading-[1.1] mb-6 md:mb-8 font-medium drop-shadow-2xl flex flex-wrap justify-center items-center text-center">
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
            className="pointer-events-auto mt-2 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <button onClick={() => navigate('/services')} className="btn-primary !bg-white !text-ink-950 hover:!bg-white/90 group !px-5 !py-2.5 !text-xs">
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
            <button onClick={() => navigate('/projects')} className="btn-outline !text-white !border-white/30 hover:!border-white hover:!bg-white/10 group !px-5 !py-2.5 !text-xs">
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



      
      {/* Premium Collections Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container-luxe max-w-7xl mx-auto px-4 md:px-8 mb-12">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-burgundy-600 font-bold mb-4 block">
                  Collections
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-ink-950 mb-6">Premium Collections</h2>
                <div className="w-12 h-0.5 bg-burgundy-600" />
              </div>
              <button 
                onClick={() => navigate('/collections')}
                className="bg-ink-950 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-900 transition-colors flex items-center gap-2"
              >
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="container-luxe max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {[
              { title: "Animal Wallpaper", span: "col-span-2", textColor: "text-white", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Galaxy Wallpaper", span: "col-span-1", textColor: "text-white", image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Heritage Wallpaper", span: "col-span-1", textColor: "text-white", image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Flower Theme\nWallpaper", span: "col-span-1", textColor: "text-white", image: "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Cartoon Wallpaper", span: "col-span-1", textColor: "text-white", image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Tiles Wallpaper", span: "col-span-2", textColor: "text-white", image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800" },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className={`w-full ${item.span}`}>
                <div 
                  className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden bg-ink-50 group"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Subtle dark gradient overlay so white text is always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover:from-black/80 transition-colors duration-500" />
                  
                  <div className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right ${item.textColor}`}>
                    <h3 className="font-serif text-sm sm:text-2xl md:text-[28px] whitespace-pre-line leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20 relative bg-ink-50">
        <div className="container-luxe max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-ink-950 mb-1">Featured Products</h2>
                <p className="text-ink-500 text-sm">Browse our latest decor offerings</p>
              </div>
              <button 
                onClick={() => navigate('/products')}
                className="bg-ink-950 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-900 transition-colors flex items-center gap-2"
              >
                Explore all <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
              {genericProducts.map((product, i) => (
                <div 
                  key={i}
                  className="group relative h-[220px] sm:h-[280px] md:h-[320px] cursor-pointer"
                  style={{ perspective: '1000px' }}
                >
                  {/* Flip Container */}
                  <div 
                    className="w-full h-full relative transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full  overflow-hidden bg-ink-50 border border-ink-100" style={{ backfaceVisibility: 'hidden' }}>
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Info Box */}
                      <div className="absolute bottom-3 left-3 right-3 bg-white p-2 sm:p-3 md:p-4 shadow-sm">
                        <h3 className="font-bold text-ink-950 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 truncate">{product.title}</h3>
                        <p className="text-ink-500 text-[9px] sm:text-xs">Available for custom order</p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div 
                      className="absolute inset-0 w-full h-full  bg-ink-950 p-3 sm:p-6 flex flex-col justify-center items-center text-center shadow-lg"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <h3 className="font-serif text-base sm:text-xl md:text-2xl text-white mb-2 sm:mb-3">{product.title}</h3>
                      <p className="text-ink-300 text-[10px] sm:text-sm mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-4 leading-relaxed">{product.description}</p>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${product.slug}`);
                        }}
                        className="bg-transparent border border-white text-white px-3 py-1.5 sm:px-6 sm:py-2.5 text-[9px] sm:text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-ink-950 transition-colors flex items-center gap-1 sm:gap-2"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
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



      {/* Projects preview */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-ink-100">
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

      {/* Gallery Section */}
      <section className="py-12 md:py-24 relative bg-white overflow-hidden border-t border-ink-100">
        <div className="container-luxe max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-burgundy-600 font-bold mb-4 block">
                Inspiration
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-ink-950 mb-6">Our Gallery</h2>
              <div className="w-12 h-0.5 bg-burgundy-600 mx-auto" />
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {[
              "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/3573351/pexels-photo-3573351.jpeg?auto=compress&cs=tinysrgb&w=800",
              "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=800"
            ].map((img, i) => (
              <FadeIn 
                key={i} 
                delay={i * 0.1} 
                className={
                  i === 0 ? "col-span-2 row-span-2" : 
                  i === 3 ? "col-span-2 row-span-2" : 
                  "col-span-1 row-span-1"
                }
              >
                <div className="relative w-full h-full overflow-hidden group rounded-sm bg-ink-50">
                  <img src={img} alt="Gallery item" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors duration-500 cursor-zoom-in" />
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="btn-outline group !px-8 !py-3 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white transition-colors">
              <span>View More Inspiration</span>
            </button>
          </div>
        </div>
      </section>

      {/* Review strip */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-ink-50">
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
          </FadeIn>

          {/* Masonry-like Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 items-start">
            
            {/* Column 1 */}
            <div className="flex flex-col">
              <TestimonialBubble 
                quote="Excellent quality and professional service. The decorative glass film they installed transformed our office completely. Highly recommended for anyone looking for customized decor solutions."
                name="Anil Patel"
                title="Business Owner"
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                date="Oct 12, 2026"
              />
              <TestimonialBubble 
                quote="I am so grateful for your styling system. Our living room looks incredibly elegant now. I love it!"
                name="Sarah Jenkins"
                title="Homeowner"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
                date="Sep 28, 2026"
              />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col lg:mt-12">
              <TestimonialBubble 
                quote="Very impressed with their wallpaper collection and installation. The team was punctual, polite, and left everything spotless. You're awesome :)"
                name="Priya Sharma"
                title="Interior Designer"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
                date="Aug 15, 2026"
              />
              <TestimonialBubble 
                quote="Everything I need to run and market my business is right here. The custom blinds were top-notch!"
                name="Rahul Desai"
                title="Restaurant Manager"
                image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
                date="Jul 04, 2026"
              />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col lg:mt-24">
              <TestimonialBubble 
                quote="I am so grateful for your excellent service. Last but not least, I have time for myself to be a mother. Again thank you so much for your great work. I LOVE IT!"
                name="Aikisha Boyd"
                title="Freelance Stylist"
                image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                date="Jun 22, 2026"
              />
              <TestimonialBubble 
                quote="You have been the most helpful company I have ever worked with. The custom prints are perfect."
                name="Megan Duchi"
                title="The Last Tangle"
                image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop"
                date="May 10, 2026"
              />
            </div>

          </div>
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



































