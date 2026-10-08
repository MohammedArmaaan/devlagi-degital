const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataFilePath, 'utf8');

const newServices = `export const services: Service[] = [
  {
    slug: 'customization-and-bespoke-printing',
    title: 'Customization & Bespoke Printing',
    short: 'Specialized custom-printing service for interior decor, dictating specific designs onto multiple materials.',
    description:
      'We operate as a specialized custom-printing service for interior decor rather than selling off-the-shelf inventory. Clients can dictate specific designs, dimensions, and visual requirements. We precisely print your vision onto premium materials including metallic foils, glass films, canvas frames, and roller blinds.',
    benefits: [
      'Completely personalized designs',
      'Flexible dimensions for any space',
      'Premium material options (metallic, canvas, glass film)',
      'High-resolution bespoke prints',
    ],
    applications: ['Residential living spaces', 'Corporate offices', 'Retail stores', 'Boutique hotels', 'Feature walls'],
    image: 'https://images.unsplash.com/photo-1598368195835-91e67f80c9d7?auto=format&fit=crop&w=800&q=80',
    icon: 'Printer',
  },
  {
    slug: 'end-to-end-project-execution',
    title: 'End-to-End Project Execution',
    short: 'Full-scale decor implementation with over 54,000+ completed projects and seamless installation.',
    description:
      'Operating heavily in the project space, we provide full-scale decor implementation. Having successfully completed over 54,000+ projects, we directly manage and facilitate the on-site application of our customized wallpapers, wall panels, and murals. Our experienced team ensures a seamless installation process from start to finish.',
    benefits: [
      'Over 54,000+ completed projects',
      'Professional, seamless installation',
      'Hassle-free end-to-end management',
      'Expert handling of delicate materials',
    ],
    applications: ['Large-scale commercial projects', 'Residential renovations', 'Hospitality interiors', 'Retail rollouts'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    icon: 'Hammer',
  },
  {
    slug: 'space-transformation',
    title: 'Space Transformation',
    short: 'Dedicated outfitting services adapting material output for both individual homes and large commercial spaces.',
    description:
      'We offer dedicated outfitting services designed for two distinct markets. Whether you need individual home interior styling or a large-scale commercial space transformation, we adapt our material output to match the durability, aesthetic, and scale required—ensuring perfect results for both cozy living spaces and high-traffic offices.',
    benefits: [
      'Tailored for both homes and offices',
      'Adaptive material durability',
      'Complete aesthetic overhaul',
      'Scalable design solutions',
    ],
    applications: ['Home interior styling', 'Commercial space makeovers', 'Office remodeling', 'Restaurant redesigns'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    icon: 'Sparkles',
  },
  {
    slug: 'b2b-dealership-programs',
    title: 'B2B Dealership & Distributorship',
    short: 'Global B2B partnership service supplying premium decor to entrepreneurs and retail stores.',
    description:
      'We run a robust global business-to-business (B2B) partnership program. This service is uniquely designed to supply premium interior design products to local entrepreneurs, interior design firms, and retail stores. By becoming an official Devlaji Digital dealer, partners can expand their own product offerings and market reach with our high-quality inventory.',
    benefits: [
      'Global B2B partnership opportunities',
      'Expand your retail product offerings',
      'Access to premium decor inventory',
      'Dedicated support for design firms',
    ],
    applications: ['Local entrepreneurs', 'Interior design firms', 'Retail decor stores', 'Global distributors'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80',
    icon: 'Handshake',
  },
  {
    slug: 'direct-primary-manufacturing-oem',
    title: 'Direct Primary Manufacturing (OEM)',
    short: 'In-house manufacturing facility providing direct, middleman-free supply to architects and bulk buyers.',
    description:
      'Operating from our own state-of-the-art facility in Ahmedabad, we act as a primary manufacturer (OEM). We provide direct manufacturing services to interior designers, architects, and bulk buyers. This cuts out the middlemen, allowing us to supply highly customized, premium decor items directly from the production line to your project.',
    benefits: [
      'No middlemen, direct factory pricing',
      'In-house Ahmedabad facility',
      'High-volume production capacity',
      'Quality control at the source',
    ],
    applications: ['Architectural firms', 'Bulk project buyers', 'Interior designers', 'Contractors'],
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=800&q=80',
    icon: 'Factory',
  }
];`;

const servicesRegex = /export const services:\s*Service\[\]\s*=\s*\[[\s\S]*?\];/;
if (servicesRegex.test(content)) {
  content = content.replace(servicesRegex, newServices);
  fs.writeFileSync(dataFilePath, content, 'utf8');
  console.log("Services array updated successfully.");
} else {
  console.error("Could not find services array in data.ts");
}
