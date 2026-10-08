const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = '{/* Review strip */}';
const endStr = '{/* CTA */}';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `{/* Review strip */}
      <section className="py-12 md:py-24 relative overflow-hidden bg-[#f4f2ee]">
        <div className="container-luxe relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
              <div className="max-w-2xl">
                <div className="section-label mb-6 justify-center md:justify-start" style={{ display: 'inline-flex' }}>Customer Trust</div>
                <h2 className="heading-2 mb-6">Loved by Our Clients</h2>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-burgundy-600 text-burgundy-600" />
                    ))}
                  </div>
                  <span className="font-sans text-sm text-ink-600 font-medium tracking-wide">Rated {business.rating} on Google</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <motion.a 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }} 
                  href={business.mapsUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary flex items-center gap-2"
                >
                  <Star className="w-4 h-4 fill-white" />
                  <span>Write a Review</span>
                </motion.a>
              </div>
            </div>
          </FadeIn>

          {/* Masonry-like Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 items-start">
            
            {/* Column 1 */}
            <div className="flex flex-col">
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
            <div className="flex flex-col lg:mt-12">
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
            <div className="flex flex-col lg:mt-24">
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
  console.log("Successfully patched testimonials banner!");
} else {
  console.log("Could not find boundaries.");
}
