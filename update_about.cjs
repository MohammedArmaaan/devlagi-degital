const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'About.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const ourStoryRegex = /<div className="section-label mb-6">Our Story<\/div>[\s\S]*?<div className="lg:col-span-6">[\s\S]*?<\/div>\s*<\/div>/;

const newOurStory = `<div className="section-label mb-6">Our Story</div>
                <h2 className="heading-2 mb-6 text-balance"><AnimatedText text="A Manufacturer, Not Just a Supplier" /></h2>
                <p className="body-text mb-6">We create <strong>our own customized design for wallpapers, roller blinds, glass films, and canvas frames</strong> to bring your vision to life.</p>
                <p className="body-text mb-6">We proudly provide <strong>Pan India services</strong>, ensuring that our premium interior products reach residential and commercial spaces across the country.</p>
                <p className="body-text">For inquiries, contact us at <strong>Mobile no. 84015 21225</strong>.</p>
              </FadeIn>
            </div>
            <div className="lg:col-span-6">
              <FadeIn delay={0.2} y={60}>
                <TiltCard intensity={6}>
                  <div className="aspect-[4/3] overflow-hidden rounded-sm group glass-shine" style={{ border: '1px solid rgba(212,168,82,0.1)' }}>
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80" alt="Office space" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-lux group-hover:scale-110" />
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>`;

content = content.replace(ourStoryRegex, newOurStory);

const teamRegex = /<div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">[\s\S]*?<\/div>\s*<\/FadeIn>\s*<\/div>\s*<\/div>\s*<\/section>/;

const newTeam = `<div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Founder 1 */}
            <FadeIn delay={0.1} y={40} className="md:col-span-6 lg:col-span-6">
              <div className="group relative w-full h-[400px] md:h-[500px] rounded-none overflow-hidden cursor-default shadow-sm hover:shadow-2xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1000&q=80" 
                  alt="Founder" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[10px] md:text-[11px] uppercase text-burgundy-300 font-bold tracking-[0.3em] mb-3 block">Founder & Production Manager</span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">Ayan Kachhawa</h3>
                  <p className="text-white/80 font-sans text-sm line-clamp-3 mb-6 max-w-md leading-relaxed">
                    With 8 years of experience in customized wallpapers, Ayan expertly manages production, ensuring top-tier manufacturing quality and design innovation for every product.
                  </p>
                  <div className="w-12 h-px bg-burgundy-500 group-hover:w-full transition-all duration-1000 ease-lux" />
                </div>
              </div>
            </FadeIn>

            {/* Founder 2 */}
            <FadeIn delay={0.2} y={40} className="md:col-span-6 lg:col-span-6">
              <div className="group relative w-full h-[400px] md:h-[500px] rounded-none overflow-hidden cursor-default shadow-sm hover:shadow-2xl transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&q=80" 
                  alt="Pioneer and Founder" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[10px] md:text-[11px] uppercase text-burgundy-300 font-bold tracking-[0.3em] mb-3 block">Pioneer & Founder</span>
                  <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">Sohan Devlaji</h3>
                  <p className="text-white/80 font-sans text-sm line-clamp-3 mb-6 max-w-md leading-relaxed">
                    As the pioneer and founder of Devlaji, Sohan brings more than 5 years of experience in directly dealing with clients, CRM, and personally handling site visits to deliver exceptional service.
                  </p>
                  <div className="w-12 h-px bg-burgundy-500 group-hover:w-full transition-all duration-1000 ease-lux" />
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>`;

content = content.replace(teamRegex, newTeam);

fs.writeFileSync(filePath, content, 'utf8');
console.log('About page updated successfully.');

