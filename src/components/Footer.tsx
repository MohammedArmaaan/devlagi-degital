import { MapPin, Phone, Clock, Instagram, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { business } from '@/lib/data';

type Props = { navigate: (path: string) => void };

export default function Footer({ navigate }: Props) {
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
    { label: 'Brochures', path: '/brochures' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative border-t border-ink-200/40" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-burgundy-600/20 to-transparent" />
      <div className="container-luxe py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex items-center mb-6 h-16"
            >
              <img src="/logo.png" alt="Devlaji Digital Home Decor" className="h-full w-auto object-contain" />
            </motion.div>
            <p className="body-text text-sm mb-6">Manufacturers of customized wallpaper and customized home decor products. Bringing stylish privacy and natural light to homes and businesses across Ahmedabad.</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-burgundy-600 text-burgundy-600" />)}</div>
              <span className="text-ink-700 font-sans text-sm">{business.rating}</span>
              <span className="text-ink-500 font-sans text-xs">· {business.reviewCount}</span>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-wide-3 uppercase text-burgundy-600 mb-6">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button onClick={() => navigate(link.path)} className="text-ink-700 hover:text-burgundy-700 transition-colors duration-500 font-sans text-sm link-underline">{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-wide-3 uppercase text-burgundy-600 mb-6">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-burgundy-600 mt-0.5 flex-shrink-0" /><span className="text-ink-700 font-sans text-sm leading-relaxed">{business.address}</span></li>
              <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-burgundy-600 flex-shrink-0" /><span className="text-ink-700 font-sans text-sm">{business.hours}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-wide-3 uppercase text-burgundy-600 mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><a href={`tel:${business.phoneRaw}`} className="flex items-center gap-3 text-ink-700 hover:text-burgundy-700 transition-colors duration-500 font-sans text-sm"><Phone className="w-4 h-4 text-burgundy-600 flex-shrink-0" />{business.phone}</a></li>
              <li><a href={business.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-700 hover:text-burgundy-700 transition-colors duration-500 font-sans text-sm"><Instagram className="w-4 h-4 text-burgundy-600 flex-shrink-0" />@devlaji_digital<ArrowUpRight className="w-3 h-3 text-ink-500" /></a></li>
              <li><a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ink-700 hover:text-burgundy-700 transition-colors duration-500 font-sans text-sm"><MapPin className="w-4 h-4 text-burgundy-600 flex-shrink-0" />Get Directions<ArrowUpRight className="w-3 h-3 text-ink-500" /></a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink-200/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-500 font-sans text-xs">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p className="text-ink-500 font-sans text-xs tracking-wide-2 uppercase">Ahmedabad · Gujarat · India</p>
        </div>
      </div>
    </footer>
  );
}
