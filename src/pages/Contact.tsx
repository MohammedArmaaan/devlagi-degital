import { Phone, MapPin, Clock, Instagram, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import EnquiryForm from '@/components/EnquiryForm';
import { business } from '@/lib/data';

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Contact Banner" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Get in Touch</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Contact Us</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">Ready to start your project? Call us, visit our workshop, or send an enquiry below. We respond within 24 hours.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <FadeIn>
                <h2 className="heading-3 mb-8">Reach Us Directly</h2>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: 'Phone', value: business.phone, href: `tel:${business.phoneRaw}` },
                    { icon: MapPin, label: 'Address', value: business.address, href: business.mapsUrl, external: true, sub: 'Get Directions' },
                    { icon: Clock, label: 'Business Hours', value: business.hours, sub: 'Sunday: Closed' },
                    { icon: Instagram, label: 'Instagram', value: '@devlaji_digital', href: business.instagram, external: true },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {item.href ? (
                        <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="flex items-start gap-5 group">
                          <div className="w-12 h-12 rounded-sm border border-burgundy-600/30 flex items-center justify-center flex-shrink-0 group-hover:border-burgundy-600 group-hover:bg-burgundy-600/5 transition-all duration-500 ease-lux">
                            <item.icon className="w-5 h-5 text-burgundy-600" />
                          </div>
                          <div>
                            <div className="font-sans text-xs tracking-wide-2 uppercase text-ink-600 mb-1">{item.label}</div>
                            <div className="text-ink-900 font-sans text-sm group-hover:text-burgundy-700 transition-colors duration-500">{item.value}</div>
                            {item.sub && <div className="flex items-center gap-1 mt-1 text-burgundy-600 font-sans text-xs">{item.sub}<ArrowUpRight className="w-3 h-3" /></div>}
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-5 group">
                          <div className="w-12 h-12 rounded-sm border border-burgundy-600/30 flex items-center justify-center flex-shrink-0 group-hover:border-burgundy-600 group-hover:bg-burgundy-600/5 transition-all duration-500 ease-lux">
                            <item.icon className="w-5 h-5 text-burgundy-600" />
                          </div>
                          <div>
                            <div className="font-sans text-xs tracking-wide-2 uppercase text-ink-600 mb-1">{item.label}</div>
                            <div className="text-ink-900 font-sans text-sm">{item.value}</div>
                            {item.sub && <div className="text-ink-500 font-sans text-xs mt-1">{item.sub}</div>}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-ink-200/40">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-burgundy-600 text-burgundy-600" />)}</div>
                    <span className="font-serif text-2xl text-ink-950">{business.rating}</span>
                    <span className="text-ink-600 font-sans text-sm">· {business.reviewCount}</span>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.2} y={60}>
                <div className="glass rounded-sm p-6 md:p-10 glass-shine">
                  <h2 className="heading-3 mb-2">Send an Enquiry</h2>
                  <p className="body-text text-sm mb-8">Fill in the form below with your project details. Fields marked with * are required.</p>
                  <EnquiryForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-luxe">
          <FadeIn y={60}>
            <div className="rounded-sm overflow-hidden border border-ink-200/40">
              <iframe title="Devlaji Digital Home Decor location" src="https://www.google.com/maps?q=Calico+Mills+Behrampura+Ahmedabad+Gujarat+380022&output=embed" className="w-full h-[400px] grayscale invert opacity-80" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
