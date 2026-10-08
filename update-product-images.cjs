const fs = require('fs');

const file = 'src/lib/data.ts';
let content = fs.readFileSync(file, 'utf8');

const newGenericProductsStr = `export const genericProducts = [
  {
    slug: 'metallic-wallpaper',
    title: 'Metallic Wallpaper',
    category: 'Wallpaper',
    price: 1500,
    description: 'Add a touch of elegance and shine to your walls with our premium metallic wallpapers. These wallpapers are crafted to reflect light beautifully, creating a luxurious atmosphere in any room.',
    features: ['Premium Metallic Finish', 'Reflective Surface', 'Durable & Washable', 'Easy to Install'],
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'metallic-blinds',
    title: 'Metallic Blinds',
    category: 'Blinds',
    price: 2200,
    description: 'Sleek and modern metallic blinds providing perfect light control and a contemporary look. Designed for both residential and commercial spaces needing a sophisticated touch.',
    features: ['Precision Light Control', 'Modern Aesthetic', 'Rust-Resistant', 'Smooth Operation'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'metallic-glass-films',
    title: 'Metallic Glass Films',
    category: 'Glass Films',
    price: 1200,
    description: 'Enhance privacy and aesthetics with our specialized metallic glass films. Perfect for office partitions and modern home windows, offering a mirror-like finish from the outside.',
    features: ['Enhanced Privacy', 'UV Protection', 'Mirror Finish', 'Scratch-Resistant'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'metallic-canvas-frames',
    title: 'Metallic Canvas Frames',
    category: 'Frames',
    price: 3500,
    description: 'Beautifully crafted metallic canvas frames to showcase your art in style. The metallic edges provide a striking contrast that elevates any artwork or photograph.',
    features: ['Sturdy Build', 'Elegant Metallic Edge', 'Various Sizes', 'Gallery Quality'],
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'wall-murals',
    title: 'Wall Murals',
    category: 'Murals',
    price: 4500,
    description: 'Transform your room with our stunning, high-quality large scale wall murals. Choose from our vast collection or provide your own custom design for a truly unique space.',
    features: ['High-Resolution Print', 'Custom Sizing', 'Seamless Look', 'Vibrant Colors'],
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'canvas-frames',
    title: 'Canvas Frames',
    category: 'Frames',
    price: 2500,
    description: 'Classic and durable canvas frames for your personal or commercial art pieces. Made from premium materials ensuring your canvas stays taut and beautifully presented.',
    features: ['Solid Wood Option', 'Taut Stretching', 'Classic Look', 'Durable'],
    image: 'https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'decorative-glass-films',
    title: 'Decorative Glass Films',
    category: 'Glass Films',
    price: 900,
    description: 'Add beautiful patterns and privacy to your glass surfaces with our decorative films. Ranging from frosted finishes to intricate stained-glass styles.',
    features: ['Various Patterns', 'Light Filtering', 'Easy to Apply', 'Residue-Free Removal'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'blinds',
    title: 'Blinds',
    category: 'Blinds',
    price: 1800,
    description: 'Versatile and stylish window blinds to suit any room and decor. Our classic blinds offer durability, easy maintenance, and excellent light filtration.',
    features: ['Easy Maintenance', 'Durable Materials', 'Versatile Styles', 'Custom Fit'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    gallery: []
  }
];`;

const regex = /export const genericProducts = \[[\s\S]*?\];/;
if (regex.test(content)) {
    content = content.replace(regex, newGenericProductsStr);
    fs.writeFileSync(file, content);
    console.log('Successfully updated genericProducts array with proper Unsplash images.');
} else {
    console.log('Could not find genericProducts array to replace.');
}

