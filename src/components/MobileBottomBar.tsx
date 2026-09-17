import { Home, Grid, ShoppingBag, Image, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Route } from '@/hooks/useRouter';

type Props = {
  route: Route;
  navigate: (path: string) => void;
};

const navItems = [
  { label: 'Home', path: '/', icon: Home, matchNames: ['home'] },
  { label: 'Services', path: '/services', icon: Grid, matchNames: ['services', 'service'] },
  { label: 'Products', path: '/products', icon: ShoppingBag, matchNames: ['products', 'product'] },
  { label: 'Projects', path: '/projects', icon: Image, matchNames: ['projects', 'project'] },
  { label: 'Contact', path: '/contact', icon: Phone, matchNames: ['contact'] },
];

export default function MobileBottomBar({ route, navigate }: Props) {
  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
      <div 
        className="glass-strong rounded-2xl border border-burgundy-600/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] px-2 py-2 flex items-center justify-between"
      >
        {navItems.map((item) => {
          const isActive = item.matchNames.includes(route.name);
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-1 relative"
            >
              <div className={`transition-colors duration-300 ${isActive ? 'text-burgundy-600' : 'text-ink-500'}`}>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span 
                className={`font-sans text-[10px] tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-burgundy-600 font-medium' : 'text-ink-500'
                }`}
              >
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-burgundy-600"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
