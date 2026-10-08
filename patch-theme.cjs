const fs = require('fs');
const file = 'src/pages/Home.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the existing TestimonialBubble definition
const startBubble = 'const TestimonialBubble = ({ quote, name, title, image }:';
const endBubble = ');';
const bubbleStartIndex = content.indexOf(startBubble);
const bubbleEndIndex = content.indexOf(endBubble, bubbleStartIndex) + endBubble.length;

if (bubbleStartIndex !== -1) {
  const newBubble = `const TestimonialBubble = ({ quote, name, title, image, date }: { quote: string, name: string, title: string, image: string, date: string }) => (
  <FadeIn>
    <div className="flex flex-col mb-10 group">
      {/* Speech Bubble */}
      <div className="relative bg-white text-ink-800 p-6 md:p-8 rounded-[2rem] rounded-bl-none text-sm md:text-[15px] leading-relaxed font-sans mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] group-hover:-translate-y-1">
        <Quote className="absolute top-6 left-6 w-8 h-8 text-burgundy-600/10 -scale-y-100" />
        <p className="relative z-10 font-medium">"{quote}"</p>
        {/* The tail of the speech bubble */}
        <div className="absolute -bottom-4 left-0 w-8 h-8 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      </div>
      
      {/* User Info */}
      <div className="flex items-center justify-between gap-4 pl-2 mt-2">
        <div className="flex items-center gap-4">
          <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white" />
          <div>
            <h4 className="font-bold text-ink-950 font-sans text-xs uppercase tracking-widest">{name}</h4>
            <p className="text-burgundy-600 text-xs font-serif italic mt-0.5">{title}</p>
          </div>
        </div>
        <div className="text-ink-400 text-[10px] uppercase tracking-[0.2em] font-bold text-right mr-2">
          {date}
        </div>
      </div>
    </div>
  </FadeIn>
);`;
  
  content = content.substring(0, bubbleStartIndex) + newBubble + content.substring(bubbleEndIndex);
}

// Now replace the instances to include the date prop
content = content.replace(/image="https:\/\/images\.unsplash\.com\/photo-1507003211169-0a1dd7228f2d\?w=400&h=400&fit=crop"/g, 'image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"\n                date="Oct 12, 2026"');
content = content.replace(/image="https:\/\/images\.unsplash\.com\/photo-1438761681033-6461ffad8d80\?w=400&h=400&fit=crop"/g, 'image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"\n                date="Sep 28, 2026"');
content = content.replace(/image="https:\/\/images\.unsplash\.com\/photo-1494790108377-be9c29b29330\?w=400&h=400&fit=crop"/g, 'image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"\n                date="Aug 15, 2026"');
content = content.replace(/image="https:\/\/images\.unsplash\.com\/photo-1519085360753-af0119f7cbe7\?w=400&h=400&fit=crop"/g, 'image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"\n                date="Jul 04, 2026"');
content = content.replace(/image="https:\/\/images\.unsplash\.com\/photo-1534528741775-53994a69daeb\?w=400&h=400&fit=crop"/g, 'image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"\n                date="Jun 22, 2026"');
content = content.replace(/image="https:\/\/images\.unsplash\.com\/photo-1531746020798-e6953c6e8e04\?w=400&h=400&fit=crop"/g, 'image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop"\n                date="May 10, 2026"');

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully updated testimonial theme!");
