const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = '{/* Grid */}';
const endStr = '{/* Services preview - Professional Edition */}';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `{/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {genericProducts.map((product, i) => (
                <div 
                  key={i}
                  className="group relative h-[280px] md:h-[320px] rounded-2xl cursor-pointer"
                  style={{ perspective: '1000px' }}
                >
                  {/* Flip Container */}
                  <div 
                    className="w-full h-full relative transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-ink-50 border border-ink-100" style={{ backfaceVisibility: 'hidden' }}>
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Info Box */}
                      <div className="absolute bottom-3 left-3 right-3 bg-white rounded-xl p-3 md:p-4 shadow-sm">
                        <h3 className="font-bold text-ink-950 text-sm md:text-base mb-1 truncate">{product.title}</h3>
                        <p className="text-ink-500 text-xs">Available for custom order</p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-2xl bg-ink-950 p-6 flex flex-col justify-center items-center text-center shadow-lg"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-3">{product.title}</h3>
                      <p className="text-ink-300 text-sm mb-6 line-clamp-4 leading-relaxed">{product.description}</p>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(\`/products/\${product.slug}\`);
                        }}
                        className="bg-transparent border border-white text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-ink-950 transition-colors flex items-center gap-2"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      `;
  
  content = content.substring(0, startIndex) + newContent + content.substring(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully patched!");
} else {
  console.log("Could not find boundaries.");
}

