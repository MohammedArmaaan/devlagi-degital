import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  title: string;
  image: string;
  quote: string;
}

export default function TestimonialCard({ name, title, image, quote }: TestimonialCardProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-12 py-10 md:py-16 text-center flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Quote className="w-12 h-12 md:w-16 md:h-16 text-burgundy-200 mb-8 mx-auto opacity-60 rotate-180" />
      </motion.div>
      
      <p className="text-2xl md:text-4xl lg:text-5xl font-serif text-ink-900 leading-snug md:leading-relaxed italic mb-12 text-balance">
        "{quote}"
      </p>
      
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-burgundy-600 text-burgundy-600" />
          ))}
        </div>
        
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border-2 border-white ring-1 ring-ink-100">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        
        <div className="mt-2">
          <h4 className="font-bold text-ink-900 tracking-wide uppercase text-sm md:text-base">{name}</h4>
          <p className="text-ink-500 text-xs md:text-sm mt-1 uppercase tracking-widest">{title}</p>
        </div>
      </div>
    </div>
  );
}
