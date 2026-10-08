const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const pagesConfig = {
  'About.tsx': {
    title: 'About Us',
    subtitle: 'Our Story',
    description: 'Learn more about Devlaji Digital Home Decor.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80'
  },
  'Brochures.tsx': {
    title: 'Brochures',
    subtitle: 'Downloads',
    description: 'Explore our product catalogs and brochures.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80'
  },
  'Collections.tsx': {
    title: 'Premium Collections',
    subtitle: 'Our Collections',
    description: 'Explore our curated collections of wallpapers and interior decor.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
  },
  'Contact.tsx': {
    title: 'Contact Us',
    subtitle: 'Get in Touch',
    description: 'We would love to hear from you. Reach out for any inquiries.',
    image: 'https://images.unsplash.com/photo-1516322311468-5b530f367eb7?auto=format&fit=crop&w=1920&q=80'
  },
  'Projects.tsx': {
    title: 'Our Projects',
    subtitle: 'Portfolio',
    description: 'A glimpse into our 54,000+ completed projects across India.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80'
  },
  'Services.tsx': {
    title: 'Our Services',
    subtitle: 'What We Do',
    description: 'Comprehensive interior decor solutions from manufacturing to installation.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80'
  }
};

for (const [file, config] of Object.entries(pagesConfig)) {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove import
  content = content.replace(/import\s*{\s*useBanner\s*}\s*from\s*'@\/hooks\/useBanner';?\r?\n?/g, '');
  
  // Replace hook with static object
  // Find `const { banner, isLoading: isBannerLoading } = useBanner('...');`
  const hookRegex = /const\s*{\s*banner\s*,\s*isLoading:\s*isBannerLoading\s*}\s*=\s*useBanner\([^)]+\);?/g;
  
  const staticBanner = `const banner = {
    title: "${config.title}",
    subtitle: "${config.subtitle}",
    description: "${config.description}",
    image: "${config.image}",
    link: []
  };
  const isBannerLoading = false;`;

  if (hookRegex.test(content)) {
    content = content.replace(hookRegex, staticBanner);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Hook not found in ${file}`);
  }
}

