import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { business } from '@/lib/data';
import type { Route } from '@/hooks/useRouter';

type Props = {
  route: Route;
  navigate: (path: string) => void;
};

const links = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Projects', path: '/projects' },
  { label: 'Brochures', path: '/brochures' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function isActive(route: Route, path: string): boolean {
  if (path === '/') return route.name === 'home';
  if (path === '/services') return route.name === 'services' || route.name === 'service';
  if (path === '/products') return route.name === 'products' || route.name === 'product';
  if (path === '/projects') return route.name === 'projects' || route.name === 'project';
  if (path === '/brochures') return route.name === 'brochures';
  if (path === '/about') return route.name === 'about';
  if (path === '/contact') return route.name === 'contact';
  return false;
}

export default function Navbar({ route, navigate }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed z-50 transition-all duration-700 ease-lux ${
          scrolled 
            ? 'top-4 left-4 right-4 lg:left-12 lg:right-12 rounded-2xl glass-strong py-0 border border-burgundy-600/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)]' 
            : 'top-0 left-0 right-0 bg-transparent py-4'
        }`}
      >
        <div className="container-luxe px-4 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-700 ${scrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'}`}>
            <button
              onClick={() => navigate('/')}
              className="flex items-center group relative h-14 md:h-16 w-[120px] md:w-[160px]"
            >
              <AnimatePresence>
                {(scrolled || route.name !== 'home') && (
                  <motion.div
                    layoutId="main-logo"
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-start origin-left bg-transparent absolute left-0"
                  >
                    <div className="relative flex items-center justify-start">
                      <img src="/Logo4.png" alt="Devlaji Digital Home Decor" className="h-12 md:h-16 w-auto object-contain pointer-events-none" />
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          WebkitMaskImage: 'url(/Logo4.png)',
                          WebkitMaskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'left center',
                        }}
                      >
                        <div className="absolute inset-0 w-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer-sweep" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {links.map((link) => {
                const hasBanner = !['service', 'project', 'product'].includes(route.name);
                const isBannerTop = !scrolled && hasBanner;
                const active = isActive(route, link.path);
                
                let textColor = '';
                if (isBannerTop) {
                  textColor = active ? 'text-white' : 'text-white/80 hover:text-white';
                } else {
                  textColor = active ? 'text-burgundy-600' : 'text-ink-800 hover:text-burgundy-700';
                }

                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`relative font-sans text-sm tracking-wide-2 uppercase transition-colors duration-500 ${textColor}`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute -bottom-2 left-0 right-0 h-px ${isBannerTop ? 'bg-white' : 'bg-burgundy-600'}`}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${business.phoneRaw}`}
                className={`flex items-center gap-2 transition-colors duration-500 font-sans text-sm ${
                  !scrolled && !['service', 'project', 'product'].includes(route.name) ? 'text-white/90 hover:text-white' : 'text-ink-800 hover:text-burgundy-700'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>{business.phone}</span>
              </a>
              <button onClick={() => navigate('/contact')} className={`px-5 py-2.5 rounded-sm font-sans text-xs tracking-wide-2 uppercase transition-all duration-500 ${
                !scrolled && !['service', 'project', 'product'].includes(route.name)
                  ? 'bg-white text-ink-900 hover:bg-white/90'
                  : 'bg-burgundy-600 text-white hover:bg-burgundy-700'
              }`}>
                Get a Quote
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 relative z-50 transition-colors duration-500 ${
                !scrolled && !menuOpen && !['service', 'project', 'product'].includes(route.name) ? 'text-white' : 'text-ink-900'
              }`}
              aria-label="Menu"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden glass-strong"
          >
            <div className="flex flex-col items-center justify-center min-h-screen gap-2 pt-20">
              {links.map((link, i) => (
                <motion.button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif text-3xl tracking-wide transition-colors duration-500 ${
                    isActive(route, link.path) ? 'text-burgundy-600' : 'text-ink-800 hover:text-burgundy-700'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <a href={`tel:${business.phoneRaw}`} className="flex items-center gap-2 text-ink-700 font-sans text-sm">
                  <Phone className="w-4 h-4" />
                  {business.phone}
                </a>
                <button onClick={() => navigate('/contact')} className="btn-primary">
                  <span>Get a Quote</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
