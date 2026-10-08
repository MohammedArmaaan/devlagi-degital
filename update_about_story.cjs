const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'About.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const ourStoryRegex = /<div className="section-label mb-6">Our Story<\/div>[\s\S]*?<div className="lg:col-span-6">[\s\S]*?<\/div>\s*<\/div>/;

const newOurStory = `<div className="section-label mb-6">Our Story</div>
                <h2 className="heading-2 mb-6 text-balance"><AnimatedText text="A Manufacturer, Not Just a Supplier" /></h2>
                <p className="body-text mb-6"><strong>Devlaji Digital Home Decor</strong> was founded with a simple belief: decor should be personal. That's why we create <strong>our own customized design for wallpapers, roller blinds, glass films, and canvas frames</strong>, all designed and produced under one roof.</p>
                <p className="body-text mb-6">We proudly provide <strong>Pan India services</strong>, serving residential, commercial, hospitality, and retail spaces across the country. Our approach combines traditional craftsmanship with modern digital printing technology, giving you the quality of bespoke design with the reliability of professional manufacturing.</p>
                <p className="body-text">Every project — whether a single window film or a full commercial interior — receives the same attention to detail, from initial consultation to final installation.</p>
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

if (ourStoryRegex.test(content)) {
  content = content.replace(ourStoryRegex, newOurStory);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('About page combined successfully.');
} else {
  console.log('Regex failed to find Our Story block.');
}

