import { ArrowRight, ArrowLeft, Check, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import AnimatedText from '@/components/AnimatedText';
import TiltCard from '@/components/TiltCard';
import EnquiryForm from '@/components/EnquiryForm';
import { services, business } from '@/lib/data';

type Props = { slug: string; navigate: (path: string) => void };

export default function ServiceDetail({ slug, navigate }: Props) {
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return (
      <div className="bg-white min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Service Not Found</h1>
          <button onClick={() => navigate('/services')} className="btn-primary"><span>Back to Services</span></button>
        </div>
      </div>
    );
  }
  const currentIndex = services.indexOf(service);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <div className="bg-white min-h-screen pt-20 md:pt-24">
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" />
        <div className="relative container-luxe h-full flex flex-col justify-end pb-12">
          <FadeIn>
            <button onClick={() => navigate('/services')} className="flex items-center gap-2 text-ink-700 hover:text-burgundy-700 transition-colors duration-500 mb-4 font-sans text-sm">
              <ArrowLeft className="w-4 h-4" /> All Services
            </button>
            <div className="section-label mb-4">{service.title}</div>
            <h1 className="heading-1 mb-4 text-balance"><AnimatedText text={service.title} /></h1>
            <p className="body-text text-lg max-w-2xl">{service.short}</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="section-label mb-6">Overview</div>
                <h2 className="heading-3 mb-6">About This Service</h2>
                <p className="body-text text-lg mb-6">{service.description}</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h3 className="font-sans text-xs tracking-wide-2 uppercase text-ink-800 mb-4 mt-10">Key Benefits</h3>
                <div className="space-y-3">
                  {service.benefits.map((benefit, bi) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: bi * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-burgundy-600/10 border border-burgundy-600/30 flex-shrink-0 mt-0.5 group-hover/item:bg-burgundy-600/20 transition-all duration-500">
                        <Check className="w-3.5 h-3.5 text-burgundy-600" />
                      </div>
                      <span className="text-ink-800 font-sans text-sm leading-relaxed">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-5">
              <FadeIn delay={0.2} y={50}>
                <TiltCard intensity={4}>
                  <div className="glass rounded-sm p-6 md:p-8 glass-shine">
                    <h3 className="font-sans text-xs tracking-wide-2 uppercase text-burgundy-600 mb-4">Ideal Applications</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.applications.map((app) => (
                        <span key={app} className="px-4 py-2 bg-ink-100/40 border border-ink-600/40 text-ink-800 font-sans text-sm rounded-sm hover:border-burgundy-600/30 transition-all duration-500">{app}</span>
                      ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-ink-200/40">
                      <h3 className="font-sans text-xs tracking-wide-2 uppercase text-burgundy-600 mb-4">Ready to Start?</h3>
                      <p className="body-text text-sm mb-4">Contact us for a free consultation and quotation for your space.</p>
                      <div className="flex flex-col gap-3">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/contact')} className="btn-primary w-full group"><span>Request a Quote</span></motion.button>
                        <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={`tel:${business.phoneRaw}`} className="btn-outline w-full group"><span>Call {business.phone}</span></motion.a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="section-label mb-6">Enquire</div>
                <h2 className="heading-2 mb-6 text-balance">Interested in {service.title}?</h2>
                <p className="body-text mb-6">Fill out the form and our team will get back to you within 24 hours with a personalized quotation and consultation.</p>
                <div className="flex items-center gap-3 text-ink-700"><MapPin className="w-4 h-4 text-burgundy-600" /><span className="font-sans text-sm">{business.shortAddress}</span></div>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.15} y={50}>
                <div className="glass rounded-sm p-6 md:p-8">
                  <EnquiryForm defaultService={service.title} compact />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-luxe">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => navigate(`/services/${nextService.slug}`)}
            className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full"
          >
            <div>
              <span className="font-sans text-xs tracking-wide-3 uppercase text-burgundy-600 mb-2 block">Next Service</span>
              <h3 className="heading-3 group-hover:text-burgundy-700 transition-colors duration-500">{nextService.title}</h3>
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
