import sys

with open('src/components/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = """                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`relative font-sans text-[13px] md:text-sm tracking-wider uppercase transition-colors duration-500 whitespace-nowrap ${textColor}`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className={`absolute -bottom-2 left-0 right-0 h-px ${isBannerTop ? 'bg-white' : 'bg-ink-950'}`}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );"""

new_code = """                if (link.label === 'Products') {
                  return (
                    <div key={link.path} className="relative group">
                      <button
                        onClick={() => navigate(link.path)}
                        className={`relative flex items-center gap-1 font-sans text-[13px] md:text-sm tracking-wider uppercase transition-colors duration-500 whitespace-nowrap ${textColor}`}
                      >
                        {link.label}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                        {active && (
                          <motion.span
                            layoutId="nav-underline"
                            className={`absolute -bottom-2 left-0 right-0 h-px ${isBannerTop ? 'bg-white' : 'bg-ink-950'}`}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                      </button>
                      <div className="absolute top-full left-0 pt-6 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        <div className="bg-white border-t-2 border-ink-950 shadow-xl py-2 min-w-[240px] flex flex-col rounded-sm">
                          {categories.map(cat => (
                            <button
                              key={cat.slug}
                              onClick={() => navigate(`/products/${cat.slug}`)}
                              className="text-left px-6 py-3 text-[13px] font-sans text-ink-600 hover:text-ink-950 hover:bg-ink-50 transition-colors"
                            >
                              {cat.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
""" + '\n' + old

content = content.replace(old, new_code)
content = content.replace(old.replace('\n', '\r\n'), new_code.replace('\n', '\r\n'))

with open('src/components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

