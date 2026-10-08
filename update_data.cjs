const fs = require('fs');

const newBlock = `export const genericProducts = [
  {
    slug: 'metallic-wallpaper',
    title: 'Metallic Wallpaper',
    category: 'Wallpaper',
    price: 1500,
    description: 'Add a touch of elegance and shine to your walls with our premium metallic wallpapers. These wallpapers are crafted to reflect light beautifully, creating a luxurious atmosphere in any room.',
    features: ['Premium Metallic Finish', 'Reflective Surface', 'Durable & Washable', 'Easy to Install'],
    image: 'https://images.pexels.com/photos/934055/pexels-photo-934055.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/934055/pexels-photo-934055.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    slug: 'metallic-blinds',
    title: 'Metallic Blinds',
    category: 'Blinds',
    price: 2200,
    description: 'Sleek and modern metallic blinds providing perfect light control and a contemporary look. Designed for both residential and commercial spaces needing a sophisticated touch.',
    features: ['Precision Light Control', 'Modern Aesthetic', 'Rust-Resistant', 'Smooth Operation'],
    image: 'https://images.pexels.com/photos/2766329/pexels-photo-2766329.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/2766329/pexels-photo-2766329.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1570881/pexels-photo-1570881.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    slug: 'metallic-glass-films',
    title: 'Metallic Glass Films',
    category: 'Glass Films',
    price: 1200,
    description: 'Enhance privacy and aesthetics with our specialized metallic glass films. Perfect for office partitions and modern home windows, offering a mirror-like finish from the outside.',
    features: ['Enhanced Privacy', 'UV Protection', 'Mirror Finish', 'Scratch-Resistant'],
    image: 'https://images.pexels.com/photos/2451558/pexels-photo-2451558.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/2451558/pexels-photo-2451558.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    slug: 'metallic-canvas-frames',
    title: 'Metallic Canvas Frames',
    category: 'Frames',
    price: 3500,
    description: 'Beautifully crafted metallic canvas frames to showcase your art in style. The metallic edges provide a striking contrast that elevates any artwork or photograph.',
    features: ['Sturdy Build', 'Elegant Metallic Edge', 'Various Sizes', 'Gallery Quality'],
    image: 'https://images.pexels.com/photos/395079/pexels-photo-395079.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/395079/pexels-photo-395079.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2364070/pexels-photo-2364070.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    slug: 'wall-murals',
    title: 'Wall Murals',
    category: 'Murals',
    price: 4500,
    description: 'Transform your room with our stunning, high-quality large scale wall murals. Choose from our vast collection or provide your own custom design for a truly unique space.',
    features: ['High-Resolution Print', 'Custom Sizing', 'Seamless Look', 'Vibrant Colors'],
    image: 'https://images.pexels.com/photos/1031302/pexels-photo-1031302.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1031302/pexels-photo-1031302.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    slug: 'canvas-frames',
    title: 'Canvas Frames',
    category: 'Frames',
    price: 2500,
    description: 'Classic and durable canvas frames for your personal or commercial art pieces. Made from premium materials ensuring your canvas stays taut and beautifully presented.',
    features: ['Solid Wood Option', 'Taut Stretching', 'Classic Look', 'Durable'],
    image: 'https://images.pexels.com/photos/2364070/pexels-photo-2364070.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/2364070/pexels-photo-2364070.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/395079/pexels-photo-395079.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    slug: 'decorative-glass-films',
    title: 'Decorative Glass Films',
    category: 'Glass Films',
    price: 900,
    description: 'Add beautiful patterns and privacy to your glass surfaces with our decorative films. Ranging from frosted finishes to intricate stained-glass styles.',
    features: ['Various Patterns', 'Light Filtering', 'Easy to Apply', 'Residue-Free Removal'],
    image: 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2451558/pexels-photo-2451558.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    slug: 'blinds',
    title: 'Blinds',
    category: 'Blinds',
    price: 1800,
    description: 'Versatile and stylish window blinds to suit any room and decor. Our classic blinds offer durability, easy maintenance, and excellent light filtration.',
    features: ['Easy Maintenance', 'Durable Materials', 'Versatile Styles', 'Custom Fit'],
    image: 'https://images.pexels.com/photos/1570881/pexels-photo-1570881.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/1570881/pexels-photo-1570881.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2766329/pexels-photo-2766329.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];`;

let data = fs.readFileSync('src/lib/data.ts', 'utf8');
data = data.replace(/export const genericProducts = \[[\s\S]*?\];/, newBlock);
fs.writeFileSync('src/lib/data.ts', data);
console.log('Images updated to Pexels!');
