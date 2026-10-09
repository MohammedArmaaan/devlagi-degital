import sys

with open('src/lib/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# genericProducts ends at the end of the file.
new_products = """  ,{
    slug: 'wpc-wall-panel',
    title: 'WPC Wall Panel',
    category: 'Wall Panel',
    price: 1800,
    description: 'Durable, water-resistant, and stylish wall panels for modern interiors. Perfect for both residential spaces and commercial settings needing a premium finish.',
    features: ['Water-Resistant', 'Durable', 'Modern Aesthetic', 'Easy Maintenance'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'wpc-cutout-wallpaper',
    title: 'WPC Cutout Wallpaper',
    category: 'Wallpaper',
    price: 2100,
    description: 'Innovative cutout designs combined with WPC durability for stunning feature walls. Create a truly unique and textured look that instantly elevates any room.',
    features: ['Unique Cutout Design', 'High Durability', 'Textured Look', 'Premium Quality'],
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'terra-floors',
    title: 'Terra Floors',
    category: 'Flooring',
    price: 3200,
    description: 'Elegant, durable flooring solutions with natural textures and earthy tones. These floors bring a warm, grounded aesthetic to your space while maintaining high structural integrity.',
    features: ['Natural Texture', 'Earthy Tones', 'High Durability', 'Elegant Finish'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    gallery: []
  },
  {
    slug: 'digital-curtains',
    title: 'Digital Curtains',
    category: 'Curtains',
    price: 1600,
    description: 'High-definition digitally printed curtains to precisely match your custom decor. Soft, light-filtering fabrics combined with stunning custom art for a perfect window treatment.',
    features: ['High-Def Prints', 'Custom Decor', 'Light Filtering', 'Soft Fabric'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    gallery: []
  }
];"""

content = content.replace("  }\n];", "  }\n" + new_products)
content = content.replace("  }\r\n];", "  }\r\n" + new_products)

with open('src/lib/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

