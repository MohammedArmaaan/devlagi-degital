import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import TiltCard from '@/components/TiltCard';
import { services } from '@/lib/data';

type Props = { navigate: (path: string) => void };

export default function Services({ navigate }: Props) {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Services Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>What We Offer</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Our Services</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">
                We manufacture and install a complete range of customized decor products — from
                decorative glass film and custom wallpaper to full residential and commercial
                interior solutions.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-luxe space-y-20 md:space-y-32">
          {services.map((service, i) => (
            <div key={service.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <FadeIn y={60} className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <TiltCard intensity={5}>
                  <div className="aspect-[4/3] overflow-hidden rounded-sm group relative glass-shine" style={{ background: 'rgba(12,10,9,0.3)', border: '1px solid rgba(212,168,82,0.1)' }}>
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                    <div className="absolute inset-4 border border-burgundy-600/0 group-hover:border-burgundy-600/20 rounded-sm transition-all duration-700 ease-lux" />
                  </div>
                </TiltCard>
              </FadeIn>
              <FadeIn delay={0.15} y={60} className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="font-sans text-xs tracking-wide-3 uppercase text-burgundy-600 mb-4 block">
                  {String(i + 1).padStart(2, '0')} — Service
                </span>
                <h2 className="heading-2 mb-4"><AnimatedText text={service.title} /></h2>
                <p className="body-text mb-6">{service.description}</p>
                <div className="mb-8">
                  <h4 className="font-sans text-xs tracking-wide-2 uppercase text-ink-800 mb-4">Key Benefits</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.benefits.map((benefit, bi) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: bi * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-2.5 group/item"
                      >
                        <div className="w-5 h-5 rounded-full bg-burgundy-600/10 border border-burgundy-600/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-burgundy-600/20 transition-all duration-500">
                          <Check className="w-3 h-3 text-burgundy-600" />
                        </div>
                        <span className="text-ink-700 font-sans text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate(`/services/${service.slug}`)} className="btn-primary group">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/contact')} className="btn-outline group">
                    <span>Enquire Now</span>
                  </motion.button>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
