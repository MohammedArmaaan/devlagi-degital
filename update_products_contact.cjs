const fs = require('fs');
const path = require('path');

// Update Products.tsx
const productsPath = path.join(__dirname, 'src', 'pages', 'Products.tsx');
let productsContent = fs.readFileSync(productsPath, 'utf8');

const productsBannerSection = `<section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1920&q=80" alt="Banner" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Our Catalog</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Premium Products</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">
                Discover our extensive collection of high-quality wallpapers, blinds, glass films, and frames. Designed to elevate any space with style and durability.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>`;

// Replace the existing section in Products.tsx
const oldProductsSectionRegex = /<section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden flex items-center justify-center min-h-\[40vh\]">[\s\S]*?<\/section>/;
productsContent = productsContent.replace(oldProductsSectionRegex, productsBannerSection);
fs.writeFileSync(productsPath, productsContent, 'utf8');
console.log('Products.tsx banner updated.');

// Update Contact.tsx image
const contactPath = path.join(__dirname, 'src', 'pages', 'Contact.tsx');
let contactContent = fs.readFileSync(contactPath, 'utf8');

contactContent = contactContent.replace(
  /"https:\/\/images\.unsplash\.com\/photo-1516322311468-5b530f367eb7[^"]+"/,
  '"https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=80"'
);
fs.writeFileSync(contactPath, contactContent, 'utf8');
console.log('Contact.tsx image updated.');

