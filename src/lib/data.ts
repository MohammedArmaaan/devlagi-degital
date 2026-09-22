export const business = {
  name: 'Devlaji Digital Home Decor',
  tagline: 'Manufacturers of Customized Wallpaper & Home Decor',
  phone: '090237 91865',
  phoneRaw: '+919023791865',
  address: 'B/10, Danilimda Rd, opp. Laljibhai Parmar Hall, Calico Mills, Behrampura, Ahmedabad, Gujarat 380022',
  shortAddress: 'Behrampura, Ahmedabad, Gujarat 380022',
  hours: 'Mon–Sat: 10:00 AM – 9:00 PM',
  rating: '5.0',
  reviewCount: 'Google Reviews',
  instagram: 'https://www.instagram.com/devlaji_digital',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Devlaji+Digital+Home+Decor+Ahmedabad',
};

export type SubCategory = {
  id: string;
  slug: string;
  title: string;
  image: string;
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  subcategories?: SubCategory[];
};

export const categories: Category[] = [
  {
    id: 'c1',
    slug: 'wpc-wall-panel',
    title: 'WPC Wall Panel',
    description: 'Durable, water-resistant, and stylish wall panels for modern interiors.',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc1-1', slug: 'fluted-panels', title: 'Fluted Panels', image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc1-2', slug: 'wood-finish', title: 'Wood Finish', image: 'https://images.pexels.com/photos/172289/pexels-photo-172289.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c2',
    slug: 'wpc-cutout-wallpaper',
    title: 'WPC Cutout Wallpaper',
    description: 'Innovative cutout designs combined with WPC durability for feature walls.',
    image: 'https://images.pexels.com/photos/12995673/pexels-photo-12995673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc2-1', slug: 'geometric-cutout', title: 'Geometric', image: 'https://images.pexels.com/photos/1109015/pexels-photo-1109015.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc2-2', slug: 'floral-cutout', title: 'Floral Patterns', image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c3',
    slug: 'metallic-wallpaper',
    title: 'Metallic Wallpaper',
    description: 'Add a touch of luxury and shine with our premium metallic finish wallpapers.',
    image: 'https://images.pexels.com/photos/3705539/pexels-photo-3705539.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc3-1', slug: 'gold-foil', title: 'Gold Foil', image: 'https://images.pexels.com/photos/10123545/pexels-photo-10123545.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc3-2', slug: 'silver-accents', title: 'Silver Accents', image: 'https://images.pexels.com/photos/3629471/pexels-photo-3629471.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c4',
    slug: 'metallic-blinds',
    title: 'Metallic Blinds',
    description: 'Sleek, modern blinds with metallic finishes for contemporary light control.',
    image: 'https://images.pexels.com/photos/205629/pexels-photo-205629.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc4-1', slug: 'venetian', title: 'Venetian Blinds', image: 'https://images.pexels.com/photos/168438/pexels-photo-168438.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc4-2', slug: 'roller', title: 'Roller Blinds', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c5',
    slug: 'wall-murals',
    title: 'Wall Murals',
    description: 'Breathtaking, large-scale custom murals that transform your entire room.',
    image: 'https://images.pexels.com/photos/135018/pexels-photo-135018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc5-1', slug: 'nature', title: 'Nature & Landscapes', image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc5-2', slug: 'abstract', title: 'Abstract Art', image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c6',
    slug: 'metallic-glass-films',
    title: 'Metallic Glass Films',
    description: 'Reflective and privacy-enhancing glass films with a premium metallic sheen.',
    image: 'https://images.pexels.com/photos/5869295/pexels-photo-5869295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc6-1', slug: 'mirror-finish', title: 'Mirror Finish', image: 'https://images.pexels.com/photos/5869295/pexels-photo-5869295.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc6-2', slug: 'tinted-metallic', title: 'Tinted Metallic', image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c7',
    slug: 'metallic-canvas-frames',
    title: 'Metallic Canvas Frames',
    description: 'Stunning wall art printed on canvas with metallic foil accents.',
    image: 'https://images.pexels.com/photos/1838144/pexels-photo-1838144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc7-1', slug: 'gold-leaf', title: 'Gold Leaf Art', image: 'https://images.pexels.com/photos/1838144/pexels-photo-1838144.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc7-2', slug: 'silver-brush', title: 'Silver Brush', image: 'https://images.pexels.com/photos/3705539/pexels-photo-3705539.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c8',
    slug: 'terra-floors',
    title: 'Terra Floors',
    description: 'Elegant, durable flooring solutions with natural textures and earthy tones.',
    image: 'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc8-1', slug: 'terrazzo', title: 'Terrazzo Finish', image: 'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc8-2', slug: 'stone-texture', title: 'Stone Texture', image: 'https://images.pexels.com/photos/168438/pexels-photo-168438.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c9',
    slug: 'digital-curtains',
    title: 'Digital Curtains',
    description: 'High-definition digitally printed curtains to match your custom decor.',
    image: 'https://images.pexels.com/photos/205629/pexels-photo-205629.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc9-1', slug: 'sheer', title: 'Sheer Curtains', image: 'https://images.pexels.com/photos/205629/pexels-photo-205629.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc9-2', slug: 'blackout', title: 'Blackout Curtains', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c10',
    slug: 'blinds',
    title: 'Blinds',
    description: 'Classic and modern window blinds tailored to your exact measurements.',
    image: 'https://images.pexels.com/photos/168438/pexels-photo-168438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc10-1', slug: 'roman-blinds', title: 'Roman Blinds', image: 'https://images.pexels.com/photos/168438/pexels-photo-168438.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc10-2', slug: 'vertical-blinds', title: 'Vertical Blinds', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c11',
    slug: 'decorative-glass-films',
    title: 'Decorative Glass Films',
    description: 'Frosted, patterned, and stained glass films for privacy and aesthetics.',
    image: 'https://images.pexels.com/photos/29508048/pexels-photo-29508048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc11-1', slug: 'frosted', title: 'Frosted Films', image: 'https://images.pexels.com/photos/5869295/pexels-photo-5869295.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc11-2', slug: 'stained-glass', title: 'Stained Glass', image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
  {
    id: 'c12',
    slug: 'canvas-frames',
    title: 'Canvas Frames',
    description: 'Custom printed canvas wall art stretched on premium wooden frames.',
    image: 'https://images.pexels.com/photos/1838144/pexels-photo-1838144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    subcategories: [
      { id: 'sc12-1', slug: 'multi-panel', title: 'Multi-Panel Canvas', image: 'https://images.pexels.com/photos/1838144/pexels-photo-1838144.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
      { id: 'sc12-2', slug: 'single-panel', title: 'Single Panel', image: 'https://images.pexels.com/photos/135018/pexels-photo-135018.jpeg?auto=compress&cs=tinysrgb&h=400&w=400' },
    ]
  },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  benefits: string[];
  applications: string[];
  image: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: 'decorative-glass-film',
    title: 'Decorative Glass Film',
    short: 'Stylish privacy with natural light — premium films for doors, partitions, and windows.',
    description:
      'Our signature decorative glass film transforms plain glass into an elegant design feature while maintaining privacy and natural light flow. Manufactured with UV-blocking, scratch-resistant, and easy-clean technology, each film is custom-printed with patterns ranging from classic line-art to contemporary geometric designs.',
    benefits: [
      'Privacy without sacrificing natural light',
      'UV protection for interiors and furnishings',
      'Scratch-resistant durable surface',
      'Easy to clean and maintain',
      'Custom patterns and designs',
      'Professional installation included',
    ],
    applications: ['Office partitions', 'Home doors & windows', 'Conference rooms', 'Retail displays', 'Bathroom privacy', 'Shopfronts'],
    image: 'https://images.pexels.com/photos/29508048/pexels-photo-29508048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Layers',
  },
  {
    slug: 'customized-wallpaper',
    title: 'Customized Wallpaper',
    short: 'Bespoke wallpaper manufactured to your design — printed, delivered, and installed.',
    description:
      'We manufacture customized wallpaper tailored to your exact space and style. From damask and floral classics to modern geometrics and bespoke prints, every roll is produced in-house with high-resolution digital printing on premium substrates. Our team handles measurement, design consultation, printing, and professional installation.',
    benefits: [
      'Custom designs and patterns',
      'High-resolution digital printing',
      'Premium quality substrates',
      'Moisture and fade resistant',
      'Perfect fit for any wall dimension',
      'Full installation service',
    ],
    applications: ['Living rooms', 'Bedrooms', 'Office reception areas', 'Hotel lobbies', 'Restaurant interiors', 'Feature walls'],
    image: 'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Wallpaper',
  },
  {
    slug: 'privacy-glass-solutions',
    title: 'Privacy Glass Solutions',
    short: 'Frosted and textured films that create private spaces while keeping them bright.',
    description:
      'Our privacy glass solutions use advanced frosted and textured films to create secluded spaces without blocking light. Ideal for bathrooms, office meeting rooms, and street-facing windows, these films provide a clean, architectural finish that complements both traditional and contemporary interiors.',
    benefits: [
      'Complete or partial privacy control',
      'Maintains natural illumination',
      'Frosted, textured, or gradient finishes',
      'No need to replace existing glass',
      'Removable and upgradable',
      'Professional seamless application',
    ],
    applications: ['Bathroom windows', 'Office meeting rooms', 'Street-facing shopfronts', 'Bedroom partitions', 'Hospital cubicles', 'Clinic doors'],
    image: 'https://images.pexels.com/photos/5869295/pexels-photo-5869295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'EyeOff',
  },
  {
    slug: 'uv-protection-films',
    title: 'UV Protection & Sun Control Films',
    short: 'Block harmful UV rays, reduce heat, and protect your interiors.',
    description:
      'Our UV protection and sun control films are engineered to block up to 99% of harmful UV rays while significantly reducing heat and glare. These films protect furniture, artwork, and flooring from fading, lower cooling costs, and create a more comfortable indoor environment year-round.',
    benefits: [
      'Blocks up to 99% of UV rays',
      'Reduces heat and glare',
      'Protects interiors from fading',
      'Lowers cooling costs',
      'Clear or tinted options',
      'Long-lasting performance',
    ],
    applications: ['Home windows', 'Office buildings', 'Retail storefronts', 'Showrooms', 'Glass facades', 'Skylights'],
    image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Sun',
  },
  {
    slug: 'residential-decor',
    title: 'Residential Home Decor',
    short: 'Complete decor solutions for homes — from feature walls to full-room transformations.',
    description:
      'We bring our manufacturing expertise directly to your home. Whether it is a single feature wall, a full-room wallpaper installation, or decorative glass film for your doors and windows, our team works with you from concept to completion. We handle design consultation, material selection, custom manufacturing, and professional installation.',
    benefits: [
      'End-to-end design consultation',
      'Custom manufacturing for your space',
      'Professional installation team',
      'Wide range of materials and finishes',
      'Residential-friendly process',
      'After-installation support',
    ],
    applications: ['Living rooms', 'Bedrooms', 'Kitchens', 'Bathrooms', 'Hallways & staircases', 'Home offices'],
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Home',
  },
  {
    slug: 'commercial-decor',
    title: 'Commercial & Office Decor',
    short: 'Professional decor solutions for offices, showrooms, and retail spaces.',
    description:
      'We partner with businesses to create distinctive interiors that reflect their brand. From office glass partitions with custom-printed films to branded wallpaper in reception areas and showrooms, our commercial decor service delivers a polished, professional look with minimal disruption to your operations.',
    benefits: [
      'Brand-aligned design options',
      'Minimal disruption installation',
      'Durable commercial-grade materials',
      'Bulk and repeat order capability',
      'Project management support',
      'Maintenance and replacement services',
    ],
    applications: ['Corporate offices', 'Retail showrooms', 'Hotels & restaurants', 'Clinics & hospitals', 'Educational institutes', 'Shopping malls'],
    image: 'https://images.pexels.com/photos/7511755/pexels-photo-7511755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: 'Building2',
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  requirement: string;
  solution: string;
  materials: string;
  image: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    slug: 'modern-living-room-wallpaper',
    title: 'Contemporary Living Room Feature Wall',
    category: 'Residential',
    location: 'Ahmedabad, Gujarat',
    requirement: 'The client wanted a striking feature wall for their living room that would serve as a conversation piece while complementing their minimalist furniture.',
    solution: 'We designed and manufactured a custom geometric wallpaper in warm charcoal tones with subtle gold accents. The wallpaper was printed in-house on premium matte substrate and installed seamlessly across a 14-foot wall.',
    materials: 'Custom-printed matte wallpaper, gold-foil accent strips',
    image: 'https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7545494/pexels-photo-7545494.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7535020/pexels-photo-7535020.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    slug: 'office-glass-partition',
    title: 'Office Glass Partition Branding',
    category: 'Commercial',
    location: 'Behrampura, Ahmedabad',
    requirement: 'A growing company needed to divide their open office into meeting spaces while maintaining light flow and adding subtle branding.',
    solution: 'We installed custom-printed decorative glass film on existing glass partitions, featuring a geometric line-art pattern in the company brand colours. The film provided privacy for meetings while keeping the space bright and open.',
    materials: 'Custom-printed decorative glass film, application tools',
    image: 'https://images.pexels.com/photos/7511755/pexels-photo-7511755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/7511755/pexels-photo-7511755.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5869295/pexels-photo-5869295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6794935/pexels-photo-6794935.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    slug: 'luxury-bedroom-suite',
    title: 'Luxury Bedroom Suite Transformation',
    category: 'Residential',
    location: 'Ahmedabad, Gujarat',
    requirement: 'A homeowner wanted to transform their master bedroom into a serene, hotel-suite-like retreat with textured wallpaper and privacy film on the windows.',
    solution: 'We installed a soft, textured wallpaper in warm ivory tones across all four walls, then applied a gradient frosted film to the bedroom windows for privacy without losing natural light.',
    materials: 'Textured ivory wallpaper, gradient frosted privacy film',
    image: 'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6782568/pexels-photo-6782568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17735412/pexels-photo-17735412.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    slug: 'retail-showroom-decor',
    title: 'Retail Showroom Interior',
    category: 'Commercial',
    location: 'Ahmedabad, Gujarat',
    requirement: 'A fashion boutique needed a distinctive interior that would showcase their products while creating an Instagram-worthy atmosphere.',
    solution: 'We combined custom-printed wallpaper with decorative glass film on the storefront windows. The wallpaper featured a subtle damask pattern in charcoal, while the storefront film provided UV protection for the merchandise and added a branded frosted border.',
    materials: 'Custom damask wallpaper, UV-protection storefront film, branded frosted border film',
    image: 'https://images.pexels.com/photos/8386654/pexels-photo-8386654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/8386654/pexels-photo-8386654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32549949/pexels-photo-32549949.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/8311880/pexels-photo-8311880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    slug: 'conference-room-privacy',
    title: 'Conference Room Privacy Solution',
    category: 'Commercial',
    location: 'Ahmedabad, Gujarat',
    requirement: 'A corporate office needed to add privacy to their glass-walled conference room without making the space feel closed off.',
    solution: 'We applied a custom gradient frosted film that transitions from fully transparent at eye level to opaque at the bottom, providing privacy for seated meetings while keeping the glass visible at standing height.',
    materials: 'Gradient frosted decorative film, precision-cut application',
    image: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5483051/pexels-photo-5483051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7534210/pexels-photo-7534210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
  {
    slug: 'classic-damask-dining',
    title: 'Classic Damask Dining Room',
    category: 'Residential',
    location: 'Ahmedabad, Gujarat',
    requirement: 'A family wanted to bring old-world elegance to their dining room with a classic pattern that would suit their traditional furniture.',
    solution: 'We manufactured a custom damask wallpaper in deep burgundy and gold tones, printed at high resolution on a durable substrate. The installation was completed in a single day with seamless pattern matching across all walls.',
    materials: 'Custom burgundy-and-gold damask wallpaper, matte finish substrate',
    image: 'https://images.pexels.com/photos/18285958/pexels-photo-18285958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/18285958/pexels-photo-18285958.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/9099741/pexels-photo-9099741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/38657011/pexels-photo-38657011.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
  },
];

export type Brochure = {
  slug: string;
  title: string;
  category: string;
  description: string;
  pages: number;
  image: string;
};

export const brochures: Brochure[] = [
  {
    slug: 'decorative-glass-film-collection',
    title: 'Decorative Glass Film Collection',
    category: 'Glass Film',
    description: 'Complete catalogue of our decorative glass film patterns, including line-art, geometric, frosted, and gradient designs. Features technical specifications and application guides.',
    pages: 24,
    image: 'https://images.pexels.com/photos/29508048/pexels-photo-29508048.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'wallpaper-design-catalogue',
    title: 'Wallpaper Design Catalogue',
    category: 'Wallpaper',
    description: 'Our full range of customizable wallpaper designs — from classic damask and floral patterns to modern geometrics and bespoke prints. Includes substrate options and printing specifications.',
    pages: 36,
    image: 'https://images.pexels.com/photos/33419833/pexels-photo-33419833.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'privacy-solutions-guide',
    title: 'Privacy Solutions Guide',
    category: 'Glass Film',
    description: 'Detailed guide to our privacy glass solutions, covering frosted films, textured finishes, and gradient applications for residential and commercial spaces.',
    pages: 18,
    image: 'https://images.pexels.com/photos/5869295/pexels-photo-5869295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'uv-protection-brochure',
    title: 'UV Protection & Sun Control',
    category: 'Glass Film',
    description: 'Technical brochure covering our UV protection and sun control film range, with performance data, heat reduction specifications, and installation guidelines.',
    pages: 12,
    image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'residential-decor-portfolio',
    title: 'Residential Decor Portfolio',
    category: 'Home Decor',
    description: 'A curated selection of our residential decor projects, showcasing feature walls, full-room transformations, and custom installations completed across Ahmedabad.',
    pages: 30,
    image: 'https://images.pexels.com/photos/7546323/pexels-photo-7546323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'commercial-solutions-brochure',
    title: 'Commercial Solutions Brochure',
    category: 'Commercial',
    description: 'Overview of our commercial decor capabilities, including office partitions, branded interiors, retail showroom solutions, and bulk order options.',
    pages: 20,
    image: 'https://images.pexels.com/photos/7511746/pexels-photo-7511746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];


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
  },
  {
    id: 'p7',
    slug: 'vintage-floral-wallpaper',
    title: 'Vintage Floral Wallpaper',
    category: 'Wallpaper',
    price: 1900,
    description: 'Charming vintage floral design that adds a romantic, timeless feel to bedrooms and boutique spaces. Features rich, color-fast pigments.',
    features: ['Color-fast pigments', 'Tear resistant', 'Smooth finish', 'Wipeable surface'],
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p8',
    slug: 'stained-glass-film',
    title: 'Stained Glass Window Film',
    category: 'Glass Film',
    price: 1400,
    description: 'Beautiful faux stained glass film that transforms plain windows into vibrant works of art while obscuring the view for privacy.',
    features: ['Vibrant colors', 'Light filtering', 'Peel and stick', 'Water resistant'],
    image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p9',
    slug: 'marble-texture-wallpaper',
    title: 'Luxury Marble Texture Wallpaper',
    category: 'Wallpaper',
    price: 3200,
    description: 'High-end faux marble wallpaper with stunning realistic veining. Perfect for modern living rooms, hotel lobbies, and executive suites.',
    features: ['Ultra-realistic print', 'Thick vinyl', 'Seamless matching', 'Moisture resistant'],
    image: 'https://images.pexels.com/photos/1409215/pexels-photo-1409215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/1409215/pexels-photo-1409215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p10',
    slug: 'blackout-privacy-film',
    title: 'Total Blackout Window Film',
    category: 'Glass Film',
    price: 1100,
    description: '100% light-blocking blackout film. Ideal for media rooms, photography darkrooms, or shift-worker bedrooms requiring complete darkness.',
    features: ['100% light block', 'Two-way privacy', 'Residue-free removal', 'Easy application'],
    image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ],
    isNewArrival: true,
  },
  {
    id: 'p11',
    slug: '3d-brick-wallpaper',
    title: 'Urban 3D Brick Wallpaper',
    category: 'Wallpaper',
    price: 1600,
    description: 'Create an instant industrial loft vibe with this highly textured 3D faux brick wallpaper. Great for cafes, studios, and accent walls.',
    features: ['Embossed texture', 'Paintable', 'Sound dampening', 'Thick material'],
    image: 'https://images.pexels.com/photos/172289/pexels-photo-172289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/172289/pexels-photo-172289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
    ]
  }
];
