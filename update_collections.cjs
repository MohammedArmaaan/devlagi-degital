const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Collections.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">[\s\S]*?<\/section>/;

const newSection = `<section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" alt="Banner" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <div className="section-label !text-white/80 border-white/20 justify-center mb-6" style={{ display: 'inline-flex' }}>Our Collections</div>
              <h1 className="heading-1 mb-6 text-balance text-white">Premium Collections</h1>
              <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6" />
              <p className="text-white/90 text-lg">
                Explore our curated collections of wallpapers and interior decor.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>`;

if (regex.test(content)) {
  content = content.replace(regex, newSection);
  
  // also clean up any `{(isBannerLoading || banner?.image) && (` block if present around it, but I'll let that be and just replace the section.
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Collections banner updated.');
} else {
  console.log('Could not find the section to replace.');
}

