const fs = require('fs');

let detail = fs.readFileSync('src/pages/ProductDetail.tsx', 'utf8');

// 1. Remove the gallery thumbnails
const galleryRegex = /\s*\{\/\* Thumbnails underneath \*\/\}[\s\S]*?\)\}[\s\S]*?<\/div>[\s\S]*?\)\}/;
// Wait, regex might be tricky, I'll use index based deletion
let newDetail = detail.replace(
`              {/* Thumbnails underneath */}
              {allImages.length > 1 && (
                <div className="flex gap-4 mt-4 overflow-x-auto custom-scrollbar pb-2">
                  {allImages.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedImageIndex(i)}
                      className={\`w-20 h-20 shrink-0 overflow-hidden cursor-pointer transition-all \${selectedImageIndex === i ? 'ring-2 ring-burgundy-600 ring-offset-2 ring-offset-[#f4f2ee]' : 'opacity-70 hover:opacity-100'}\`}
                    >
                      <img src={img} alt={\`\${product.title} view \${i + 1}\`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}`, ''
);

// 2. Make related products grid-cols-2 on mobile
newDetail = newDetail.replace(
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-8">',
  '<div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">'
);

// Adjust font size on mobile for related products titles
newDetail = newDetail.replace(
  '<h3 className="text-xl font-serif text-ink-950 group-hover:text-burgundy-700 transition-colors">{relProduct.title}</h3>',
  '<h3 className="text-base md:text-xl font-serif text-ink-950 group-hover:text-burgundy-700 transition-colors">{relProduct.title}</h3>'
);

fs.writeFileSync('src/pages/ProductDetail.tsx', newDetail);
console.log('ProductDetail.tsx updated successfully');

