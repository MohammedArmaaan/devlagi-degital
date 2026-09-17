const fs = require('fs');
let content = fs.readFileSync('src/lib/data.ts', 'utf8');

const productsData = `
export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  isNewArrival?: boolean;
};

export const productsList: Product[] = [
  {
    id: 'p1',
    slug: 'premium-damask-wallpaper',
    title: 'Premium Damask Wallpaper',
    category: 'Wallpaper',
    price: 2400,
    description: 'Elegant damask pattern wallpaper that brings a touch of classic luxury to any room. Made with premium vinyl material for durability and easy cleaning.',
    features: ['Washable vinyl', 'Fade resistant', 'Easy to install', 'Textured finish'],
    image: 'https://images.pexels.com/photos/33419833/pexels-photo-33419833.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/33419833/pexels-photo-33419833.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/18285958/pexels-photo-18285958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p2',
    slug: 'geometric-frosted-film',
    title: 'Geometric Frosted Glass Film',
    category: 'Glass Film',
    price: 1200,
    description: 'Modern geometric pattern frosted film for windows and partitions. Provides excellent privacy while allowing natural light to flow through.',
    features: ['UV protection', 'Self-adhesive', 'Removable', 'Scratch resistant'],
    image: 'https://images.pexels.com/photos/29508048/pexels-photo-29508048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/29508048/pexels-photo-29508048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5869295/pexels-photo-5869295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p3',
    slug: 'botanical-print-wallpaper',
    title: 'Botanical Print Wallpaper',
    category: 'Wallpaper',
    price: 2100,
    description: 'Bring nature indoors with this stunning botanical print wallpaper. Perfect for feature walls in living rooms or bedrooms.',
    features: ['Eco-friendly ink', 'Matte finish', 'Breathable material', 'Custom sizing available'],
    image: 'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p4',
    slug: 'gradient-privacy-film',
    title: 'Gradient Privacy Film',
    category: 'Glass Film',
    price: 1500,
    description: 'Seamless gradient transition from frosted opaque to clear transparent. Ideal for conference rooms and office partitions.',
    features: ['Professional look', 'Custom cut', 'Glare reduction', 'Long lasting'],
    image: 'https://images.pexels.com/photos/7511755/pexels-photo-7511755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7511755/pexels-photo-7511755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p5',
    slug: 'metallic-accent-wallpaper',
    title: 'Metallic Accent Wallpaper',
    category: 'Wallpaper',
    price: 2800,
    description: 'Sophisticated wallpaper featuring subtle metallic geometric accents that catch the light beautifully.',
    features: ['Metallic sheen', 'Heavy duty', 'Washable', 'Premium texture'],
    image: 'https://images.pexels.com/photos/12995673/pexels-photo-12995673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/12995673/pexels-photo-12995673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ]
  },
  {
    id: 'p6',
    slug: 'solar-control-film',
    title: 'Solar Control Window Film',
    category: 'Glass Film',
    price: 1800,
    description: 'High-performance solar control film that rejects up to 80% of solar energy, keeping interiors cool and reducing energy costs.',
    features: ['Heat reduction', '99% UV block', 'Daytime privacy', 'Energy saving'],
    image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ]
  }
];
`;

if (!content.includes('export type Product')) {
  fs.writeFileSync('src/lib/data.ts', content + '\n' + productsData, 'utf8');
}

