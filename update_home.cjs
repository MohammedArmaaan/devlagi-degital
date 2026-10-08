const fs = require('fs');
let text = fs.readFileSync('src/pages/Home.tsx', 'utf8');

if(!text.includes('genericProducts')) {
    text = text.replace('projects,', 'projects, genericProducts,');
}

const collectionsSection = `
      {/* Premium Collections Section */}
      <section className="py-16 md:py-24 bg-[#f4f2ee] relative">
        <div className="container-luxe max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-burgundy-600 font-bold mb-4 block">
                  Collections
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-ink-950 mb-6">Premium Collections</h2>
                <div className="w-12 h-0.5 bg-burgundy-600" />
              </div>
              <button onClick={() => navigate('/products')} className="btn-outline group !px-6 !py-3 flex items-center gap-2 text-xs border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white transition-colors">
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {genericProducts.slice(0, 4).map((product, idx) => (
              <FadeIn key={product.slug} delay={idx * 0.1}>
                <div 
                  onClick={() => navigate(\`/products/\${product.slug}\`)}
                  className="group cursor-pointer flex flex-col h-full bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-sm overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-ink-50">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-ink-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-burgundy-600 mb-2 block font-bold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg text-ink-950 group-hover:text-burgundy-600 transition-colors duration-300">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
`;

if(!text.includes('Premium Collections Section')) {
    text = text.replace('{/* Services preview - Professional Edition */}', collectionsSection + '\n\n      {/* Services preview - Professional Edition */}');
    fs.writeFileSync('src/pages/Home.tsx', text);
    console.log('Home.tsx updated successfully.');
} else {
    console.log('Collection section already exists.');
}

