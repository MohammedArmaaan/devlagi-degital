const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Insert TestimonialBubble component
const bubbleComponent = `
const TestimonialBubble = ({ quote, name, title, image }: { quote: string, name: string, title: string, image: string }) => (
  <FadeIn>
    <div className="flex flex-col mb-10">
      {/* Speech Bubble */}
      <div className="relative bg-[#eff6fa] text-[#5c849b] p-6 md:p-8 rounded-[2rem] text-sm md:text-[15px] leading-relaxed font-sans mb-4 shadow-sm">
        "{quote}"
        {/* The tail of the speech bubble */}
        <div className="absolute -bottom-4 left-8 w-6 h-6 bg-[#eff6fa]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      </div>
      
      {/* User Info */}
      <div className="flex items-center gap-4 pl-2">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
        <div>
          <h4 className="font-bold text-ink-950 font-sans text-xs uppercase tracking-widest">{name}</h4>
          <p className="text-ink-500 text-sm italic font-serif">{title}</p>
        </div>
      </div>
    </div>
  </FadeIn>
);
`;

if (!content.includes('TestimonialBubble')) {
  content = content.replace('type Props =', bubbleComponent + '\n\ntype Props =');
}

// Replace Review strip
const startStr = '{/* Review strip */}';
const endStr = '{/* CTA */}';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `{/* Review strip */}
      <section className="relative overflow-hidden bg-white pb-12 md:pb-24">
        {/* Top Image Banner */}
        <div className="relative h-[350px] md:h-[450px] w-full bg-ink-900">
          <img 
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Happy clients" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 to-transparent" />
          
          <div className="relative h-full container-luxe mx-auto px-4 md:px-8 flex flex-col justify-center">
            <div className="max-w-2xl text-white pt-10">
              <h2 className="text-5xl md:text-7xl font-sans font-light mb-4 tracking-tight">Stories</h2>
              <p className="text-lg md:text-xl font-medium opacity-90">These are some testimonials from clients who love our work.</p>
            </div>
          </div>
        </div>

        {/* Masonry-like Testimonials Grid */}
        <div className="container-luxe max-w-6xl mx-auto px-4 md:px-8 relative z-10 -mt-16 md:-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 items-start">
            
            {/* Column 1 */}
            <div className="flex flex-col md:mt-24">
              <TestimonialBubble 
                quote="Excellent quality and professional service. The decorative glass film they installed transformed our office completely. Highly recommended for anyone looking for customized decor solutions."
                name="Anil Patel"
                title="Business Owner"
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
              />
              <TestimonialBubble 
                quote="I am so grateful for your styling system. Our living room looks incredibly elegant now. I love it!"
                name="Sarah Jenkins"
                title="Homeowner"
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
              />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col lg:-mt-8">
              <TestimonialBubble 
                quote="Very impressed with their wallpaper collection and installation. The team was punctual, polite, and left everything spotless. You're awesome :)"
                name="Priya Sharma"
                title="Interior Designer"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
              />
              <TestimonialBubble 
                quote="Everything I need to run and market my business is right here. The custom blinds were top-notch!"
                name="Rahul Desai"
                title="Restaurant Manager"
                image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
              />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col md:mt-16">
              <TestimonialBubble 
                quote="I am so grateful for your excellent service. Last but not least, I have time for myself to be a mother. Again thank you so much for your great work. I LOVE IT!"
                name="Aikisha Boyd"
                title="Freelance Stylist"
                image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
              />
              <TestimonialBubble 
                quote="You have been the most helpful company I have ever worked with. The custom prints are perfect."
                name="Megan Duchi"
                title="The Last Tangle"
                image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop"
              />
            </div>

          </div>
        </div>
      </section>

      `;

  content = content.substring(0, startIndex) + newContent + content.substring(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log("Successfully patched testimonials!");
} else {
  console.log("Could not find boundaries.");
}

