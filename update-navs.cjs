const fs = require('fs');

// Patch Navbar.tsx
let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const oldNavLinks = `const links = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Projects', path: '/projects' },
  { label: 'Brochures', path: '/brochures' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];`;

const newNavLinks = `const links = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Services', path: '/services' },
  { label: 'Collections', path: '/collections' },
  { label: 'Projects', path: '/projects' },
  { label: 'Brochures', path: '/brochures' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];`;

navbar = navbar.replace(oldNavLinks, newNavLinks);
fs.writeFileSync('src/components/Navbar.tsx', navbar);

// Patch MobileBottomBar.tsx
let mobileBar = fs.readFileSync('src/components/MobileBottomBar.tsx', 'utf8');

const oldMobileLinks = `const navItems = [
  { label: 'Home', path: '/', icon: Home, matchNames: ['home'] },
  { label: 'Collections', path: '/collections', icon: Layers, matchNames: ['collections', 'category'] },
  { label: 'Services', path: '/services', icon: Grid, matchNames: ['services', 'service'] },
  { label: 'Products', path: '/products', icon: ShoppingBag, matchNames: ['products', 'product'] },
  { label: 'Projects', path: '/projects', icon: Image, matchNames: ['projects', 'project'] },
  { label: 'Contact', path: '/contact', icon: Phone, matchNames: ['contact'] },
];`;

const newMobileLinks = `const navItems = [
  { label: 'Home', path: '/', icon: Home, matchNames: ['home'] },
  { label: 'Products', path: '/products', icon: ShoppingBag, matchNames: ['products', 'product'] },
  { label: 'Services', path: '/services', icon: Grid, matchNames: ['services', 'service'] },
  { label: 'Collections', path: '/collections', icon: Layers, matchNames: ['collections', 'category'] },
  { label: 'Projects', path: '/projects', icon: Image, matchNames: ['projects', 'project'] },
  { label: 'Contact', path: '/contact', icon: Phone, matchNames: ['contact'] },
];`;

mobileBar = mobileBar.replace(oldMobileLinks, newMobileLinks);
fs.writeFileSync('src/components/MobileBottomBar.tsx', mobileBar);

console.log("Updated both files");

