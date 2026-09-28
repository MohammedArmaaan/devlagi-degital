import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  title: string;
  image: string;
  quote: string;
}

export default function TestimonialCard({ name, title, image, quote }: TestimonialCardProps) {
  return (
    <div className="w-full max-w-lg md:max-w-2xl mx-auto bg-white rounded-3xl shadow-xl relative mt-12 mb-8 flex flex-col items-center px-8 pt-16 pb-10 text-center">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');` }}></style>
      
      {/* Overlapping Profile Picture */}
      <div className="absolute -top-12 md:-top-14 left-1/2 -translate-x-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full p-1 md:p-1.5 bg-ink-50 shadow-md">
        <div className="w-full h-full rounded-full overflow-hidden border border-ink-100">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Title / Heading */}
      <h4 className="font-serif text-lg md:text-xl font-bold text-ink-900 tracking-widest uppercase mb-3">
        {title}
      </h4>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-burgundy-600 text-burgundy-600" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-ink-600 text-sm md:text-base leading-relaxed px-4 md:px-12 mb-8 italic">
        "{quote}"
      </p>

      {/* Cursive Name Signature */}
      <span 
        className="text-4xl text-ink-900"
        style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400 }}
      >
        {name}
      </span>
    </div>
  );
}



