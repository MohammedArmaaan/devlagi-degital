import { useEffect } from 'react';
import FadeIn from '@/components/FadeIn';
import { ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import { categories as staticCategories } from '@/lib/data';

// The interface we need
export interface FrontendCategory {
  id: string;
  category_name: string;
  category_image: string | null;
}

type Props = {
  navigate: (path: string) => void;
};

export default function Collections({ navigate }: Props) {
  const banner = {
    title: "Premium Collections",
    subtitle: "Our Collections",
    description: "Explore our curated collections of wallpapers and interior decor.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    link: []
  };
  const isBannerLoading = false;
  
  const categories: FrontendCategory[] = staticCategories.map(c => ({
    id: c.id,
    category_name: c.title,
    category_image: c.image
  }));

  const loading = false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-ink-50 min-h-screen">
      {(isBannerLoading || banner?.image) && (
      <>
        {/* Hero Banner Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh]">
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
      </section>
      </>
      )}
      {!isBannerLoading && !banner?.image && <div className="pt-24 lg:pt-32" />}

      {/* Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container-luxe max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 auto-rows-[200px] sm:auto-rows-[300px] md:auto-rows-[400px]">
              {categories.map((cat, i) => {
                // 1st and 6th items are wide (col-span-2)
                const isWide = i % 5 === 0;
                return (
                  <FadeIn key={cat.id} delay={i * 0.1} className={isWide ? "col-span-2" : "col-span-1"}>
                    <div 
                      className="group relative overflow-hidden bg-ink-950 w-full h-full cursor-pointer"
                    >
                      {cat.category_image ? (
                        <img 
                          src={cat.category_image} 
                          alt={cat.category_name} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[2s] group-hover:scale-110" 
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100">
                          <ImageIcon className="text-slate-300 w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-70 transition-opacity duration-500" />
                      
                      <div className="absolute bottom-0 right-0 p-3 sm:p-6 md:p-8 text-right w-full flex flex-col justify-end items-end h-full">
                        <h3 className="text-sm sm:text-2xl font-serif text-white mb-1 sm:mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                          {cat.category_name}
                        </h3>
                        <span className="flex items-center justify-end gap-2 text-white/90 font-sans text-xs uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:-translate-y-2 transition-all duration-500">
                          Explore Collection <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
