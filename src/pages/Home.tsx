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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto flex flex-col items-center"
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] text-white leading-[1.1] mb-6 md:mb-8 font-medium drop-shadow-lg">
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
      <section id="collections" className="py-24 md:py-32 bg-grain relative overflow-hidden">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
            {categories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 0.1}>
                <button
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className="group w-full text-left relative overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-700 bg-white flex flex-col h-full"
                >
                  <div className="aspect-[4/3] relative overflow-hidden w-full">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-transparent transition-colors duration-700" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1 text-center relative z-10 bg-white group-hover:-translate-y-1.5 transition-transform duration-500 border-t-2 border-burgundy-600">
                    <h3 className="heading-3 text-ink-950 mb-2">{cat.title}</h3>
                    <p className="body-text text-xs text-ink-600 mb-4 line-clamp-2 flex-1">{cat.description}</p>
                    <span className="inline-flex items-center justify-center gap-1.5 font-sans text-[10px] uppercase tracking-widest font-semibold text-burgundy-600 group-hover:text-burgundy-800 transition-colors mt-auto">
                      View Collection <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview - Auto Scrolling Split Layout */}
      <section className="py-24 md:py-32 relative bg-white">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <div className="container-luxe max-w-7xl mx-auto">
          {/* Main Title Area */}
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
              <span className="font-sans text-xs tracking-widest uppercase text-burgundy-600 font-semibold mb-4 block">
                Expertise
              </span>
              <h2 className="heading-2 text-ink-950 mb-6">Our Services</h2>
              <div className="gold-divider-center mb-6" />
              <p className="body-text text-ink-600">
                From decorative glass film to custom-printed wallpaper, we manufacture and install
                decor solutions for residential and commercial spaces.
              </p>
            </div>
          </FadeIn>

          <div className="relative min-h-[400px] md:min-h-[450px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentServiceIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Left Side - Text */}
                <div className="order-2 md:order-1 text-center md:text-left flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-serif text-ink-950 mb-6 leading-tight">
                    {services[currentServiceIdx].title}
                  </h3>
                  
                  <p className="body-text text-ink-600 mb-8 md:mb-10 line-clamp-4 text-base md:text-lg">
                    {services[currentServiceIdx].description}
                  </p>
                  
                  <div>
                    <button
                      onClick={() => navigate(`/services/${services[currentServiceIdx].slug}`)}
                      className="inline-flex items-center justify-center rounded-full border border-ink-200 px-8 py-3 text-ink-900 font-sans text-sm tracking-wide hover:border-burgundy-600 hover:text-burgundy-600 transition-colors duration-300"
                    >
                      Read More
                    </button>
                  </div>
                  
                  {/* Indicators & Arrows */}
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-12">
                    <button 
                      onClick={() => setCurrentServiceIdx(prev => prev === 0 ? services.slice(0,3).length - 1 : prev - 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:bg-ink-100 hover:text-burgundy-600 transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="flex gap-2">
                      {services.slice(0, 3).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentServiceIdx(idx)}
                          className={`transition-all duration-300 rounded-full ${
                            currentServiceIdx === idx 
                              ? 'w-8 h-2 bg-burgundy-600' 
                              : 'w-2 h-2 bg-ink-200 hover:bg-ink-300'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button 
                      onClick={() => setCurrentServiceIdx(prev => (prev + 1) % services.slice(0,3).length)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-ink-200 text-ink-600 hover:bg-ink-100 hover:text-burgundy-600 transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="order-1 md:order-2">
                  <div className="aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-2xl shadow-sm border border-ink-100">
                    <img
                      src={services[currentServiceIdx].image}
                      alt={services[currentServiceIdx].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-16 md:mt-24 text-center">
            <button onClick={() => navigate('/services')} className="btn-ghost group inline-flex items-center">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {productsList.filter(p => p.isNewArrival).slice(0, 4).map((product, i) => (
              <FadeIn key={product.slug} delay={i * 0.1}>
                <TiltCard intensity={5} className="h-full">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="card-luxe group flex flex-col h-full glass-shine w-full text-left cursor-pointer"
                  >
                    <div className="aspect-square md:aspect-[4/3] overflow-hidden relative w-full">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                      <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-burgundy-600 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-sm z-10">
                        <span className="font-sans text-[8px] md:text-[10px] tracking-widest uppercase font-semibold">New</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-3 md:p-4 flex flex-col flex-1">
                      <span className="font-sans text-[9px] md:text-[10px] tracking-widest uppercase text-burgundy-600 mb-1 md:mb-1.5 block line-clamp-1">{product.category}</span>
                      <h3 className="text-sm md:text-base font-serif text-ink-950 mb-2 md:mb-3 group-hover:text-burgundy-700 transition-colors duration-500 leading-snug line-clamp-2 min-h-[2.5rem] md:min-h-[2.75rem]">{product.title}</h3>
                      
                      <div className="flex flex-col gap-2 mt-auto pt-2 md:pt-3 border-t border-ink-100">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm md:text-base text-ink-950 font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                          <div className="flex items-center gap-1 md:gap-1.5 text-burgundy-600 font-sans text-[9px] md:text-[10px] tracking-widest uppercase">
                            View <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-500 group-hover:translate-x-1" />
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${business.phoneRaw.replace('+', '')}?text=${encodeURIComponent(`Hi, I am interested in ${product.title}`)}`, '_blank');
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 md:py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded font-sans text-[9px] md:text-[10px] font-semibold tracking-wider transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          INQUIRE<span className="hidden lg:inline"> ON WHATSAPP</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[#f7f7f7]">
        <div className="container-luxe max-w-7xl mx-auto">
          {/* Top Split Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-center mb-16">
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
                    View All Services <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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
      <section className="py-24 md:py-32 relative overflow-hidden bg-rose-50/30">
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

            <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8">
              {[
                {
                  text: "Excellent quality and professional service. The decorative glass film they installed transformed our office completely. Highly recommended for anyone looking for customized decor solutions in Ahmedabad.",
                  author: "Anil Patel",
                  initial: "A"
                },
                {
                  text: "Very impressed with their wallpaper collection and installation. The team was punctual, polite, and left everything spotless. Our living room looks incredibly elegant now.",
                  author: "Priya Sharma",
                  initial: "P"
                },
                {
                  text: "Devlaji Digital provided customized blinds for our new restaurant. The print quality is fantastic and the material is top-notch. Great value for money and excellent support.",
                  author: "Rahul Desai",
                  initial: "R"
                }
              ].map((review, idx) => (
                <TiltCard key={idx} intensity={2}>
                  <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 border border-ink-100">
                    {/* Top white space */}
                    <div className="h-10 sm:h-24 bg-white w-full flex-shrink-0" />
                    
                    {/* Colored content area */}
                    <div className="bg-burgundy-600 rounded-t-2xl sm:rounded-t-[2.5rem] flex-grow relative flex flex-col items-center text-center px-1.5 sm:px-6 pb-4 sm:pb-10 pt-8 sm:pt-16 mt-[-1px]">
                      
                      {/* Avatar overlapping the boundary */}
                      <div className="absolute -top-6 sm:-top-12 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-24 sm:h-24 rounded-full border-[3px] sm:border-[6px] border-white bg-[#f4f2ee] shadow-sm overflow-hidden flex items-center justify-center">
                        <span className="font-serif text-base sm:text-3xl text-burgundy-900 font-bold">{review.initial}</span>
                      </div>

                      <Quote className="w-3 h-3 sm:w-8 sm:h-8 text-white/20 fill-white/20 absolute top-2 sm:top-8 left-1 sm:left-6 rotate-180" />
                      
                      <p className="font-sans text-[8px] sm:text-[15px] md:text-base text-white/95 leading-tight sm:leading-relaxed z-10 px-1 sm:px-4 mb-4 sm:mb-8 mt-1 sm:mt-2 line-clamp-6 sm:line-clamp-none">
                        {review.text}
                      </p>

                      <Quote className="w-3 h-3 sm:w-8 sm:h-8 text-white/20 fill-white/20 absolute bottom-10 sm:bottom-20 right-1 sm:right-6" />

                      <div className="mt-auto">
                        <h4 className="font-sans text-[7px] sm:text-sm text-white font-bold tracking-widest uppercase mb-1 sm:mb-2">
                          {review.author}
                        </h4>
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2 h-2 sm:w-3.5 sm:h-3.5 fill-[#e8b560] text-[#e8b560]" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
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
