import { ArrowRight, Factory, Palette, Shield, Users, MapPin, Phone, Clock, Instagram, Star , Loader2} from 'lucide-react';
import { useBanner } from '@/hooks/useBanner';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import CountUp from '@/components/CountUp';
import TiltCard from '@/components/TiltCard';
import { business } from '@/lib/data';

type Props = { navigate: (path: string) => void };

const values = [
  { icon: Factory, title: 'In-House Manufacturing', description: 'We design, print, and manufacture our own wallpaper and decor products — giving you complete control over customization.' },
  { icon: Palette, title: 'Design Expertise', description: 'From classic patterns to contemporary designs, our team helps you choose the right look for your space and budget.' },
  { icon: Shield, title: 'Quality Materials', description: 'We use premium substrates, UV-resistant inks, and durable films that stand the test of time in real-world conditions.' },
  { icon: Users, title: 'Professional Installation', description: 'Our experienced installation team ensures a flawless finish — seamless pattern matching and bubble-free application.' },
];

const stats = [
  { value: '1689', suffix: '+', label: 'Projects Completed' },
  { value: '5.0', suffix: '', decimals: 1, label: 'Google Rating' },
  { value: '4', suffix: '+', label: 'Spaces Served' },
  { value: '100', suffix: '%', label: 'Custom Products' },
];

