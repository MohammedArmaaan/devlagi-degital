const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.tsx', 'utf8');
home = home.replace(
  '<div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">',
  '<div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">'
);
home = home.replace(
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">',
  '<div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">'
);
home = home.replace(
  'bg-ink-950 p-6 flex flex-col justify-center items-center text-center shadow-lg',
  'bg-ink-950 p-3 sm:p-6 flex flex-col justify-center items-center text-center shadow-lg'
);
home = home.replace(
  'font-serif text-xl md:text-2xl text-white mb-3',
  'font-serif text-base sm:text-xl md:text-2xl text-white mb-2 sm:mb-3'
);
home = home.replace(
  'text-ink-300 text-sm mb-6 line-clamp-4 leading-relaxed',
  'text-ink-300 text-[10px] sm:text-sm mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-4 leading-relaxed'
);
home = home.replace(
  'bg-transparent border border-white text-white px-6 py-2.5  text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-ink-950 transition-colors flex items-center gap-2',
  'bg-transparent border border-white text-white px-3 py-1.5 sm:px-6 sm:py-2.5 text-[9px] sm:text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-ink-950 transition-colors flex items-center gap-1 sm:gap-2'
);
home = home.replace(
  'bg-white  p-3 md:p-4 shadow-sm',
  'bg-white p-2 sm:p-3 md:p-4 shadow-sm'
);
home = home.replace(
  'font-bold text-ink-950 text-sm md:text-base mb-1 truncate',
  'font-bold text-ink-950 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1 truncate'
);
home = home.replace(
  'text-ink-500 text-xs',
  'text-ink-500 text-[9px] sm:text-xs'
);
home = home.replace(
  'group relative h-[280px] md:h-[320px]  cursor-pointer',
  'group relative h-[220px] sm:h-[280px] md:h-[320px] cursor-pointer'
);
home = home.replace(
  'relative w-full h-[300px] sm:h-[400px] overflow-hidden bg-ink-50 group',
  'relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden bg-ink-50 group'
);
home = home.replace(
  'font-serif text-2xl md:text-[28px] whitespace-pre-line leading-tight',
  'font-serif text-sm sm:text-2xl md:text-[28px] whitespace-pre-line leading-tight'
);
fs.writeFileSync('src/pages/Home.tsx', home);

let collections = fs.readFileSync('src/pages/Collections.tsx', 'utf8');
collections = collections.replace(
  '<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">',
  '<div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 auto-rows-[200px] sm:auto-rows-[300px] md:auto-rows-[400px]">'
);
collections = collections.replace(
  'p-6 md:p-8 text-right w-full',
  'p-3 sm:p-6 md:p-8 text-right w-full'
);
collections = collections.replace(
  'heading-3 text-white mb-2 transform',
  'text-sm sm:text-2xl font-serif text-white mb-1 sm:mb-2 transform'
);
fs.writeFileSync('src/pages/Collections.tsx', collections);

console.log("Updated both files");

