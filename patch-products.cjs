const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = '{/* Products Section */}';
const endStr = '</section>\\r?\\n\\s*\\{\\/\\* Services preview - Professional Edition \\*\\/\\}';

const regex = new RegExp(startStr + '[\\\\s\\\\S]*?' + endStr);

const newContent = \{/* Products Section */}
      <section className="py-12 md:py-20 relative bg-[#f4f2ee]">
        <div className="container-luxe max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-sm border border-ink-100/50">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-ink-950 mb-1">Featured Products</h2>
                <p className="text-ink-500 text-sm">Browse our latest decor offerings</p>
              </div>
              <button 
                onClick={() => navigate('/products')}
                className="bg-ink-950 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-900 transition-colors flex items-center gap-2"
              >
                Explore all <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {genericProducts.slice(0, 3).map((product, i) => (
                <div 
                  key={i}
                  onClick={() => navigate(\/products/\\)}
                  className="relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer group bg-ink-50"
                >
                  {/* Image Background */}
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Info Box */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white rounded-xl p-3 md:p-4 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="font-bold text-ink-950 text-sm md:text-base mb-1 truncate">{product.title}</h3>
                    <p className="text-ink-500 text-xs">Available for custom order</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services preview - Professional Edition *}\;

content = content.replace(regex, newContent);
fs.writeFileSync(file, content, 'utf8');