export default function About({ navigate }: Props) {
  const { banner, isLoading: isBannerLoading } = useBanner('About');
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
      {/* Stats Section moved right below the banner */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <div className="container-luxe">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl text-burgundy-600 font-light mb-2">
                  <CountUp end={parseFloat(stat.value)} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <div className="font-sans text-xs tracking-wide-2 uppercase text-ink-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {!isBannerLoading && !banner?.image && <div className="pt-24 lg:pt-32" />}

      <section className="py-20 md:py-28 bg-grain relative overflow-hidden">
                <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <FadeIn>
                <div className="section-label mb-6">Our Story</div>
                <h2 className="heading-2 mb-6 text-balance"><AnimatedText text="A Manufacturer, Not Just a Supplier" /></h2>
                <p className="body-text mb-6"><strong>Devlaji Digital Home Decor</strong> was founded with a simple belief: decor should be personal. That's why we create <strong>our own customized design for wallpapers, roller blinds, glass films, and canvas frames</strong>, all designed and produced under one roof.</p>
                <p className="body-text mb-6">We proudly provide <strong>Pan India services</strong>, serving residential, commercial, hospitality, and retail spaces across the country. Our approach combines traditional craftsmanship with modern digital printing technology, giving you the quality of bespoke design with the reliability of professional manufacturing.</p>
                <p className="body-text">Every project — whether a single window film or a full commercial interior — receives the same attention to detail, from initial consultation to final installation.</p>
              </FadeIn>
            </div>
            <div className="lg:col-span-6">
              <FadeIn delay={0.2} y={60}>
                <TiltCard intensity={6}>
                  <div className="aspect-[4/3] overflow-hidden rounded-sm group glass-shine" style={{ border: '1px solid rgba(212,168,82,0.1)' }}>
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80" alt="Office space" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <section className="py-20 md:py-28 bg-[#fcfcfc] relative overflow-hidden">
                <div className="container-luxe">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="section-label justify-center mb-6" style={{ display: 'inline-flex' }}>Leadership</div>
              <h2 className="heading-2 text-balance"><AnimatedText text="Meet Our Team" /></h2>
              <div className="gold-divider-center mt-6" />
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Founder 1 */}
            <FadeIn delay={0.1} y={40} className="md:col-span-6 lg:col-span-6">
              <div className="group relative w-full h-[400px] md:h-[500px] rounded-none overflow-hidden cursor-default shadow-sm hover:shadow-2xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1000&q=80" 
                  alt="Founder" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[10px] md:text-[11px] uppercase text-burgundy-300 font-bold tracking-[0.3em] mb-3 block">Founder & Production Manager</span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">Ayan Kachhawa</h3>
                  <p className="text-white/80 font-sans text-sm line-clamp-3 mb-6 max-w-md leading-relaxed">
                    With 8 years of experience in customized wallpapers, Ayan expertly manages production, ensuring top-tier manufacturing quality and design innovation for every product.
                  </p>
                  <div className="w-12 h-px bg-burgundy-500 group-hover:w-full transition-all duration-1000 ease-lux" />
                </div>
              </div>
            </FadeIn>

            {/* Founder 2 */}
            <FadeIn delay={0.2} y={40} className="md:col-span-6 lg:col-span-6">
              <div className="group relative w-full h-[400px] md:h-[500px] rounded-none overflow-hidden cursor-default shadow-sm hover:shadow-2xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&q=80" 
                  alt="Pioneer and Founder" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[10px] md:text-[11px] uppercase text-burgundy-300 font-bold tracking-[0.3em] mb-3 block">Pioneer & Founder</span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">Sohan Devlaji</h3>
                  <p className="text-white/80 font-sans text-sm line-clamp-3 mb-6 max-w-md leading-relaxed">
                    As the pioneer and founder of Devlaji, Sohan brings more than 5 years of experience in directly dealing with clients, CRM, and personally handling site visits to deliver exceptional service.
                  </p>
                  <div className="w-12 h-px bg-burgundy-500 group-hover:w-full transition-all duration-1000 ease-lux" />
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      

      {/* Our Process Section */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
              <div className="section-label justify-center mb-6" style={{ display: 'inline-flex' }}>How We Work</div>
              <h2 className="heading-2 text-balance"><AnimatedText text="Our Seamless Process" /></h2>
              <div className="gold-divider-center mt-6" />
            </div>
          </FadeIn>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[40px] left-0 w-full h-[1px] bg-ink-200" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {[
                { step: '01', title: 'Consultation', desc: 'We begin by understanding your space and aesthetic preferences to lay the foundation for a flawless design.' },
                { step: '02', title: 'Selection', desc: 'Browse our extensive library of premium wallpapers and decorative films to find the perfect texture and finish.' },
                { step: '03', title: 'Preparation', desc: 'Our state-of-the-art facility ensures precise custom cutting and preparation of your materials for a perfect fit.' },
                { step: '04', title: 'Installation', desc: 'Our expert technicians deliver a seamless, bubble-free installation with minimal disruption to your routine.' }
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.15} y={40} className="relative">
                  {/* Vertical Line for Mobile */}
                  {i !== 3 && <div className="md:hidden absolute top-[80px] left-[40px] w-[1px] h-[calc(100%-80px)] bg-ink-200" />}
                  
                  <div className="flex flex-row md:flex-col items-start gap-6 md:gap-8 group">
                    <div className="relative z-10 w20 md:w-full flex justify-start md:justify-center">
                      <div className="w-[80px] h-[80px] rounded-full bg-white border border-ink-200 flex items-center justify-center font-serif text-3xl text-ink-300 group-hover:border-burgundy-600 group-hover:text-burgundy-600 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.02)] shrink-0">
                        {item.step}
                      </div>
                    </div>
                    <div className="pt-2 md:pt-0 md:text-center flex-1">
                      <h3 className="font-serif text-xl text-ink-950 mb-3">{item.title}</h3>
                      <p className="font-sans text-sm text-ink-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="section-label justify-center mb-6" style={{ display: 'inline-flex' }}>What Sets Us Apart</div>
              <h2 className="heading-2 text-balance"><AnimatedText text="Our Core Strengths" /></h2>
              <div className="gold-divider-center mt-6" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.12} y={50}>
                <TiltCard intensity={4} className="h-full">
                  <div className="card-luxe p-8 group glass-shine h-full">
                    <div className="flex items-start gap-5">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-14 h-14 rounded-sm border border-burgundy-600/30 flex items-center justify-center flex-shrink-0 group-hover:border-burgundy-600 group-hover:bg-burgundy-600/5 transition-all duration-500"
                      >
                        <value.icon className="w-7 h-7 text-burgundy-600" />
                      </motion.div>
                      <div>
                        <h3 className="heading-3 !text-xl mb-3">{value.title}</h3>
                        <p className="body-text text-sm">{value.description}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <div className="container-luxe">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="section-label mb-6">Visit Our Workshop</div>
                <h2 className="heading-3 mb-6">Come See Our Collection</h2>
                <p className="body-text mb-8">Our Behrampura workshop is open six days a week. Visit us to see material samples, browse our wallpaper and film collections, and discuss your project in person.</p>
                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: 'Address', value: business.address },
                    { icon: Clock, label: 'Hours', value: business.hours },
                    { icon: Phone, label: 'Phone', value: business.phone, href: `tel:${business.phoneRaw}` },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="w-10 h-10 rounded-sm border border-burgundy-600/30 flex items-center justify-center flex-shrink-0 group-hover/item:border-burgundy-600 transition-all duration-500">
                        <item.icon className="w-4 h-4 text-burgundy-600" />
                      </div>
                      <div>
                        <div className="font-sans text-xs tracking-wide-2 uppercase text-ink-600 mb-1">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-ink-800 font-sans text-sm hover:text-burgundy-700 transition-colors duration-500">{item.value}</a>
                        ) : (
                          <div className="text-ink-800 font-sans text-sm">{item.value}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-label mb-6">Follow Our Work</div>
                <h2 className="heading-3 mb-6">See Our Latest Projects</h2>
                <p className="body-text mb-8">We regularly share our newest installations and designs on Instagram. Follow us to see real-time updates and get inspiration for your own space.</p>
                <div className="flex flex-col gap-4">
                  <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={business.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline group">
                    <Instagram className="w-4 h-4" /><span>@devlaji_digital</span><ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </motion.a>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-burgundy-600 text-burgundy-600" />)}</div>
                    <span className="text-ink-700 font-sans text-sm">{business.rating} · {business.reviewCount}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')} className="btn-primary mt-2 group">
                    <span>Get in Touch</span><ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
